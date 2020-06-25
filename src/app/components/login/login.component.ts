import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';

import * as md5 from 'md5';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';

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

  

  loginMessage = "";

  mTitle: any;

  constructor(
    public mService: AppModuleService,
    public router: Router,
  ) {
    if (localStorage.getItem('server-info')) {
      let svInfo = JSON.parse(localStorage.getItem('server-info'));

      this.ip = svInfo.ip;
      this.dbName = svInfo.dbName;
    } else {
      this.setting = true;
    }
  }

  ngOnInit() {
    this.mService.LoadAppConfig();
    if (!localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_KEY.LANGUAGE_KEY, "VI");
    }

    if (localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA)) {
      this.mService.loadVieLanguage().then((data: any) => {
        this.mTitle = data;
        localStorage.setItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA, JSON.stringify(data))
      });
    } else {
      let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
      this.mTitle = JSON.parse(languageData);
    }


    if (localStorage.getItem('user-login')) {
      let userInfo = JSON.parse(localStorage.getItem('user-login'));
      this.username = userInfo.username;
      this.password = userInfo.password;

      this.onClickLogin();
    }

  }

  onClickLogin() {
    this.mService.getApiService().sendRequestUSER_LOGIN(this.ip, this.dbName, this.username, md5(this.password)).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.loginMessage = "";
        this.mService.setUser(data.obj);

        let userLogin = {
          username: this.username,
          password: this.password
        }

        localStorage.setItem('server-info', JSON.stringify({ ip: this.ip, dbName: this.dbName }));
        localStorage.setItem('user-login', JSON.stringify(userLogin));
        localStorage.setItem('user-info', JSON.stringify(data.obj));

        this.router.navigate(['companies'], { queryParams: { page: 1, menu: 1 } });

      } else {
        this.loginMessage = data.message;
      }
    })
  }

  onClickSetting() {
    if (this.setting) {
      let svInfoCookie = {
        ip: "",
        dbName: ""
      };
      if (localStorage.getItem('server-info')) {
        svInfoCookie = JSON.parse(localStorage.getItem('server-info'));
      }
      if (this.ip != svInfoCookie.ip || this.dbName != svInfoCookie.dbName) {
        let svInfo = {
          ip: this.ip,
          dbName: this.dbName
        }
        localStorage.setItem('server-info', JSON.stringify(svInfo));
      }
    }
    this.setting = !this.setting;
  }
}
