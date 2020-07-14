import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';

import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-create-call',
  templateUrl: './create-call.component.html',
  styleUrls: ['./create-call.component.scss']
})
export class CreateCallComponent implements OnInit {

  @Output("closeCreateAction") closeCreateAction = new EventEmitter();

  @Input("listContact") listContact = [];
  @Input("createInContact") createInContact = false;

  mTitle: any;

  showTimePicker = false;

  listAssociate = [];

  contactID = -1;
  contactName = "";

  outcomeType = -1;
  datetime = moment.utc().format("YYYY-MM-DD HH:mm");
  quillValue: any;
  dateRemind = moment.utc().format("YYYY-MM-DD");


  mConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['code-block']
    ]
  }

  listOutcome = [];

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) {
    this.contactName = this.cookieService.get('contact-name');
  }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.create_tag;
    });

    this.mService.getApiService().sendRequestGET_CATEGORY_CALL_OUTCOME("").then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listOutcome = data.array;
    })

  }

  onClickClose() {
    this.closeCreateAction.emit();

    this.quillValue = "";
  }

  onPickDate(event) {
    this.dateRemind = event;
  }

  onInputChange(event) {
    this.showTimePicker = event.target.checked;
  }

  pickDate(event, type) { //type here is Time:1 or DateOny:2
    if (type == 1) {
      this.datetime = event + " " + "00:00";
    } else {
      this.datetime = moment.utc(this.datetime).format("YYYY-MM-DD") + " " + event;
    }
  }

  onClickSave() {
    this.mService.getApiService().sendRequestCREATE_CALL(
      
      
      !this.createInContact ? this.cookieService.get('company-id') : null,
      this.createInContact ? Number(this.cookieService.get('contact-id')) : this.contactID,
      this.outcomeType,
      this.datetime,
      this.showTimePicker ? this.dateRemind : null,
      this.quillValue,
      this.listAssociate
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeCreateAction.emit(data.obj);

        this.quillValue = "";
      }
    })

  }

  onAssociateChange(event) {
    if (event)
      this.listAssociate = event;
  }

}
