import { Component, OnInit, ViewChild } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { ACTIVITY_TYPE, STATUS } from 'src/app/services/constant/app-constant';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(CompanyDetailComponent, { static: false }) companyDetailComponent: CompanyDetailComponent;

  mData: any;

  createTabIndex = 0;

  addSubDetail = 0;

  mID = -1;

  listContact = [];
  listUser = [];

  colDetail = "col-md-6";
  colSubDetail = "col-md-3";
  iconSubDetail = "arrow_forward";
  iconSubDetailState = true;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    private cookieService: CookieService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.mID = this.router.getCurrentNavigation().extras.state.params;
      this.cookieService.set('m-id', this.mID + "");
    } else {
      if (this.cookieService.get('m-id')) {
        this.mID = Number(this.cookieService.get('m-id'));
      }
    }

  }

  ngOnInit() {
    this.mService.LoadTitle(1).then(data => {
      this.mData = data;
    });

    this.mService.getApiService().sendRequestGET_LIST_CONTACT(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mID
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    });

    this.mService.getApiService().sendRequestGET_LIST_USER(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listUser = data.array;
      }
    });
  }

  onClickCreateAction(event) {
    this.createTabIndex = event;
  }

  onClickCloseCreateAction(event) {
    this.createTabIndex = 0;
    if (event) {
      if (event.activityType == ACTIVITY_TYPE.NOTE) {
        this.companyDetailComponent.listActivity.unshift(event)
      }
      this.companyDetailComponent.listActivity.unshift(event)

    }
  }

  onClickAddSubDetail(event) {
    this.addSubDetail = event;
  }

  onClickCloseSubDetail() {
    this.addSubDetail = 0;
  }

  onClickShowSubDetail() {
    if (this.iconSubDetailState) {
      this.iconSubDetail = "arrow_back";
      this.colDetail = "col-md-8 slide-animation";
      this.colSubDetail = "col-md-1 slide-animation";

      this.iconSubDetailState = false;
    }
    else {
      this.iconSubDetail = "arrow_forward";
      this.colDetail = "col-md-6 slide-animation";
      this.colSubDetail = "col-md-3 slide-animation fade-in";

      this.iconSubDetailState = true;
    }
  }
}
