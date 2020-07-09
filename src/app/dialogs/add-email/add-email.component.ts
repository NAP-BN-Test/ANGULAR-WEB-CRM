import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LIST_SELECT } from 'src/app/services/constant/app-constant';
import { MatDialogRef } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss']
})
export class AddEmailComponent implements OnInit {

  myForm: FormGroup;

  listOutcome = LIST_SELECT.LIST_MAIL_STATUS;
  listTime = LIST_SELECT.LIST_TIME;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEmailComponent>
  ) {
    this.myForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      outcomeType: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      hourStart: ['', [Validators.required]]
    }, { validator: [this.checkRequire] });
  }

  ngOnInit(): void {
  }

  checkRequire(group: FormGroup) {
    let requireDescription = group.controls.description.value != "";
    let requireOutcome = group.controls.outcomeType.value != "";
    let requireDateStart = group.controls.dateStart.value != "";
    let requireHourStart = group.controls.hourStart.value != "";

    if (requireDescription && requireOutcome && requireDateStart && requireHourStart)
      return null;
    else return { require: true };
  }

  onClickOk() {
    let dateStart = moment(this.myForm.value.dateStart).format('YYYY-MM-DD');
    let hourStart = this.myForm.value.hourStart;

    this.dialogRef.close({
      description: this.myForm.value.description,
      outcomeType: this.myForm.value.outcomeType,
      timeStart: dateStart + " " + hourStart,
    })
  }

}
