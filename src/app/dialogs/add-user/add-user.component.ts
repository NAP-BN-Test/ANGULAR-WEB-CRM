import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

import * as md5 from 'md5';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phone: '',
      email: '',
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['']
    }, { validator: [this.checkPasswords, this.checkRequire, this.checkLength] });

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";
    let requireUsername = group.controls.username.value != "";
    let requirePassword = group.controls.password.value != "";

    if (requireName && requireUsername && requirePassword)
      return null;
    else return { require: true };
  }

  checkLength(group: FormGroup) {
    let pass = group.controls.password.value;
    let result = null;

    if (pass.length < 6) result = { minlength: true }
    else if (pass.length > 30) result = { maxlength: true }

    return result;
  }

  onClickAdd() {

    console.log(this.myForm);

    //   if (this.name.trim() != "" &&
    //     this.username.trim() != "" &&
    //     this.password.trim() != "" &&
    //     this.rePassword.trim() != "") {
    //     if (this.password.trim() == this.rePassword.trim()) {

    //       let user = {
    //         name: this.name,
    //         username: this.username,
    //         phone: this.phone,
    //         email: this.email,
    //         password: md5(this.password)
    //       }

    //       this.mService.getApiService().sendRequestADD_USER(
    //         
    //         
    //         user
    //       ).then(data => {
    //         this.missValue = true;
    //         if (data.status == STATUS.SUCCESS) {
    //           this.notification = this.mTitle.add_success;
    //           this.status = true;

    //           this.name = "";
    //           this.username = "";
    //           this.phone = "";
    //           this.email = "";
    //           this.password = "";
    //           this.rePassword = "";

    //         } else {
    //           this.notification = data.message;
    //           this.status = false;
    //         }
    //       })
    //     }
    //     else {
    //       this.notification = this.mTitle.password_match;
    //       this.missValue = true;
    //       this.status = false;
    //     }
    //   } else {
    //     this.notification = this.mTitle.invalid_value;
    //     this.missValue = true;
    //     this.status = false;
    //   }
  }

}