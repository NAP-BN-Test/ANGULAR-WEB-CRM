import { Component, OnInit, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact-detail-activity',
  templateUrl: './contact-detail-activity.component.html',
  styleUrls: ['./contact-detail-activity.component.scss']
})
export class ContactDetailActivityComponent implements OnInit {
  @Input('listContact') listContact = [];
  @Input('listUser') listUser = [];
  @Input('oneActivity') oneActivity: any;


  mData: any;

  listActivity = [];


  showSearchBar = false;
  menuSelected = 0;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.company_detail;
    })

    if (this.oneActivity) {
      this.listActivity.push(this.oneActivity);
    } else {
      this.onLoadActivity(0)
    }
  }

  onLoadActivity(activityType: number) {
    this.mService.getApiService().sendRequestGET_LIST_ACTIVITY_FOR_CONTACT(
      this.mService.getUser().username,
      this.cookieService.get('contact-id') ? this.cookieService.get('contact-id') : null,
      activityType
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