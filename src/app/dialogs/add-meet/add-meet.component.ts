import { Component, OnInit } from '@angular/core';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import * as moment from 'moment';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-meet',
  templateUrl: './add-meet.component.html',
  styleUrls: ['./add-meet.component.scss']
})
export class AddMeetComponent implements OnInit {

  myForm: FormGroup;

  listTime = LIST_SELECT.LIST_TIME;
  listDuration = LIST_SELECT.LIST_DURATION;
  listUser = [];


  constructor(
    public mService: AppModuleService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMeetComponent>
  ) {
    this.myForm = this.formBuilder.group({
      userIDs: [''],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      hourStart: ['', [Validators.required]]
    }, { validator: [this.checkRequire] });
  }

  ngOnInit(): void {
    this.mService.getApiService().sendRequestGET_LIST_USER().then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listUser = data.array;
      }
    });
  }

  checkRequire(group: FormGroup) {
    let requireDescription = group.controls.description.value != "";
    let requireDuration = group.controls.duration.value != "";
    let requireDateStart = group.controls.dateStart.value != "";
    let requireHourStart = group.controls.hourStart.value != "";

    if (requireDescription && requireDuration && requireDateStart && requireHourStart)
      return null;
    else return { require: true };
  }

  onClickOk() {
    let dateStart = moment(this.myForm.value.dateStart).format('YYYY-MM-DD');
    let hourStart = this.myForm.value.hourStart;

    this.dialogRef.close({
      description: this.myForm.value.description,
      duration: this.myForm.value.duration,
      userIDs: this.myForm.value.userIDs,
      outcomeType: this.myForm.value.outcomeType,
      timeStart: dateStart + " " + hourStart,
    })
  }

}
