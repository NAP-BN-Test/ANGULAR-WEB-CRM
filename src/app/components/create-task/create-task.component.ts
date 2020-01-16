import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  @Output("closeCreateAction") closeCreateAction = new EventEmitter();

  @Input('listUser') listUser = [];

  mData: any;

  showTimePicker = false;

  assignID = -1;
  taskType = -1;
  description = "";
  taskName = "";

  timeStart = moment.utc().format("YYYY-MM-DD HH:mm");
  timeAssign = moment.utc().format("YYYY-MM-DD HH:mm");
  timeRemind = moment.utc().format("YYYY-MM-DD HH:mm");


  mConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['code-block']
    ]
  }

  listTaskType = LIST_SELECT.LIST_ACTIVITY;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.create_tag;
    })
  }

  onInputChange(event) {
    this.showTimePicker = event.target.checked;
  }

  pickTimeRemind(event) {
    this.timeRemind = event;
  }

  pickTimeStart(event, type) { //type here is Time:1 or DateOny:2
    if (type == 1) {
      this.timeStart = event + " " + "00:00";
    } else {
      this.timeStart = moment.utc(this.timeStart).format("YYYY-MM-DD") + " " + event;
    }
  }

  pickTimeAssign(event, type) { //type here is Time:1 or DateOny:2
    if (type == 1) {
      this.timeAssign = event + " " + "00:00";
    } else {
      this.timeAssign = moment.utc(this.timeAssign).format("YYYY-MM-DD") + " " + event;
    }
  }

  onClickClose() {
    this.closeCreateAction.emit()
  }

  onClickSave() {

    this.mService.getApiService().sendRequestCREATE_TASK(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('m-id') ? this.cookieService.get('m-id') : null,
      this.assignID,
      this.taskType,
      this.taskName,
      this.timeStart,
      this.timeAssign,
      this.showTimePicker ? this.timeRemind : null,
      this.description,
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeCreateAction.emit(data.obj)
      }
    })

  }

}
