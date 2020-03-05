import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, LIST_SELECT } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number;

  mData: any;

  btnType = 1;
  btnCanClicked = true;

  listCompanyRole = LIST_SELECT.LIST_COMPANY_ROLE;

  listCompany = [];

  listCity = [];

  name = "";
  shortName = "";
  phone = "";
  email = "";
  address = "";
  city: any;
  role = 0;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.add_sub_detail;
    })

    this.mService.getApiService().sendRequestGET_LIST_CITY(
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      this.listCity = data.array;
    })
  }

  onClickClose() {
    this.closeAddSub.emit();

    this.name = "";
    this.shortName = "";
    this.phone = "";
    this.email = "";
    this.address = "";
    this.city = null;
    this.role = 0;
  }

  onClickAdd(index: number) {
    if (index) {
      this.listCompany = [];
      this.btnType = index;
    }
  }

  onClickSave() {
    if (this.btnType == 3) {
      let obj = {
        name: this.name,
        shortName: this.shortName,
        phone: this.phone,
        email: this.email,
        address: this.address,
        cityID: this.city.id,
        cityName: this.city.name,
        role: this.role
      }

      this.mService.getApiService().sendRequestADD_COMPANY(
        this.mService.getUser().username,
        this.mService.getUser().id,
        this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
        obj
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(data.obj);

          this.name = "";
          this.shortName = "";
          this.phone = "";
          this.email = "";
          this.address = "";
          this.city = null;
          this.role = 0;
        }
      })
    }
  }

  onSeachCompany(event) {
    let searchKey = event.target.value;

    this.listCompany = [];

    if (searchKey.trim() != "") {
      this.mService.getApiService().sendRequestSEARCH_COMPANY(
        this.mService.getUser().username,
        this.mService.getUser().id,
        this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
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
        
        
        this.mService.getUser().username,
        this.mService.getUser().id,
        this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
        item.id
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(data.obj);
        }
      })
    }
    else if (type == 2) {
      this.mService.getApiService().sendRequestADD_CHILD_COMPANY_BY_ID(
        
        
        this.mService.getUser().username,
        this.mService.getUser().id,
        this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
        item.id
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(data.obj);
        }
      })
    }
  }


}
