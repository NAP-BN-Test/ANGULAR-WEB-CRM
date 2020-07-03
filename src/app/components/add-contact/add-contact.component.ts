import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number;

  mTitle: any;

  name = "";
  gender = -1;
  jobTile = -1;
  phone = "";
  email = "";
  address = "";

  listContact = [];

  btnAddExist = true;
  btnCanClicked = true;

  listGender = LIST_SELECT.LIST_GENDER;
  listJobTile = LIST_SELECT.LIST_JOB_TILE;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
  }

  onClickClose() {
    this.closeAddSub.emit();

    this.name = "";
    this.gender = -1;
    this.jobTile = -1;
    this.phone = "";
    this.email = "";
    this.address = "";
  }

  onClickAddExist() {
    this.btnAddExist = true;
  }

  onClickAddNew() {
    this.btnAddExist = false;

  }

  onClickGenger(value) {
    this.gender = value;
  }

  onClickSave() {
    if (!this.btnAddExist) {
      let obj = {
        name: this.name,
        gender: this.gender,
        jobTile: this.jobTile,
        phone: this.phone,
        email: this.email,
        address: this.address,
      }

      this.mService.getApiService().sendRequestADD_CONTACT(
        
        
        this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
        obj, this.addOut
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(data.obj);

          this.name = "";
          this.gender = -1;
          this.jobTile = -1;
          this.phone = "";
          this.email = "";
          this.address = "";
        }
      })
    }
  }

  onSeachContact(event) {
    let searchKey = event.target.value;

    this.mService.getApiService().sendRequestSEARCH_CONTACT(
      
      
      searchKey
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    })
  }

  onClickAddContact(item) {
    this.mService.getApiService().sendRequestADD_CONTACT_BY_ID(
      
      
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
      item.id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeAddSub.emit(data.obj);
      }
    })
  }

}
