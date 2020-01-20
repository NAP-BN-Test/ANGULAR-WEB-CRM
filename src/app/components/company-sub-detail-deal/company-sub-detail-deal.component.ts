import { Component, OnInit, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-company-sub-detail-deal',
  templateUrl: './company-sub-detail-deal.component.html',
  styleUrls: ['./company-sub-detail-deal.component.scss']
})
export class CompanySubDetailDealComponent implements OnInit {

  @Input('mObj') mObj: any;
  @Input("listDealStage") listDealStage = [];


  mData: any;

  listWeek = [
    { index: 0, hasValue: false },
    { index: 1, hasValue: false },
    { index: 2, hasValue: false },
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
    });
    this.onLoadStage();
  }

  onChangeStage() {
    this.onLoadStage();
  }

  onLoadStage() {
    this.listWeek.forEach((item, i) => {
      if (i < Number(this.mObj.stageID)) {
        item.hasValue = true;
      } else {
        item.hasValue = false;
      }
    })
  }

}
