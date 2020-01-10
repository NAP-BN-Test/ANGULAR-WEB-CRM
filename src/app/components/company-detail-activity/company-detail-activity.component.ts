import { Component, OnInit, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';

import * as moment from 'moment';

@Component({
  selector: 'app-company-detail-activity',
  templateUrl: './company-detail-activity.component.html',
  styleUrls: ['./company-detail-activity.component.scss']
})
export class CompanyDetailActivityComponent implements OnInit {

  @Input('mObj') mObj: any;
  @Input('listContact') listContact = [];

  mData: any;

  showToast = false;
  toasMessage = "";

  listOutcome = [
    { id: 1, name: "No Answer" },
    { id: 2, name: "Answer" },
  ];

  listDuration = [
    { value: 900, name: "15 minutes" },
    { value: 1800, name: "30 minutes" },
    { value: 3600, name: "1 hour" },
    { value: 7200, name: "2 hours" },
    { value: 10800, name: "3 hours" }
  ]

  listAttend = [
    { value: 1, name: "1 attender" },
    { value: 2, name: "2 attenders" },
    { value: 3, name: "3 attenders" },
    { value: 4, name: "4 attenders" },
    { value: 5, name: "5 attenders" }
  ]

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_detail;
    });
  }

  onChangeContact(type) {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj,
      type == 1 ? this.mObj.contactID : null,
      type == 2 ? this.mObj.state : null,
      null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  pickDate(event, type) {
    let timeCreate = ""
    if (type == 1) {
      timeCreate = event + " " + moment.utc(this.mObj.timeCreate).format("HH:mm");
    } else {
      timeCreate = moment.utc(this.mObj.timeCreate).format("YYYY-MM-DD") + " " + event;
    }

    this.mObj.timeCreate = timeCreate;

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj, null, null, timeCreate
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

}
