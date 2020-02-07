import { Component, OnInit, ViewChild } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { STATUS } from 'src/app/services/constant/app-constant';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { CompanySubDetailComponent } from '../company-sub-detail/company-sub-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(CompanyDetailComponent, { static: false }) companyDetailComponent: CompanyDetailComponent;
  @ViewChild(CompanySubDetailComponent, { static: false }) companySubDetailComponent: CompanySubDetailComponent;

  mData: any;

  createTabIndex = 0;

  addSubDetail = 0;

  mID = -1;

  listCompany = []; //company associate
  listContact = [];
  listUser = [];
  listDealStage = [];

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
      this.cookieService.set('company-id', this.mID + "");
    } else {
      if (this.cookieService.get('company-id')) {
        this.mID = Number(this.cookieService.get('company-id'));
      }
    }

  }

  ngOnInit() {
    this.mService.LoadTitle(1).then(data => {
      this.mData = data;
    });

    if (this.mService.getUser()) {
      this.mService.getApiService().sendRequestGET_LIST_QUICK_COMPANY(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        this.mService.getUser().id,
        this.mID + ""
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listCompany = data.array
        }
      })

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

      this.mService.getApiService().sendRequestGET_DEAL_STAGE(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        this.mService.getUser().id
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listDealStage = data.array;
        }
      })
    }
    else {
      this.router.navigate(['login']);
    }


  }

  onClickCreateAction(event) {
    this.createTabIndex = event;
  }

  onClickCloseCreateAction(event) {
    this.createTabIndex = 0;
    if (event) {
      this.companyDetailComponent.listActivity.unshift(event)
    }
  }

  onClickAddSubDetail(event) {
    this.addSubDetail = event;
  }

  onClickCloseSubDetail(event, type) {
    if (event) {
      if (type == 1) {
        this.companySubDetailComponent.listContact.unshift(event);
      } else if (type == 2) {
        this.companySubDetailComponent.listCompany.unshift(event);
      } else if (type == 3) {
        event.stageID = Number(event.stageID);
        this.companySubDetailComponent.listDeal.unshift(event);
      }
    }

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
