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

  mData: any;

  showTimePicker = false;

  contactID = -1;
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
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.create_tag;
    });
  }

  onClickClose() {
    this.closeCreateAction.emit()
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
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('m-id') ? this.cookieService.get('m-id') : null,
      this.contactID,
      this.outcomeType,
      this.datetime,
      this.showTimePicker ? this.dateRemind : null,
      this.quillValue,
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeCreateAction.emit(data.obj)
      }
    })

  }

}
