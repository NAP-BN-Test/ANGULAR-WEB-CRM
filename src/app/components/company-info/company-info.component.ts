import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  @Output('createAction') createAction = new EventEmitter();
  @Output('updateCompany') updateCompany = new EventEmitter();

  mConpany: any;

  mData: any;

  mObj: any;


  constructor(
    public mService: AppModuleService,
    public router: Router,
    private cookieService: CookieService,
    private location: Location
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_info;
    });

    this.mService.getApiService().sendRequestGET_DETAIL_COMPANY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mObj = data.obj;
      }
    });
  }

  onClickItem(index: number) {
    this.createAction.emit(index);
  }

  onInputChange(event, type) {
    let value = event.target.value;

    let companyName: string;
    let companyShortName: string;
    let companyAddress: string;
    let companyPhone: string;
    let companyEmail: string;
    let companyCountry: string;

    if (type == 1) companyName = value;
    else if (type == 2) companyShortName = value;
    else if (type == 3) companyAddress = value;
    else if (type == 4) companyPhone = value;
    else if (type == 5) companyEmail = value;
    else if (type == 6) companyCountry = value;

    this.mService.getApiService().sendRequestUPDATE_COMPANY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
      companyName,
      companyShortName,
      companyAddress,
      companyPhone,
      companyEmail,
      companyCountry
    )
  }

  onClickBack() {
    this.location.back();
  }

}
