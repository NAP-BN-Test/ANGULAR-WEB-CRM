import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-company-detail-activity',
  templateUrl: './company-detail-activity.component.html',
  styleUrls: ['./company-detail-activity.component.scss']
})
export class CompanyDetailActivityComponent implements OnInit {

  mData: any;

  mObj = {
    type: 1,
    created: "Lê Minh Sơn",
    time: "26/12/ 2019 at 8:46 AM",
    name: "Làm việc với khách hàng này nhé",
    assignTo: "Namldv",
    assignDate: "26 / 12 / 2019",
    assignTime: "08 : 30",
    typeTask: "To-do",
    remindDate: "26 / 12 / 2019",
    remindTime: "08 : 30"
  }

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_detail;
    })
  }

}
