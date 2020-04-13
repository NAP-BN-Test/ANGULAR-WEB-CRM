import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

import * as moment from 'moment';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss']
})
export class AddDealComponent implements OnInit {
  // @Input("listCompany") listCompany = [];
  @Input("listContact") listContact = [];
  @Input("listDealStage") listDealStage = [];

  @Input("contactAddDeal") contactAddDeal: any;



  @Output("closeAddSub") closeAddSub = new EventEmitter();

  mData: any;

  btnCanClicked = true;

  showRemindDate = false;

  name = "";
  stageID = 0;
  amount = 0;
  dateClose = moment.utc().format("YYYY-MM-DD");
  // companyID = -1;
  contactID = -1;
  dateRemind = moment.utc().format("YYYY-MM-DD");

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.add_sub_detail;
    });
  }

  onClickClose() {
    this.closeAddSub.emit();

    this.name = "";
    this.stageID = 0;
    this.amount = 0;
    this.dateClose = moment.utc().format("YYYY-MM-DD");
    this.contactID = -1;
    this.dateRemind = moment.utc().format("YYYY-MM-DD");
  }


  onClickSave() {
    let obj = {
      name: this.name,
      companyID: this.contactAddDeal ? null : this.cookieService.get('company-id'),
      contactID: this.contactAddDeal ? this.cookieService.get('contact-id') : this.contactID,
      stageID: this.stageID,
      timeClose: this.dateClose,
      timeRemind: this.dateRemind,
      amount: this.amount,
    }
    this.mService.getApiService().sendRequestADD_DEAL(
      this.mService.getUser().username,
      this.mService.getUser().id,
      obj
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeAddSub.emit(data.obj);

        this.name = "";
        this.stageID = 0;
        this.amount = 0;
        this.dateClose = moment.utc().format("YYYY-MM-DD");
        this.contactID = -1;
        this.dateRemind = moment.utc().format("YYYY-MM-DD");
      }
    })
  }

  onPickDateRemind(event) {
    this.dateRemind = event;
  }

  onPickDateClose(event) {
    this.dateClose = event;
  }


  onInputChange(event) {
    this.showRemindDate = event.target.checked;
  }


}
