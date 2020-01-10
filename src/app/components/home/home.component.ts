import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mData: any;

  createTabIndex = 0;

  addSubDetail = 0;

  mID = -1;

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
  }

  onClickCreateAction(event) {
    this.createTabIndex = event;
  }

  onClickCloseCreateAction() {
    this.createTabIndex = 0;
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
