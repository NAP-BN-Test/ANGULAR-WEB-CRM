import { Component, OnInit, ViewChild } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { STATUS } from 'src/app/services/constant/app-constant';
import { ContactDetailOtherComponent } from '../contact-detail-other/contact-detail-other.component';
import { ContactDetailActivityComponent } from '../contact-detail-activity/contact-detail-activity.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  @ViewChild(ContactDetailActivityComponent, { static: false }) contactDetailActivityComponent: ContactDetailActivityComponent;
  @ViewChild(ContactDetailOtherComponent, { static: false }) ContactDetailOtherComponent: ContactDetailOtherComponent;

  mData: any;

  oneActivity: any;

  createTabIndex = 0;

  addSubDetail = 0;

  mID = -1;
  mName = "";

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
      let params = this.router.getCurrentNavigation().extras.state.params;      
      if (params.type) {
        this.oneActivity = params;
        this.mID = params.contactID;
        this.mName = params.contactName;
      } else {
        this.mID = params.id;
        this.mName = params.name;
      }
      this.cookieService.set('contact-id', this.mID + "");
      this.cookieService.set('contact-name', this.mName + "");
    } else {
      if (this.cookieService.get('contact-id')) {
        this.mID = Number(this.cookieService.get('contact-id'));
      }
    }

  }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then(data => {
      this.mData = data;
    });

    if (this.mService.getUser()) {
      this.mService.getApiService().sendRequestGET_LIST_CONTACT(
        
        
        this.mService.getUser().username,
        this.mID
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listContact = data.array;
        }
      });

      this.mService.getApiService().sendRequestGET_LIST_USER(
        
        
        this.mService.getUser().username,
        this.mService.getUser().id
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listUser = data.array;
        }
      });

      this.mService.getApiService().sendRequestGET_DEAL_STAGE(
        
        
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
      this.contactDetailActivityComponent.listActivity.unshift(event)
    }
  }

  onClickAddSubDetail(event) {
    this.addSubDetail = event;
  }

  onClickCloseSubDetail(event, type) {
    if (event) {
      if (type == 3) {
        event.stageID = Number(event.stageID);
        this.ContactDetailOtherComponent.listDeal.unshift(event)
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
