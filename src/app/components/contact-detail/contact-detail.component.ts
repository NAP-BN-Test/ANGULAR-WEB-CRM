import { Component, OnInit, ViewChild } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { STATUS, LOCAL_STORAGE_KEY, ACTIVITY_TYPE, EVENT_PUSH } from 'src/app/services/constant/app-constant';
import { ContactDetailOtherComponent } from '../contact-detail-other/contact-detail-other.component';
import { ContactDetailActivityComponent } from '../contact-detail-activity/contact-detail-activity.component';
import { MatDialog } from '@angular/material';
import { AddNoteComponent } from 'src/app/dialogs/add-note/add-note.component';
import { AddCallComponent } from 'src/app/dialogs/add-call/add-call.component';
import { AddEmailComponent } from 'src/app/dialogs/add-email/add-email.component';
import { AddMeetComponent } from 'src/app/dialogs/add-meet/add-meet.component';
import { AddTaskComponent } from 'src/app/dialogs/add-task/add-task.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  @ViewChild(ContactDetailActivityComponent) contactDetailActivityComponent: ContactDetailActivityComponent;
  @ViewChild(ContactDetailOtherComponent) ContactDetailOtherComponent: ContactDetailOtherComponent;

  mTitle: any;

  oneActivity: any;

  createTabIndex = 0;

  addSubDetail = 0;

  mID = -1;
  mName = "";

  listContact = [];
  listUser = [];
  listDealStage = [];

  colDetail = "col-md-6";
  colSubDetail = "col-md-3";
  iconSubDetail = "arrow_forward";
  iconSubDetailState = true;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadAppConfig();

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);


    if (this.mService.getUser()) {

      let params: any = this.mService.handleActivatedRoute();

      this.mID = params.contactID;

      this.mService.getApiService().sendRequestGET_LIST_CONTACT(this.mID).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listContact = data.array;
        }
      });

      this.mService.getApiService().sendRequestGET_LIST_USER().then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listUser = data.array;
        }
      });

      this.mService.getApiService().sendRequestGET_DEAL_STAGE().then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.listDealStage = data.array;
        }
      })
    }
    else {
      this.mService.publishPageRoute('login');
    }
  }

  onClickCreateAction(event) {
    if (event == ACTIVITY_TYPE.NOTE) {
      const dialogRef = this.dialog.open(AddNoteComponent, {
        width: '700px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestCREATE_NOTE(
            null,
            this.mID + "",
            res.description,
            [],
            null
          ).then(data => {
            this.mService.showSnackBar(data.message)
            if (data.status == STATUS.SUCCESS)
              this.mService.publishEvent(EVENT_PUSH.ACTIVITY, null)
          })
        }
      });
    } else if (event == ACTIVITY_TYPE.CALL) {
      const dialogRef = this.dialog.open(AddCallComponent, {
        width: '700px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestCREATE_CALL(
            null,
            this.mID,
            res.outcomeType,
            res.timeStart,
            null,
            res.description,
            []
          ).then(data => {
            this.mService.showSnackBar(data.message)
            if (data.status == STATUS.SUCCESS)
              this.mService.publishEvent(EVENT_PUSH.ACTIVITY, null)
          })
        }
      });
    } else if (event == ACTIVITY_TYPE.EMAIL) {
      const dialogRef = this.dialog.open(AddEmailComponent, {
        width: '700px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestCREATE_EMAIL(
            null,
            this.mID,
            res.outcomeType,
            res.timeStart,
            null,
            res.description,
            []
          ).then(data => {
            this.mService.showSnackBar(data.message)
            if (data.status == STATUS.SUCCESS)
              this.mService.publishEvent(EVENT_PUSH.ACTIVITY, null)
          })
        }
      });
    } else if (event == ACTIVITY_TYPE.MEET) {
      const dialogRef = this.dialog.open(AddMeetComponent, {
        width: '700px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestCREATE_MEET(
            null,
            this.mID + "",
            res.userIDs,
            res.duration,
            res.timeStart,
            null,
            res.description,
            []
          ).then(data => {
            this.mService.showSnackBar(data.message)
            if (data.status == STATUS.SUCCESS)
              this.mService.publishEvent(EVENT_PUSH.ACTIVITY, null)
          })
        }
      });
    } else if (event == ACTIVITY_TYPE.TASK) {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '700px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestCREATE_TASK(
            null,
            this.mID + "",
            res.assignID,
            res.taskType,
            res.name,
            res.timeAssign,
            res.timeAssign,
            null,
            res.description,
            []
          ).then(data => {
            this.mService.showSnackBar(data.message)
            if (data.status == STATUS.SUCCESS)
              this.mService.publishEvent(EVENT_PUSH.ACTIVITY, null)
          })
        }
      });
    }
  }

  onClickCloseCreateAction(event) {
    this.createTabIndex = 0;
    if (event) {
      this.contactDetailActivityComponent.listActivity.unshift(event)
    }
  }

  onClickAddSubDetail(event) {
    this.addSubDetail = event;
  }

  onClickCloseSubDetail(event, type) {
    if (event) {
      if (type == 3) {
        event.stageID = Number(event.stageID);
        this.ContactDetailOtherComponent.listDeal.unshift(event)
      }
    }

    this.addSubDetail = 0;
  }

  onClickShowSubDetail() {
    if (this.iconSubDetailState) {
      this.iconSubDetail = "arrow_back";
      this.colDetail = "col-md-8 slide-animation";
      this.colSubDetail = "col-md-1 slide-animation";

      this.iconSubDetailState = false;
    }
    else {
      this.iconSubDetail = "arrow_forward";
      this.colDetail = "col-md-6 slide-animation";
      this.colSubDetail = "col-md-3 slide-animation fade-in";

      this.iconSubDetailState = true;
    }
  }

}
