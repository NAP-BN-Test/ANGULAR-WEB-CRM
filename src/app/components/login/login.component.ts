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

  username: string = "";
  password: string = "";

  setting = false;

  showToast = false;
  toasMessage = "";

  mData: any;

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) { }

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
      this.mService.getApiService().sendRequestUSER_LOGIN(this.username, md5(this.password)).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.mService.setUser(data.obj);

          let userLogin = {
            username: this.username,
            password: this.password
          }
          localStorage.setItem('user-login', JSON.stringify(userLogin));

          localStorage.setItem('user-info', JSON.stringify(data.obj));

          this.router.navigate(['contact-menu-company']);
        }
      })
  }
}
