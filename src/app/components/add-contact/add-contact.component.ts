import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  mData: any;

  name = "";
  gender = -1;
  jobTile = -1;
  handPhone = "";
  homePhone = "";
  email = "";
  address = "";
  contactOwner = -1;


  btnAddExist = true;
  btnCanClicked = true;

  listGender = LIST_SELECT.LIST_GENDER;
  listJobTile = LIST_SELECT.LIST_JOB_TILE;
  listContactOwner = LIST_SELECT.LIST_CONTACT_OWNER;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.add_sub_detail;
    })
  }

  onClickClose() {
    this.closeAddSub.emit()
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
    let obj = {
      name: this.name,
      gender: this.gender,
      jobTile: this.jobTile,
      handPhone: this.handPhone,
      homePhone: this.homePhone,
      email: this.email,
      address: this.address,
      contactOwner: this.contactOwner,
    }

    this.mService.getApiService().sendRequestADD_CONTACT(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('m-id') ? this.cookieService.get('m-id') : null,
      obj
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeAddSub.emit(data.obj);
      }
    })
  }

}
