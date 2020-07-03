import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';

import * as moment from 'moment';

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
  paramsObj: any;

  email = "";
  mailListID = -1;

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
      this.mailListID = params.mailListID;
      this.email = params.email;

      this.onLoadData(this.page, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);

    }
    else {
      this.mService.publishPageRoute('login');
    }

  }

  onLoadData(page: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {
    this.mService.getApiService().sendRequestREPORT_MAIL_DETAIL(
      
      page,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind,
      this.email
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
          { key: 'email', value: this.email },
          { key: 'page', value: this.page }
        ];
        this.paramsObj = this.mService.handleParamsRoute(listParams);
      }
    })
  }

  onClickPagination(event) {
    this.onLoadData(event, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;

    this.onLoadData(1, this.searchKey, event.timeFrom, event.timeTo, event.userID);
  }

}
