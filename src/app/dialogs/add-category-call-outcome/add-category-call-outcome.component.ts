import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-category-call-outcome',
  templateUrl: './add-category-call-outcome.component.html',
  styleUrls: ['./add-category-call-outcome.component.scss']
})
export class AddCategoryCallOutcomeComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public mData: any
  ) {
    this.myForm = this.formBuilder.group({
      name: [mData ? mData.name : '', [Validators.required]],
    }, { validator: [this.checkRequire] });
  }

  ngOnInit(): void {
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";

    if (requireName)
      return null;
    else return { require: true };
  }
}
