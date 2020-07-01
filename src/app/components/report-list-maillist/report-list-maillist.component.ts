import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-report-list-maillist',
  templateUrl: './report-list-maillist.component.html',
  styleUrls: ['./report-list-maillist.component.scss']
})
export class ReportListMaillistComponent implements OnInit {

  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.MAIL_LIST,
    listColum: [
      { name: 'Tên maillist', cell: 'name' },
      { name: 'Thời gian tạo', cell: 'createTime' },
      { name: 'Số lượng email', cell: 'totalEmail' },
    ],
    listButton: []
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
    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.mService.LoadAppConfig();

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    if (this.mService.getUser()) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.page = params.page;

        this.onLoadData(this.page, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
      });
    }
    else {
      this.router.navigate(['login']);
    }

  }

  onLoadData(page: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {
    this.mService.getApiService().sendRequestGET_LIST_REPORT_BY_MAILLIST(
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
        this.router.navigate(['report-list-maillist-detail'], { queryParams: { mailListID: event.data.id, tabIndex: 0, mailListName: event.data.name } });
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
