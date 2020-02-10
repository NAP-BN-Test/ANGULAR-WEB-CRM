import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';

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

  showToast = false;
  toasMessage = "";

  mData: any;

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) {
    if (localStorage.getItem('server-info')) {
      let svInfo = JSON.parse(localStorage.getItem('server-info'));

      this.ip = svInfo.ip;
      this.dbName = svInfo.dbName;
    }
  }

  ngOnInit() {

    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.login;
    });

    if (localStorage.getItem('user-login')) {
      let userInfo = JSON.parse(localStorage.getItem('user-login'));
      this.username = userInfo.username;
      this.password = userInfo.password;
    }

  }

  onClickLogin() {

    if (this.ip.trim() == "" || this.dbName.trim() == "") {
      this.toasMessage = this.mData.invalid_db
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    } else {
      let svInfo = {
        ip: this.ip,
        dbName: this.dbName
      };
      localStorage.setItem('server-info', JSON.stringify(svInfo));

      this.mService.getApiService().sendRequestUSER_LOGIN(this.ip, this.dbName, this.username, md5(this.password)).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.mService.setUser(data.obj);

          let userLogin = {
            username: this.username,
            password: this.password
          }
          localStorage.setItem('user-login', JSON.stringify(userLogin));

          localStorage.setItem('user-info', JSON.stringify(data.obj));

          this.router.navigate(['contact-menu-company']);
          // this.router.navigate(['dashboard']);

        }
      })
    }
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
