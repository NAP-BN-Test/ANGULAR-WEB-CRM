import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-email-list-sub-report',
  templateUrl: './email-list-sub-report.component.html',
  styleUrls: ['./email-list-sub-report.component.scss']
})
export class EmailListSubReportComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.MAIL_LIST,
    listColum: [
      { name: 'Tên chiến dịch', cell: 'campainName' },
      { name: 'Tên mail list', cell: 'mailListName' },
      { name: 'Ngày gửi', cell: 'createTime' },
      { name: 'Người gửi', cell: 'senderName' },
      { name: 'Trạng thái', cell: 'status' },
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
  email: any;

  mailListID = -1;

  menuSelected = 1;

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
    public router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.email;
    });

    if (this.mService.getUser()) {
      this.menuSelected = this.cookieService.get('contact-menu') ? Number(this.cookieService.get('contact-menu')) : 1;

      this.mailListID = this.cookieService.get('mail-list-id') ? Number(this.cookieService.get('mail-list-id')) : -1;

      this.onLoadData(1, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
    }
    else {
      this.router.navigate(['login']);
    }

  }

  onLoadData(page: number, contactType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {
    this.mService.getApiService().sendRequestREPORT_MAIL_DETAIL(
      this.mService.getUser().id,
      page,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind,
      this.cookieService.get('mail-list-detail') ? this.cookieService.get('mail-list-detail') : ""
    ).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.collectionSize = data.count;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: this.page,
          collectionSize: this.collectionSize,
          listData: data.array,
          listTbData: this.listTbData
        });
        this.router.navigate([], {
          queryParams: { page: this.page }
        })
      }
    })
  }

  onClickPagination(event) {
    this.onLoadData(event, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;

    this.onLoadData(1, this.menuSelected, this.cookieService.get('search-key-call'), event.timeFrom, event.timeTo, event.userID);
  }

}
