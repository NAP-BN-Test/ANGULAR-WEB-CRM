import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, ACTIVITY_TYPE, LIST_SELECT } from 'src/app/services/constant/app-constant';

import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact-detail-activity-list',
  templateUrl: './contact-detail-activity-list.component.html',
  styleUrls: ['./contact-detail-activity-list.component.scss']
})
export class ContactDetailActivityListComponent implements OnInit {
  @Input('mObj') mObj: any;
  @Input('listContact') listContact = [];
  @Input('listUser') listUser = [];

  @Output('onListChange') onListChange = new EventEmitter();

  listAttend = [];
  listAssociate = [];

  mTitle: any;



  listOutcome = [];

  listMailOutcome = [];

  listHour = LIST_SELECT.LIST_TIME;

  listDuration = LIST_SELECT.LIST_DURATION;

  listTaskType = LIST_SELECT.LIST_ACTIVITY;

  taskDetail = "keyboard_arrow_right";

  showDetail = false;

  showQuill = false;

  contactName = "";

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) {
    this.contactName = this.cookieService.get('contact-name');
  }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_detail;
    }).then(() => {
      this.mService.getApiService().sendRequestGET_CATEGORY_CALL_OUTCOME("").then(data => {
        if (data.status == STATUS.SUCCESS)
          this.listOutcome = data.array;
      })
    }).then(() => {
      this.mService.getApiService().sendRequestGET_CATEGORY_MAIL_OUTCOME("").then(data => {
        if (data.status == STATUS.SUCCESS)
          this.listMailOutcome = data.array;
      })
    });

    if (this.mObj.activityType == ACTIVITY_TYPE.MEET) {
      this.mService.getApiService().sendRequestGET_LIST_MEET_ATTEND(
        this.mObj.id
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAttend.push(Number(itm.userID));
          });
          this.mService.getApiService().sendRequestGET_LIST_USER().then(userData => {
            if (userData.status == STATUS.SUCCESS) this.listUser = userData.array;
          })
        }
      });
      this.mService.getApiService().sendRequestGET_MEET_ASSOCIATE(this.mObj.id).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.NOTE) {
      this.mService.getApiService().sendRequestGET_NOTE_ASSOCIATE(this.mObj.id).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.CALL) {
      this.mService.getApiService().sendRequestGET_CALL_ASSOCIATE(this.mObj.id).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.EMAIL) {
      this.mService.getApiService().sendRequestGET_EMAIL_ASSOCIATE(this.mObj.id).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          data.array.forEach(itm => {
            this.listAssociate.push(itm.contactID);
          });
        }
      })
    }
    else if (this.mObj.activityType == ACTIVITY_TYPE.TASK) {
      this.mService.getApiService().sendRequestGET_TASK_ASSOCIATE(this.mObj.id).then(data => {
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
      this.mObj,
      type == 1 ? this.mObj.contactID : null,
      type == 2 ? this.mObj.state : null,
      null, this.mObj.duration, null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  onChangeUser() {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mObj,
      null, null, null, null, null, null,
      this.mObj.assignID
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  onTaskTypeChange() {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(
      this.mObj,
      null, null, null, null, null, null, null,
      this.mObj.taskType
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

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
          this.mService.getApiService().sendRequestDELETE_CALL(JSON.stringify(listID)).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onListChange.emit({ activityType: this.mObj.activityType, id: this.mObj.id });
              this.mService.showSnackBar(data.message)

            }
          })
        } else if (type == ACTIVITY_TYPE.EMAIL) {
          this.mService.getApiService().sendRequestDELETE_EMAIL(JSON.stringify(listID)).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onListChange.emit({ activityType: this.mObj.activityType, id: this.mObj.id });
              this.mService.showSnackBar(data.message)

            }
          })
        } else if (type == ACTIVITY_TYPE.MEET) {
          this.mService.getApiService().sendRequestDELETE_MEET(JSON.stringify(listID)).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onListChange.emit({ activityType: this.mObj.activityType, id: this.mObj.id });
              this.mService.showSnackBar(data.message)

            }
          })
        } else if (type == ACTIVITY_TYPE.NOTE) {
          this.mService.getApiService().sendRequestDELETE_NOTE(JSON.stringify(listID)).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onListChange.emit({ activityType: this.mObj.activityType, id: this.mObj.id });
              this.mService.showSnackBar(data.message)

            }
          })
        } else if (type == ACTIVITY_TYPE.TASK) {
          this.mService.getApiService().sendRequestDELETE_TASK(JSON.stringify(listID)).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onListChange.emit({ activityType: this.mObj.activityType, id: this.mObj.id });
              this.mService.showSnackBar(data.message)

            }
          })
        }
      }
    });

  }

  onChangeDuration() {
    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(

      this.mObj,
      null, null, null, this.mObj.duration, null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  onChangeListAtend(event) {
    if (event.value) {
      this.mService.getApiService().sendRequestUPDATE_MEET_ATTEND(this.mObj.id, JSON.stringify(event.value)).then(data => {
        this.mService.showSnackBar(data.message)
      })
    }
  }

  pickDate(event, type) { //type here is Time:1 or DateOny:2
    let time = ""
    if (type == 1 && event.value) {
      time = moment(event.value).format("YYYY-MM-DD") + " " + (this.mObj.hourStart != null ? this.mObj.hourStart : "00:00");
    } else if (type == 2 && event.value) {
      time = (this.mObj.dateStart != null ? this.mObj.dateStart : moment().format("YYYY-MM-DD")) + " " + event.value;
    }

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(

      this.mObj, null, null, time, null, null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  pickTimeStart(event, type) {
    let time = ""
    if (type == 1 && event.value) {
      time = moment(event.value).format("YYYY-MM-DD") + " " + (this.mObj.hourStart != null ? this.mObj.hourStart : "00:00");
    } else if (type == 2 && event.value) {
      time = (this.mObj.dateStart != null ? this.mObj.dateStart : moment().format("YYYY-MM-DD")) + " " + event.value;
    }

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(

      this.mObj, null, null, time, null, null
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  pickTimeRemind(event, type) {
    let time = ""
    if (type == 1 && event.value) {
      time = moment(event.value).format("YYYY-MM-DD") + " " + (this.mObj.hourRemind != null ? this.mObj.hourRemind : "00:00");
    } else if (type == 2 && event.value) {
      time = (this.mObj.dateRemind != null ? this.mObj.dateRemind : moment().format("YYYY-MM-DD")) + " " + event.value;
    }

    this.mService.getApiService().sendRequestUPDATE_ACTIVITY(

      this.mObj, null, null, null, null, null, null, null, null, null, null, time
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  dropdownChange(event) {
    if (event) {
      this.mService.showSnackBar(event)
    }
  }

  onQuillDescriptionChange(event) {
    this.showQuill = false;

    if (event) {
      this.mObj.description = event;

      this.mService.getApiService().sendRequestUPDATE_ACTIVITY(



        this.mObj,
        null, null, null, null, null, this.mObj.description
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message)

        }
      })

    }
  }

  onInputTaskNameChange(event) {
    if (event) {
      this.mObj.taskName = event.target.value;

      this.mService.getApiService().sendRequestUPDATE_ACTIVITY(



        this.mObj,
        null, null, null, null, null, null, null, null, this.mObj.taskName
      ).then(data => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message)

        }
      })

    }
  }

  onNoteAssociateChange(event) {
    if (event) {
      this.mService.showSnackBar(event)
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

    let listID = [this.mObj.id];

    this.mService.getApiService().sendRequestUPDATE_TASK(


      JSON.stringify(listID),
      checked ? checked : null
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.mObj.status = checked;
      }
    })
  }

}
