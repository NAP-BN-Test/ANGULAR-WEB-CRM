import { Component } from '@angular/core';
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
}