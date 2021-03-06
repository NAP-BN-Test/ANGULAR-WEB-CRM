import { Component, OnInit, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, EVENT_PUSH } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  @Input('listContact') listContact = [];
  @Input('listUser') listUser = [];
  @Input('oneActivity') oneActivity: any;

  mTitle: any;

  mID = -1;

  listActivity = [];

  dataSubscribe: any

  showSearchBar = false;
  menuSelected = 0;

  activityID;

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_detail;
    })

    let params: any = this.mService.handleActivatedRoute();
    this.mID = params.companyID;
    this.activityID = params.activityID;

    if (this.oneActivity) {
      this.listActivity.push(this.oneActivity);
    } else {
      this.onLoadActivity(0)
    }
    this.dataSubscribe = this.mService.currentEvent.subscribe(sData => {
      if (sData.name == EVENT_PUSH.ACTIVITY) {
        this.onLoadActivity(0);
      }
    })
  }

  ngOnDestroy() {
    this.dataSubscribe.unsubscribe();
  }

  onLoadActivity(activityType: number) {
    this.mService.getApiService().sendRequestGET_LIST_ACTIVITY(
      this.mID + "",
      activityType,
      this.activityID
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listActivity = data.array;
      }
    });
  }

  onClickMenu(index: number) {
    this.activityID = null;
    let listParams = [{ key: 'companyID', value: this.mID }];
    this.mService.handleParamsRoute(listParams);
    if (index > -1) {
      this.menuSelected = index;

      this.onLoadActivity(index);

    }
  }

  onListChange(event) {
    if (event) {
      let index = this.listActivity.findIndex(item => {
        return item.id == event.id && item.activityType == event.activityType;
      });

      if (index > -1) {
        this.listActivity.splice(index, 1);
      }
    }
  }

}
