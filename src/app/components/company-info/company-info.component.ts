import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  mData: any;

  mDataSv = {
    name: "Nam An Phu JSC.",
    shortName: "NAP",
    address: "Linh Đàm, Hà Nội",
    phone: "0234 234 234",
    email: "info.namanphu@gmail.com",
    country: "Vietnam"
  }

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_info;
    })
  }

}
