import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

import * as moment from 'moment';

@Component({
  selector: 'app-email-campain-add',
  templateUrl: './email-campain-add.component.html',
  styleUrls: ['./email-campain-add.component.scss']
})
export class EmailCampainAddComponent implements OnInit {
  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number;

  sendByTime = false;

  mTitle: any;

  name = "";
  subject = "";
  mailListID = -1;
  endTime: any;

  listContact = [];

  btnAddExist = true;
  btnCanClicked = true;

  listGender = LIST_SELECT.LIST_GENDER;
  listMailList = [];

  quillFile: any;
  meQuillRef: any;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.add_sub_detail;
    });

    this.mService.getApiService().sendRequestGET_MAIL_LIST_OPTION().then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listMailList = data.array;
    })
  }

  onClickClose() {
    this.closeAddSub.emit();

    this.name = "";
    this.mailListID = -1;
    this.subject = "";
  }

  onClickAddExist() {
    this.btnAddExist = true;
  }

  onClickAddNew() {
    this.btnAddExist = false;
  }

  onClickSave() {

    if (this.name.trim() != "" && this.subject.trim() != "" && this.mailListID != -1) {
      let obj = {
        id: -1,
        name: this.name,
        mailListID: this.mailListID,
        subject: this.subject,
        createTime: moment().format("YYYY-MM-DD"),
        endTime: moment(this.endTime.year + "-" + this.endTime.month + "-" + this.endTime.day).format("YYYY-MM-DD"),
        nearestSend: moment().format("YYYY-MM-DD"),
        owner: this.mService.getUser().name
      }

      this.mService.getApiService().sendRequestADD_MAIL_CAMPAIN(
        this.mService.getUser().id,
        obj
      ).then(data => {
        
        if (data.status == STATUS.SUCCESS) {
          obj.id = data.id;

          this.closeAddSub.emit(obj);

          this.name = "";
          this.mailListID = -1;
          this.subject = "";
        }
      })
    }
  }

  onSeachContact(event) {
    let searchKey = event.target.value;

    this.mService.getApiService().sendRequestSEARCH_CONTACT(
      this.mService.getUser().username,
      this.mService.getUser().id,
      searchKey
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    })
  }

  onClickAddContact(item) {
    this.mService.getApiService().sendRequestADD_CONTACT_BY_ID(
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
      item.id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeAddSub.emit(data.obj);
      }
    })
  }

  onRadioChange(event) {
    if (event.value == 2) {
      this.sendByTime = true;
    } else {
      this.sendByTime = false;
    }
  }

}
