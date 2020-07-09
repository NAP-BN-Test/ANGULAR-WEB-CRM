import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { STATUS, LIST_SELECT } from 'src/app/services/constant/app-constant';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialogRef } from '@angular/material';

import * as moment from 'moment';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  myForm: FormGroup;

  listTime = LIST_SELECT.LIST_TIME;
  listDuration = LIST_SELECT.LIST_DURATION;
  listUser = [];
  listTaskType = LIST_SELECT.LIST_ACTIVITY;

  constructor(
    public mService: AppModuleService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      assignID: ['', [Validators.required]],
      taskType: ['', [Validators.required]],
      description: ['', [Validators.required]],
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
    let requireName = group.controls.name.value != "";
    let requireAsignID = group.controls.assignID.value != "";
    let requireTaskType = group.controls.taskType.value != "";
    let requireDescription = group.controls.description.value != "";
    let requireDateStart = group.controls.dateStart.value != "";
    let requireHourStart = group.controls.hourStart.value != "";


    if (requireName && requireAsignID && requireTaskType && requireDescription && requireDateStart && requireHourStart)
      return null;
    else return { require: true };
  }

  onClickOk() {
    let dateStart = moment(this.myForm.value.dateStart).format('YYYY-MM-DD');
    let hourStart = this.myForm.value.hourStart;

    this.dialogRef.close({
      name: this.myForm.value.name,
      assignID: this.myForm.value.assignID,
      taskType: this.myForm.value.taskType,
      description: this.myForm.value.description,
      userIDs: this.myForm.value.userIDs,
      outcomeType: this.myForm.value.outcomeType,
      timeAssign: dateStart + " " + hourStart,
    })
  }

}
