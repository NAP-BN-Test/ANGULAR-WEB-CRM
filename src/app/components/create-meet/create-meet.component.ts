import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-create-meet',
  templateUrl: './create-meet.component.html',
  styleUrls: ['./create-meet.component.scss']
})
export class CreateMeetComponent implements OnInit {

  @Output("closeCreateAction") closeCreateAction = new EventEmitter();
  @Input("listContact") listContact = [];
  @Input("createInContact") createInContact = false;

  mData: any;

  showTimePicker = false;

  listAssociate = [];

  datetime = moment.utc().format("YYYY-MM-DD HH:mm");
  quillValue: any;
  dateRemind = moment.utc().format("YYYY-MM-DD");

  listAttendID = [];
  duration = 0;

  mConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['code-block']
    ]
  }

  listDuration = LIST_SELECT.LIST_DURATION;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.create_tag;
    })
  }

  onClickClose() {
    this.closeCreateAction.emit();

    this.quillValue = "";
    this.duration = 0;
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

  onDropChange(event) {
    if (event)
      this.listAttendID = event;
  }

  onClickSave() {

    this.mService.getApiService().sendRequestCREATE_MEET(


      this.mService.getUser().username,
      this.mService.getUser().id,
      !this.createInContact ? this.cookieService.get('company-id') : null,
      this.createInContact ? this.cookieService.get('contact-id') : null,
      this.listAttendID,
      this.duration,
      this.datetime,
      this.showTimePicker ? this.dateRemind : null,
      this.quillValue,
      this.listAssociate
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeCreateAction.emit(data.obj);

        this.quillValue = "";
        this.duration = 0;
      }
    })

  }

  onAssociateChange(event) {
    if (event)
      this.listAssociate = event;
  }

}
