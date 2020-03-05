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

  listMailStatus = LIST_SELECT.LIST_MAIL_STATUS

  listDuration = LIST_SELECT.LIST_DURATION;

  listTaskType = LIST_SELECT.LIST_ACTIVITY;

  taskDetail = "keyboard_arrow_right";

  showDetail = false;

  showQuill = false;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.company_detail;
    });

    if (this.mObj.activityType == ACTIVITY_TYPE.MEET) {
      this.mService.getApiService().sendRequestGET_LIST_MEET_ATTEND(


        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAttend.push(itm.userID);
          })
        }
      });
      this.mService.getApiService().sendRequestGET_MEET_ASSOCIATE(


        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.NOTE) {
      this.mService.getApiService().sendRequestGET_NOTE_ASSOCIATE(


        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.CALL) {

      this.mService.getApiService().sendRequestGET_CALL_ASSOCIATE(


        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.EMAIL) {
      this.mService.getApiService().sendRequestGET_EMAIL_ASSOCIATE(


        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.TASK) {
      this.mService.getApiService().sendRequestGET_TASK_ASSOCIATE(


        this.mService.getUser().username,
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }

  }

  onChangeContact(type) { //type is contactID:1 or state of activity:2
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(


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

  onClickDeleteActivity(type: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let listID = [];
        listID.push(Number(this.mObj.id));
        if (type == ACTIVITY_TYPE.CALL) {
          this.mService.getApiService().sendRequestDELETE_CALL(
            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
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
        } else if (type == ACTIVITY_TYPE.EMAIL) {
          this.mService.getApiService().sendRequestDELETE_EMAIL(
            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
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
        } else if (type == ACTIVITY_TYPE.MEET) {
          this.mService.getApiService().sendRequestDELETE_MEET(
            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
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
        } else if (type == ACTIVITY_TYPE.NOTE) {
          this.mService.getApiService().sendRequestDELETE_NOTE(
            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
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
        } else if (type == ACTIVITY_TYPE.TASK) {
          this.mService.getApiService().sendRequestDELETE_TASK(
            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
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
      }
    });

  }

  onChangeDuration() {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(


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

  pickTimeStart(event, type) {
    let time = ""
    if (type == 1) {
      time = event + " " + moment.utc(this.mObj.timeCreate).format("HH:mm");
    } else {
      time = moment.utc(this.mObj.timeCreate).format("YYYY-MM-DD") + " " + event;
    }
    this.mObj.timeStart = time;

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(


      this.mService.getUser().username,
      this.mObj, null, null, time, null, null
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

  pickTimeAssign(event, type) {
    let time = ""
    if (type == 1) {
      time = event + " " + moment.utc(this.mObj.timeCreate).format("HH:mm");
    } else {
      time = moment.utc(this.mObj.timeCreate).format("YYYY-MM-DD") + " " + event;
    }
    this.mObj.timeStart = time;

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(


      this.mService.getUser().username,
      this.mObj, null, null, null, null, null, null, null, null, null, time
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

  dropdownChange(event) {
    if (event) {
      this.toasMessage = event;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);

    }
  }

  onQuillDescriptionChange(event) {
    this.showQuill = false;

    if (event) {
      this.mObj.description = event;

      this.mService.getApiService().sendRequestUPDATE_ACTIVITY(


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

  onInputTaskNameChange(event) {
    if (event) {
      this.mObj.taskName = event.target.value;

      this.mService.getApiService().sendRequestUPDATE_ACTIVITY(


        this.mService.getUser().username,
        this.mObj,
        null, null, null, null, null, null, null, null, this.mObj.taskName
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

  onClickEdit() {
    this.showQuill = true;
  }

  onTaskStatusChange(event) {
    let checked = event.target.checked;

    this.mService.getApiService().sendRequestUPDATE_TASK(


      this.mService.getUser().username,
      this.mService.getUser().id,
      this.mObj.id,
      checked ? checked : null
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.mObj.status = checked;
      }
    })
  }

  onTextAreaChange(event) {
    console.log(event.target.value);

  }

}
