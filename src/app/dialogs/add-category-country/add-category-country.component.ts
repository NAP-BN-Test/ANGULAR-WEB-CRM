import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category-country',
  templateUrl: './add-category-country.component.html',
  styleUrls: ['./add-category-country.component.scss']
})
export class AddCategoryCountryComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public mData: any
  ) {
    this.myForm = this.formBuilder.group({
      name: [mData ? mData.name : '', [Validators.required]],
      code: [mData ? mData.code : '', [Validators.required]],
    }, { validator: [this.checkRequire] });
  }

  ngOnInit(): void {
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";
    let requireCode = group.controls.code.value != "";

    if (requireName && requireCode)
      return null;
    else return { require: true };
  }

}
