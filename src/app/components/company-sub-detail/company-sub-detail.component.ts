import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-company-sub-detail',
  templateUrl: './company-sub-detail.component.html',
  styleUrls: ['./company-sub-detail.component.scss']
})
export class CompanySubDetailComponent implements OnInit {
  @Input('mID') mID = -1;

  @Output('addSubDetail') addSubDetail = new EventEmitter();

  mData: any;

  listContact = [];
  listCompany = [];
  listDeal = [];

  constructor(
    public mService: AppModuleService,
  ) {

  }

  ngOnInit() {
    this.mService.LoadTitles(1).then((data: any) => {
      this.mData = data.company_sub_detail;


    });

    this.mService.getApiService().sendRequestGET_LIST_QUICK_CONTACT(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.mID
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    })

    this.mService.getApiService().sendRequestGET_LIST_QUICK_COMPANY(this.mService.getServer().ip, this.mService.getServer().dbName, "loapao", 1, this.mID).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listCompany = data.array;
      }
    })

    this.mService.getApiService().sendRequestGET_LIST_QUICK_DEAL(this.mService.getServer().ip, this.mService.getServer().dbName, "loapao", this.mID).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listDeal = data.array;
      }
    })

  }

  onClickAddSubDetail(index: number) {
    this.addSubDetail.emit(index);
  }

}
