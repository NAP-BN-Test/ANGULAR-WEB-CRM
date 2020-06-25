import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

import * as md5 from 'md5';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  mTitle: any;

  name = "";
  username = "";
  phone = "";
  email = "";
  password = "";
  rePassword = "";

  missValue = false;

  notification = "";
  status = true;

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.add_user;
    });
  }

  onClickAdd() {
    if (this.name.trim() != "" &&
      this.username.trim() != "" &&
      this.password.trim() != "" &&
      this.rePassword.trim() != "") {
      if (this.password.trim() == this.rePassword.trim()) {

        let user = {
          name: this.name,
          username: this.username,
          phone: this.phone,
          email: this.email,
          password: md5(this.password)
        }

        this.mService.getApiService().sendRequestADD_USER(
          this.mService.getUser().username,
          this.mService.getUser().id,
          user
        ).then(data => {
          this.missValue = true;
          if (data.status == STATUS.SUCCESS) {
            this.notification = this.mTitle.add_success;
            this.status = true;

            this.name = "";
            this.username = "";
            this.phone = "";
            this.email = "";
            this.password = "";
            this.rePassword = "";

          } else {
            this.notification = data.message;
            this.status = false;
          }
        })
      }
      else {
        this.notification = this.mTitle.password_match;
        this.missValue = true;
        this.status = false;
      }
    } else {
      this.notification = this.mTitle.invalid_value;
      this.missValue = true;
      this.status = false;
    }
  }

}
