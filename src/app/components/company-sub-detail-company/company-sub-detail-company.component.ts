import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-company-sub-detail-company',
  templateUrl: './company-sub-detail-company.component.html',
  styleUrls: ['./company-sub-detail-company.component.scss']
})
export class CompanySubDetailCompanyComponent implements OnInit {

  mData: any;

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_sub_detail;
    })
  }

}
