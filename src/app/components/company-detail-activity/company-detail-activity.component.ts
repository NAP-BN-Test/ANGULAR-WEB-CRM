import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, ACTIVITY_TYPE, LIST_SELECT } from 'src/app/services/constant/app-constant';

import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-company-detail-activity',
  templateUrl: './company-detail-activity.component.html',
  styleUrls: ['./company-detail-activity.component.scss']
})
export class CompanyDetailActivityComponent implements OnInit {

  @Input('mObj') mObj: any;
  @Input('listContact') listContact = [];
  @Input('listUser') listUser = [];

  @Output('onListChange') onListChange = new EventEmitter();

  listAttend = [];
  listAssociate = [];

  mData: any;

  showToast = false;
  toasMessage = "";

  listOutcome = LIST_SELECT.LIST_OUTCOME;

  listDuration = [
    { value: 900, name: "15 minutes" },
    { value: 1800, name: "30 minutes" },
    { value: 3600, name: "1 hour" },
    { value: 7200, name: "2 hours" },
    { value: 10800, name: "3 hours" }
  ]

  listTaskType = [
    { id: 1, name: "Call" },
    { id: 2, name: "Email" },
    { id: 3, name: "Meet" },
  ]

  taskDetail = "keyboard_arrow_right";
  cmtDetail = "keyboard_arrow_right";
  showDetail = false;
  showCmt = false;


  showQuill = false;
  showQuillCmt = false;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_detail;
    });

    if (this.mObj.activityType == 3) {
      this.mService.getApiService().sendRequestGET_LIST_MEET_ATTEND(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAttend.push(itm.userID);
          })
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.NOTE) {
      this.mService.getApiService().sendRequestGET_NOTE_ASSOCIATE(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.userID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.CALL) {
      console.log(this.mObj);

    }
  }

  onChangeContact(type) { //type is contactID:1 or state of activity:2
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj,
      type == 1 ? this.mObj.contactID : null,
      type == 2 ? this.mObj.state : null,
      null, this.mObj.duration, null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  onChangeUser() {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj,
      null, null, null, null, null, null,
      this.mObj.assignID
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  onTaskTypeChange() {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj,
      null, null, null, null, null, null, null,
      this.mObj.taskType
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  onClickDeleteNote() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.mService.getApiService().sendRequestDELETE_NOTE(
          this.mService.getServer().ip,
          this.mService.getServer().dbName,
          this.mService.getUser().username,
          this.mService.getUser().id,
          this.mObj.id
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {

            this.onListChange.emit({ activityType: this.mObj.activityType, id: this.mObj.id });

            this.toasMessage = data.message;
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 2000);
          }
        })
      }
    });

  }

  onChangeDuration() {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj,
      null, null, null, this.mObj.duration, null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  pickDate(event, type) { //type here is Time:1 or DateOny:2
    let timeStart = ""
    if (type == 1) {
      timeStart = event + " " + moment.utc(this.mObj.timeCreate).format("HH:mm");
    } else {
      timeStart = moment.utc(this.mObj.timeCreate).format("YYYY-MM-DD") + " " + event;
    }
    this.mObj.timeStart = timeStart;

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj, null, null, timeStart, null, null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  onSelectDone(event) {
    let listID = [];
    event.forEach(elm => {
      if (elm.checked)
        listID.push(elm.id)
    });

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mObj,
      null, null, null, null, JSON.stringify(listID)
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  onQuillDescriptionChange(event, type: number) {
    this.showQuill = false;

    if (event) {
      this.mObj.description = event;

      this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        this.mObj,
        null, null, null, null, null, this.mObj.description
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.toasMessage = data.message;
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 2000);
        }
      })

    }
  }

  onQuillCommentChange(event) {
    this.showQuillCmt = false;

    if (event) {
      this.mService.getApiService().sendRequestADD_COMMENT(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        this.mService.getUser().id,
        this.mService.getUser().name,
        this.mObj,
        event).then(data => {
          if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
            this.mObj.listComment.push(data.obj);
          }
        })

    }
  }

  onNoteAssociateChange(event) {
    if (event) {
      this.toasMessage = event;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);

    }

  }

  onClickTaskDetail() {

    let task = document.getElementById('task-detail');


    if (this.showDetail) {
      this.taskDetail = "keyboard_arrow_right";

      task.classList.remove('task-detail-show');
      task.classList.add('task-detail-hide');
    }
    else {
      this.taskDetail = "keyboard_arrow_down";

      task.classList.remove('task-detail-hide');
      task.classList.add('task-detail-show');
    }

    this.showDetail = !this.showDetail;

  }

  onClickCmtDetail() {

    let cmt = document.getElementById('cmt-detail');


    if (this.showCmt) {
      this.cmtDetail = "keyboard_arrow_right";

      cmt.classList.remove('task-detail-show');
      cmt.classList.add('task-detail-hide');
    }
    else {
      this.cmtDetail = "keyboard_arrow_down";

      cmt.classList.remove('task-detail-hide');
      cmt.classList.add('task-detail-show');
    }

    this.showCmt = !this.showCmt;

  }

  onClickEdit() {
    this.showQuill = true;
  }

  onClickCmt() {
    this.showQuillCmt = true;
  }

}
