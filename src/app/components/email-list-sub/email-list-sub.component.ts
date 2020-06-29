import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { UploadFileModule } from 'src/app/services/core/upload-image/upload-file';
import { EmailListSubAddComponent } from 'src/app/dialogs/email-list-sub-add/email-list-sub-add.component';

import * as moment from 'moment';


@Component({
  selector: 'app-email-list-sub',
  templateUrl: './email-list-sub.component.html',
  styleUrls: ['./email-list-sub.component.scss']
})
export class EmailListSubComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.MAIL_LIST,
    listColum: [
      { name: 'Người LH', cell: 'contactName' },
      { name: 'Email', cell: 'email' },
      { name: 'Người tạo', cell: 'owner' },
      { name: 'Ngày tạo', cell: 'createTime' },
      { name: 'Số mail đã gửi', cell: 'mailCount' },
    ],
    listButton: [
      { id: BUTTON_TYPE.DELETE, name: 'Xóa khỏi danh sách', color: 'warn' }
    ]
  };

  //data for component fillter bar
  toppingList = [
    { id: SORT_TYPE.USER, name: 'User' },
    { id: SORT_TYPE.TIME_START, name: 'Tg bắt đầu' },
    { id: SORT_TYPE.TIME_END, name: 'Tg kết thúc' },
    { id: SORT_TYPE.SEARCH, name: 'Tìm kiếm' }
  ]

  mTitle: any;
  paramsObj: any;

  mailListID = -1;


  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  addSub = 0

  page = 1;
  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;
  collectionSize: number;

  searchKey = "";
  timeFrom = null;
  timeTo = null;
  userIDFind = null;


  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.email;
    });

    if (this.mService.getUser()) {

      let params: any = this.mService.handleActivatedRoute();
      this.mailListID = params.mailListID;
      this.page = params.page;

      this.onLoadData(this.page, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
    }
    else {
      this.mService.publishPageRoute('login');
    }

  }

  onLoadData(page: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {

    this.mService.getApiService().sendRequestGET_MAIL_LIST_DETAIL(
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.mailListID,
      page,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind
    ).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.collectionSize = data.count;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: this.page,
          collectionSize: this.collectionSize,
          listData: data.array,
          listTbData: this.listTbData
        });

        let listParams = [
          { key: 'mailListID', value: this.mailListID },
          { key: 'page', value: this.page },
        ];
        this.paramsObj = this.mService.handleParamsRoute(listParams);
      }
    })
  }

  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }
  onClickSettingItemPerPage(event) {
    this.itemPerPage = event;
    this.onLoadData(1, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onSearchChange(event) {
    this.onLoadData(1, event, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(EmailListSubAddComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        let listMail = [{
          name: res.name,
          email: res.email
        }]

        this.mService.getApiService().sendRequestADD_MAIL_LIST_DETAIL(
          this.mService.getUser().id,
          this.mailListID,
          JSON.stringify(listMail)
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData(1, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
          }
        })
      }
      
    });
  }

  onClickImport() {
    UploadFileModule.getInstance().__openFileInBrowser(res => {
      if (res) {
        this.mService.getApiService().sendRequestADD_MAIL_LIST_DETAIL(
          this.mService.getUser().id,
          this.mailListID,
          JSON.stringify(res)
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData(1, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
          }
        })
      }
    })
  }

  onClickCloseAdd(event) {
    if (event) {
      this.onLoadData(1, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
    }
    this.addSub = 0
  }

  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestDELETE_MAIL_LIST_DETAIL(event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
            }
          })
        }
      });
    }
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.MAIL_LIST) {
        this.mService.publishPageRoute('email-list-sub-report', { mailListID: this.mailListID, email: event.data.email, page: 1 });
      }
    }
  }

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;

    this.onLoadData(1, this.searchKey, event.timeFrom, event.timeTo, event.userID);
  }

}
