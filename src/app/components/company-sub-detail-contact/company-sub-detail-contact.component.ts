import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-company-sub-detail-contact',
  templateUrl: './company-sub-detail-contact.component.html',
  styleUrls: ['./company-sub-detail-contact.component.scss']
})
export class CompanySubDetailContactComponent implements OnInit {

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
