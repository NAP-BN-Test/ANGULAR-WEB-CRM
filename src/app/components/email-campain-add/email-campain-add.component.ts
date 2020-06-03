import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-email-campain-add',
  templateUrl: './email-campain-add.component.html',
  styleUrls: ['./email-campain-add.component.scss']
})
export class EmailCampainAddComponent implements OnInit {
  @ViewChild('editor') editor;

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number;

  sendByTime = false;

  mData: any;

  name = "";
  subject = "";
  mailListID = -1;

  btnType = 1;

  quillContent = "";

  listContact = [];

  btnAddExist = true;
  btnCanClicked = true;

  listGender = LIST_SELECT.LIST_GENDER;
  listMailList = [];


  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.add_sub_detail;
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
    this.quillContent = "";
  }

  onClickAddExist() {
    this.btnAddExist = true;
  }

  onClickAddNew() {
    this.btnAddExist = false;
  }

  onClickSave() {
    if (this.name.trim() != "" && this.subject.trim() != "" && this.quillContent.trim() != "" && this.mailListID != -1) {
      let obj = {
        name: this.name,
        mailListID: this.mailListID,
        subject: this.subject,
        body: this.quillContent,
        createTime: new Date(),
        nearestSend: new Date(),
        owner: this.mService.getUser().name
      }

      this.mService.getApiService().sendRequestADD_MAIL_CAMPAIN(
        this.mService.getUser().id,
        obj
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(obj);

          this.name = "";
          this.mailListID = -1;
          this.subject = "";
          this.quillContent = "";
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

  onClickStep(index) {
    this.btnType = index;
  }


}
