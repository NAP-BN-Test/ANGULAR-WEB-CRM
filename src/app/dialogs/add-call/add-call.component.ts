import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LIST_SELECT } from 'src/app/services/constant/app-constant';
import { MatDialogRef } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-add-call',
  templateUrl: './add-call.component.html',
  styleUrls: ['./add-call.component.scss']
})
export class AddCallComponent implements OnInit {

  myForm: FormGroup;

  listOutcome = LIST_SELECT.LIST_OUTCOME;
  listTime = LIST_SELECT.LIST_TIME;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCallComponent>
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
