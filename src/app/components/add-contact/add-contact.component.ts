import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number;

  tabIndex = 0;

  mTitle: any;

  myForm: FormGroup;

  mID = -1;
  isNoID = false;

  listContact = [];

  listGender = LIST_SELECT.LIST_GENDER;
  listJobTile = [];

  constructor(
    public mService: AppModuleService,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: [''],
      jobTile: [''],
      phone: [''],
      email: [''],
      address: [''],
    }, { validator: [this.checkRequire] });
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";
    

    if (requireName)
      return null;
    else return { require: true };
  }

  ngOnInit() {

    this.mService.getApiService().sendRequestGET_CATEGORY_JOB_TILE("").then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listJobTile = data.array;
    })

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    let params: any = this.mService.handleActivatedRoute();
    if (params.companyID) this.mID = params.companyID
    else this.isNoID = true;
  }

  onClickClose() {
    this.myForm.reset();
    this.closeAddSub.emit();
  }

  onClickSave() {
    let obj = {
      name: this.myForm.value.name,
      gender: this.myForm.value.gender,
      jobTile: this.myForm.value.jobTile,
      phone: this.myForm.value.phone,
      email: this.myForm.value.email,
      address: this.myForm.value.address,
    }

    this.mService.getApiService().sendRequestADD_CONTACT(this.mID + "", obj, this.addOut).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.myForm.reset();
        this.closeAddSub.emit(data.obj);
      }
    })
  }

  onSeachContact(event) {
    let searchKey = event.target.value;

    this.mService.getApiService().sendRequestSEARCH_CONTACT(searchKey).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    })
  }

  onClickAddContact(item) {
    this.mService.getApiService().sendRequestADD_CONTACT_BY_ID(this.mID + "", item.id).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeAddSub.emit(data.obj);
      }
    })
  }

}
