import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { STATUS } from 'src/app/services/constant/app-constant';
import { AppModuleService } from 'src/app/services/app-module.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Location } from '@angular/common';

import * as moment from 'moment';
import { DialogVerifyEmailComponent } from '../dialog-verify-email/dialog-verify-email.component';
import { UploadFileModule } from 'src/app/services/core/upload-image/upload-file';
import { HttpClient } from '@angular/common/http';
import { UploadType } from 'src/app/services/core/upload-image/upload-type';


@Component({
  selector: 'app-email-campain-detail',
  templateUrl: './email-campain-detail.component.html',
  styleUrls: ['./email-campain-detail.component.scss']
})
export class EmailCampainDetailComponent implements OnInit {

  mData: any;
  mObj: any;

  campainID = -1;

  quillFile: any;
  meQuillRef: any;

  quillContent = "";

  listMailList = [];

  showToast = false;
  toasMessage = "";

  timeStart: any;
  timeEnd: any;

  btnVerify = false;

  editorModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video']                         // link and image, video
      ],
      handlers: {
        image: () => {
          this.quillFileSelected()
        }
      }
    },
  };

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private location: Location,
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.add_sub_detail;
    });

    this.campainID = this.cookieService.get('campain-id') ? Number(this.cookieService.get('campain-id')) : -1;

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

  quillFileSelected() {

    UploadFileModule.getInstance()._openFileInBrowser(res => {
      if (res) {
        UploadFileModule.getInstance()
          ._onUploadFileInBrowser(
            res.selectedFile,
            UploadType.LOGO,
            "true"
          )
          .then((data) => {
            this.mObj.body = this.mObj.body + `<img src="${data.url}">`;
            console.log(data);

          })
          .catch(err => {
            console.log(err);

          });
      }
    });
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
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  onClickSend() {
    let obj = {
      id: this.mObj.id,
      subject: this.mObj.subject,
      body: this.mObj.body,
      mailListID: this.mObj.mailListID,
      myMail: this.mService.getUser().email
    };

    this.mService.getApiService().sendRequestADD_MAIL_SEND(obj).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
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
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
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
      "year": datetime.years(),
      "month": datetime.months() + 1,
      "day": datetime.dates()
    }
  }

  onClickVerifyEmail() {
    const dialogRef = this.dialog.open(DialogVerifyEmailComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.mService.getApiService().sendRequestVERIFY_EMAIL(this.mService.getUser().id, res).then(data => {
          if (data.status == STATUS.SUCCESS) {

            let user = this.mService.getUser();
            user.email = res;
            this.mService.setUser(user);

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

}
