import { Component, OnInit, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  @Input('mID') mID = -1;

  mData: any;

  listActivity = [];
  listContact = [];

  showSearchBar = false;
  menuSelected = 0;

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_detail;
    })

    this.onLoadActivity(0)

    this.mService.getApiService().sendRequestGET_LIST_CONTACT(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mID
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    });
  }

  onLoadActivity(activityType: number) {
    this.mService.getApiService().sendRequestGET_LIST_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mID, activityType
    ).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listActivity = data.array;
      }
    });
  }

  onClickMenu(index: number) {
    if (index > -1) {
      this.menuSelected = index;

      this.onLoadActivity(index);

    }
  }

}
