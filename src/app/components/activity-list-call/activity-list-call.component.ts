import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, CLICK_DETAIL, BUTTON_TYPE, SORT_TYPE, EVENT_PUSH } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';


@Component({
  selector: 'app-activity-list-call',
  templateUrl: './activity-list-call.component.html',
  styleUrls: ['./activity-list-call.component.scss']
})
export class ActivityListCallComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.ACTIVITY,
    listColum: [
      { name: 'Gọi đến', cell: 'contactName' },
      { name: 'Công ty', cell: 'companyName' },
      { name: 'Mô tả', cell: 'description' },
      { name: 'Trạng thái', cell: 'state' },
      { name: 'Người tạo', cell: 'createName' },
      { name: 'Ngày tạo', cell: 'timeCreate' },
      { name: 'Hết hạn', cell: 'timeRemind' },
      { name: 'Bình luận', cell: 'comment' },
    ],
    listButton: [
      { id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'warn' }
    ]
  };

  //data for component fillter bar
  toppingList = [
    { id: SORT_TYPE.USER, name: 'User' },
    { id: SORT_TYPE.TIME_TYPE, name: 'Loại tg' },
    { id: SORT_TYPE.TIME_START, name: 'Tg bắt đầu' },
    { id: SORT_TYPE.TIME_END, name: 'Tg kết thúc' },
    { id: SORT_TYPE.SEARCH, name: 'Tìm kiếm' }
  ]

  mTitle: any;
  paramsObj: any;

  menuSelected = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  numberAll = 0;

  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;
  collectionSize: number;

  timeFrom = null;
  timeTo = null;
  userIDFind = null;
  timeType = 1;

  page = 1;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.contact;
    });
    if (this.mService.getUser()) {
      this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
    }
    else {
      this.router.navigate(['login']);
    }
  }

  onLoadData(page: number, menuType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number, timeType: number) {
    this.mService.getApiService().sendRequestGET_LIST_CALL(
      this.mService.getUser().username,
      this.mService.getUser().id,
      page,
      menuType,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind,
      timeType
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.numberAll = data.all;
        this.collectionSize = data.all;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: this.page,
          collectionSize: this.collectionSize,
          listData: data.array,
          listTbData: this.listTbData
        });

        let listParams = [ { key: 'page', value: this.page }];
        this.paramsObj = this.mService.handleParamsRoute(listParams);
        
      }
    })
  }

  onClickMenu(index: number) {
    this.page = 1;

    this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
  }

  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
  }

  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestDELETE_CALL(
            this.mService.getUser().username,
            this.mService.getUser().id,
            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);

            }
          })
        }
      });
    }
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.CONTACT) {
        this.router.navigate(['contact-detail'], { state: { params: event.data } });
      }
      else if (event.clickDetail == CLICK_DETAIL.COMPANY) {
        this.router.navigate(['company-detail'], { state: { params: event.data } });
      }
    }
  }

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;
    this.timeType = event.timeType;

    this.onLoadData(1, 1, "", event.timeFrom, event.timeTo, event.userID, event.timeType);
  }

}
