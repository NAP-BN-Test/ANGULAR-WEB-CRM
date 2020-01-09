import { Component, OnInit, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-company-sub-detail-deal',
  templateUrl: './company-sub-detail-deal.component.html',
  styleUrls: ['./company-sub-detail-deal.component.scss']
})
export class CompanySubDetailDealComponent implements OnInit {

  @Input('mObj') mObj: any;

  mData: any;

  listWeek = [
    { index: 0, hasValue: true },
    { index: 1, hasValue: true },
    { index: 2, hasValue: true },
    { index: 3, hasValue: false },
    { index: 4, hasValue: false },
    { index: 5, hasValue: false },
    { index: 6, hasValue: false }
  ]

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_sub_detail;
    })

  }

}
