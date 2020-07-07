import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-category-step',
  templateUrl: './add-category-step.component.html',
  styleUrls: ['./add-category-step.component.scss']
})
export class AddCategoryStepComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public mData: any
  ) {
    this.myForm = this.formBuilder.group({
      name: [mData ? mData.name : '', [Validators.required]],
      process: [mData ? mData.process : '', [Validators.required]],
      stage: [mData ? mData.stage : '', [Validators.required]],
    }, { validator: [this.checkRequire] });
  }

  ngOnInit(): void {
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";
    let requireProcess = group.controls.process.value != "";
    let requireStage = group.controls.stage.value != "";

    if (requireName && requireProcess && requireStage)
      return null;
    else return { require: true };
  }

}
