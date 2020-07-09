import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, LIST_SELECT, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number = -1;

  mTitle: any;

  mID = -1;

  isNoID = false;

  listCompanyRole = LIST_SELECT.LIST_COMPANY_ROLE;

  listCompany = [];

  listCity = [];

  myForm: FormGroup;

  constructor(
    public mService: AppModuleService,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      shortName: [''],
      cityID: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phone: [''],
      email: [''],
      address: [''],
    }, { validator: [this.checkRequire] });
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";
    let requireCityID = group.controls.cityID.value != "";
    let requireRole = group.controls.role.value != "";

    if (requireName && requireCityID && (requireRole || !this.isNoID))
      return null;
    else return { require: true };
  }

  ngOnInit() {

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);


    let params: any = this.mService.handleActivatedRoute();
    if (params.companyID) this.mID = params.companyID
    else this.isNoID = true;

    this.mService.getApiService().sendRequestGET_LIST_CITY().then(data => {
      this.listCity = data.array;
    })
  }

  onClickClose() {
    this.myForm.reset();
    this.closeAddSub.emit();
  }

  onClickSave() {
    let obj = {
      name: this.myForm.value.name,
      shortName: this.myForm.value.shortName,
      phone: this.myForm.value.phone,
      email: this.myForm.value.email,
      address: this.myForm.value.address,
      cityID: this.myForm.value.cityID,
      cityName: "",
      role: this.myForm.value.role
    }

    this.mService.getApiService().sendRequestADD_COMPANY(
      this.mID + "",
      obj
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.myForm.reset();
        this.closeAddSub.emit(data.obj);
      }
    })
  }

  onSeachCompany(event) {
    let searchKey = event.target.value;

    this.listCompany = [];

    if (searchKey.trim() != "") {
      this.mService.getApiService().sendRequestSEARCH_COMPANY(
        this.mID + "",
        searchKey
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listCompany = data.array;
        }
      })
    }


  }

  onClickAddCompany(item, type) {
    if (type == 1) {
      this.mService.getApiService().sendRequestADD_PARENT_COMPANY_BY_ID(
        this.mID + "",
        item.id
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(data.obj);
        }
      })
    }
    else if (type == 2) {
      this.mService.getApiService().sendRequestADD_CHILD_COMPANY_BY_ID(
        this.mID + "",
        item.id
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(data.obj);
        }
      })
    }
  }


}
