import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogAssignCompanyComponent } from '../../dialogs/dialog-assign-company/dialog-assign-company.component';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.MAIL_LIST,
    listColum: [
      { name: 'Tên Danh sách', cell: 'name' },
      { name: 'Người tạo', cell: 'owner' },
      { name: 'Ngày tạo', cell: 'createTime' },
      { name: 'Liên hệ', cell: 'contactCount' },
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

  menuSelected = 1;

  searchKey = null;

  numberAll = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  addSub = 0

  page = 1;
  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;
  collectionSize: number;

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

      this.onLoadData(1, this.menuSelected, this.cookieService.get('search-key-contact'), this.timeFrom, this.timeTo, this.userIDFind);
    }
    else {
      this.router.navigate(['login']);
    }

  }

  onLoadData(page: number, contactType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {
    this.mService.getApiService().sendRequestGET_MAIL_LIST(
      this.mService.getUser().username,
      this.mService.getUser().id,
      page,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind
    ).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.numberAll = data.count;
        if (this.menuSelected == 1) {
          this.collectionSize = data.count;
        }

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

  onClickMenu(index: number) {
    this.page = 1;
    this.menuSelected = index;
    this.cookieService.set('contact-menu', index + "");

    this.onLoadData(1, index, this.cookieService.get('search-key-contact'), this.timeFrom, this.timeTo, this.userIDFind);

  }

  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, this.menuSelected, this.cookieService.get('search-key-contact'), this.timeFrom, this.timeTo, this.userIDFind);
  }
  onClickSettingItemPerPage(event) {
    this.itemPerPage = event;
    this.onLoadData(1, this.menuSelected, this.cookieService.get('search-key-contact'), this.timeFrom, this.timeTo, this.userIDFind);
  }

  onSearchChange(event) {
    this.onLoadData(1, this.menuSelected, event, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.MAIL_LIST) {
        this.cookieService.set('mail-list-id', event.data.id);
        this.router.navigate(['email-list-sub'], { state: { params: event.data } });
      }
    }

  }

  onClickAdd() {
    this.addSub = 1;
  }

  onClickCloseAdd(event) {
    if (event) {
      this.onLoadData(this.page, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
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
          this.mService.getApiService().sendRequestDELETE_MAIL_LIST(event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
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

    this.onLoadData(1, this.menuSelected, this.cookieService.get('search-key-call'), event.timeFrom, event.timeTo, event.userID);
  }

}
