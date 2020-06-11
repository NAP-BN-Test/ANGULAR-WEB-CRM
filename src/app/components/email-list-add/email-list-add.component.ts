import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

import * as moment from 'moment';

@Component({
  selector: 'app-email-list-add',
  templateUrl: './email-list-add.component.html',
  styleUrls: ['./email-list-add.component.scss']
})
export class EmailListAddComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number;

  mData: any;

  name = "";
  phone = "";

  listContact = [];

  btnAddExist = true;
  btnCanClicked = true;

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
    this.phone = "";
  }

  onClickAddExist() {
    this.btnAddExist = true;
  }

  onClickAddNew() {
    this.btnAddExist = false;

  }

  onClickSave() {
    if (this.name.trim() != "" && this.phone.trim() != "") {
      let obj = {
        name: this.name,
        phone: this.phone,
        owner: this.mService.getUser().name,
        createTime: moment().format("YYYY-MM-DD"),
      }

      this.mService.getApiService().sendRequestADD_MAIL_LIST(
        this.mService.getUser().id,
        obj
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(obj);

          this.name = "";
          this.phone = "";
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

}
