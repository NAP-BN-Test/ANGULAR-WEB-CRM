import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import * as md5 from 'md5';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ip: string = "";
  dbName: string = "";

  username: string = "";
  password: string = "";

  setting = false;

  mData: any;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    private cookieService: CookieService

  ) {
    if (this.cookieService.get('server-info')) {
      let svInfo = JSON.parse(this.cookieService.get('server-info'));

      this.ip = svInfo.ip;
      this.dbName = svInfo.dbName;
    }
  }

  ngOnInit() {

    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.login;
    });

  }

  onClickLogin() {
    this.mService.getApiService().sendRequestUSER_LOGIN(this.ip, this.dbName, this.username, md5(this.password)).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.setUser(data.obj);

        this.cookieService.set('user-info', JSON.stringify(data.obj));

        this.router.navigate(['dashboard']);

      }
    })

  }

  onClickSetting() {
    if (this.setting) {
      let svInfoCookie = JSON.parse(this.cookieService.get('server-info'));

      if (this.ip != svInfoCookie.ip || this.dbName != svInfoCookie.dbName) {
        let svInfo = {
          ip: this.ip,
          dbName: this.dbName
        }
        this.cookieService.set('server-info', JSON.stringify(svInfo));
      }
    }

    this.setting = !this.setting;
  }

}
