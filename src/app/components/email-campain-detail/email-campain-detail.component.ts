import { Component, OnInit } from '@angular/core';
import { STATUS, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { Location } from '@angular/common';

import * as moment from 'moment';
import { DialogVerifyEmailComponent } from '../../dialogs/dialog-verify-email/dialog-verify-email.component';
import { UploadFileModule } from 'src/app/services/core/upload-image/upload-file';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { ConfirmSendEmailComponent } from 'src/app/dialogs/confirm-send-email/confirm-send-email.component';


@Component({
  selector: 'app-email-campain-detail',
  templateUrl: './email-campain-detail.component.html',
  styleUrls: ['./email-campain-detail.component.scss']
})
export class EmailCampainDetailComponent implements OnInit {
  mTitle: any;
  mObj: any;

  campainID = -1;

  quillFile: any;
  meQuillRef: any;

  listMailList = [];

  disableBtnSendMail = false;

  timeStart: any;
  timeEnd: any;

  btnVerify = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '500px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'http://163.44.192.123:3302/crm/upload_file',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: []
  };

  htmlContent: any

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private location: Location,
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.add_sub_detail;
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.campainID = Number(params.campainID);

      this.handleSendMailBtn();
    });

    this.mService.getApiService().sendRequestGET_MAIL_CAMPAIN_DETAIL(this.campainID).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.mObj = data.obj;
        this.timeStart = this.toNgbDatetime(this.mObj.createTime);
        this.timeEnd = this.toNgbDatetime(this.mObj.endTime);
      }
    })

    this.mService.getApiService().sendRequestGET_MAIL_LIST_OPTION().then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listMailList = data.array;
    })

    this.checkEmailVerify(this.mService.getUser().email);

    UploadFileModule.getInstance().setHttp(this.http);
  }

  handleSendMailBtn() {
    let now = new Date().getTime();
    let timeSendBefore = localStorage.getItem(LOCAL_STORAGE_KEY.SEND_EMAIL + this.campainID) ? Number(localStorage.getItem(LOCAL_STORAGE_KEY.SEND_EMAIL + this.campainID)) : new Date().getTime() - 1800000;

    let timeSpan = now - timeSendBefore;

    // this.disableBtnSendMail = timeSpan >= 1800000;
    this.disableBtnSendMail = timeSpan >= 5000;
    
    if (!this.disableBtnSendMail)
      setTimeout(() => {
        let timeRemain = document.getElementById('timeRemain');

        let timeSpanSecond = 1800 - Math.floor(timeSpan / 1000);

        let intervalTimeRemain = setInterval(() => {
          timeSpanSecond = timeSpanSecond -= 1;

          let minute = Math.floor(timeSpanSecond / 60) > 9 ? Math.floor(timeSpanSecond / 60) : "0" + Math.floor(timeSpanSecond / 60);
          let second = timeSpanSecond % 60 > 9 ? timeSpanSecond % 60 : "0" + timeSpanSecond % 60

          timeRemain.textContent = minute + ":" + second;
          if (timeSpanSecond <= 0) clearInterval(intervalTimeRemain)
        }, 1000)
      }, 1000);

  }

  onClickSave() {
    let obj = {
      id: this.mObj.id,
      name: this.mObj.name,
      subject: this.mObj.subject,
      startTime: moment(this.timeStart.year + "-" + this.timeStart.month + "-" + this.timeStart.day).format("YYYY-MM-DD"),
      endTime: moment(this.timeEnd.year + "-" + this.timeEnd.month + "-" + this.timeEnd.day).format("YYYY-MM-DD"),
      body: this.mObj.body,
      mailListID: this.mObj.mailListID
    };

    this.mService.getApiService().sendRequestUPDATE_MAIL_CAMPAIN(obj).then(data => {

      if (data.status == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  onClickSend() {

    const dialogRef = this.dialog.open(ConfirmSendEmailComponent, { data: { campainName: this.mObj.name, mailListName: this.mObj.mailListName } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          id: this.mObj.id,
          subject: this.mObj.subject,
          body: this.mObj.body,
          mailListID: this.mObj.mailListID,
          myMail: this.mService.getUser().email
        };

        this.mService.getApiService().sendRequestADD_MAIL_SEND(obj).then(data => {
          if (data.status == STATUS.SUCCESS) {

            localStorage.setItem(LOCAL_STORAGE_KEY.SEND_EMAIL + this.campainID, new Date().getTime() + "");
            this.handleSendMailBtn();

            this.mService.showSnackBar(data.message)

          }
        })
      }
    });

  }

  onClickSendTest() {
    let obj = {
      id: this.mObj.id,
      subject: this.mObj.subject,
      body: this.mObj.body,
      mailListID: this.mObj.mailListID,
      myMail: this.mService.getUser().email
    };

    this.mService.getApiService().sendRequestADD_MAIL_SEND(obj, true).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.mService.showSnackBar(data.message)

      }
    })
  }

  onClickDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let listID = [this.mObj.id];
        this.mService.getApiService().sendRequestDELETE_MAIL_CAMPAIN(
          JSON.stringify(listID)
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.location.back();
          }
        })
      }
    });
  }

  checkEmailVerify(email: string) {
    this.mService.getApiService().sendRequestCHECK_VERIFY_EMAIL(email).then(data => {
      if (data.status == STATUS.SUCCESS)
        this.btnVerify = true;
      else
        this.btnVerify = false;
    })
  }


  toNgbDatetime(time: any) {
    let datetime = moment(time);
    return {
      "year": datetime.year(),
      "month": datetime.month() + 1,
      "day": datetime.date()
    }
  }

  onClickVerifyEmail() {
    const dialogRef = this.dialog.open(DialogVerifyEmailComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.mService.getApiService().sendRequestVERIFY_EMAIL(res).then(data => {
          if (data.status == STATUS.SUCCESS) {

            let user = this.mService.getUser();
            user.email = res;
            this.mService.setUser(user);

            this.mService.showSnackBar(data.message)

          }
        })
      }
    });
  }

}
