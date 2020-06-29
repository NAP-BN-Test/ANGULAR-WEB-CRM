import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { EmailCampainAddComponent } from 'src/app/dialogs/email-campain-add/email-campain-add.component';

@Component({
  selector: 'app-email-campain',
  templateUrl: './email-campain.component.html',
  styleUrls: ['./email-campain.component.scss']
})
export class EmailCampainComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.MAIL_LIST,
    listColum: [
      { name: 'Tên chiến dịch', cell: 'name' },
      { name: 'Tiêu đề', cell: 'subject' },
      { name: 'Người tạo', cell: 'owner' },
      { name: 'Ngày tạo', cell: 'createTime' },
      { name: 'Lần gửi gần nhất', cell: 'nearestSend' },
    ],
    listButton: [
      { id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'warn' }
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

  checked = false;
  indeterminate = false;
  disabled = false;

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
      this.page = params.page;

      this.onLoadData(this.page, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
    }
    else {
      this.mService.publishPageRoute('login');
    }

  }

  onLoadData(page: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {
    this.mService.getApiService().sendRequestGET_LIST_MAIL_CAMPAIN(
      this.mService.getUser().username,
      this.mService.getUser().id,
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

        let listParams = [{ key: 'page', value: this.page }];
        this.paramsObj = this.mService.handleParamsRoute(listParams);

      }
    })
  }

  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.MAIL_LIST) {
        this.mService.publishPageRoute('email-campain-detail', { campainID: event.data.id })
      }
    }
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(EmailCampainAddComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          name: res.name,
          mailListID: res.mailListID,
          subject: res.subject,
        }
        this.mService.getApiService().sendRequestADD_MAIL_CAMPAIN(
          this.mService.getUser().id,
          obj
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData(1, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
            setTimeout(() => {
              this.mService.publishPageRoute('email-campain-detail', { campainID: data.id })              
            }, 500);
          }
        })
      }

    });
  }


  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestDELETE_MAIL_CAMPAIN(event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(1, this.searchKey, event.timeFrom, event.timeTo, event.userID);
            }
          })
        }
      });
    }
  }

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;

    this.onLoadData(1, this.searchKey, event.timeFrom, event.timeTo, event.userID);
  }

}
