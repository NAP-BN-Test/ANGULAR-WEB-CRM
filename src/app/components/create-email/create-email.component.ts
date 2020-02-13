import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss']
})
export class CreateEmailComponent implements OnInit {

  @Output("closeCreateAction") closeCreateAction = new EventEmitter();

  @Input("listContact") listContact = [];
  @Input("createInContact") createInContact = false;

  mData: any;

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

  listOutcome = LIST_SELECT.LIST_OUTCOME;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) {
    this.contactName = this.cookieService.get('contact-name');
  }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.create_tag;
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

    this.mService.getApiService().sendRequestCREATE_EMAIL(


      this.mService.getUser().username,
      this.mService.getUser().id,
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
