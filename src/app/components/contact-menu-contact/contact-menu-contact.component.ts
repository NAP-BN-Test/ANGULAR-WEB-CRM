import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogAssignCompanyComponent } from '../../dialogs/dialog-assign-company/dialog-assign-company.component';
import { DialogAddMailListComponent } from '../../dialogs/dialog-add-mail-list/dialog-add-mail-list.component';

@Component({
  selector: 'app-contact-menu-contact',
  templateUrl: './contact-menu-contact.component.html',
  styleUrls: ['./contact-menu-contact.component.scss']
})
export class ContactMenuContactComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.CONTACT,
    listColum: [
      { name: 'Tên', cell: 'name' },
      { name: 'Email', cell: 'email' },
      { name: 'Số ĐT', cell: 'phone' },
      { name: 'Cty Liên kết', cell: 'companyName' },
      { name: 'Người tạo', cell: 'assignName' },
      { name: 'Ngày tạo', cell: 'timeCreate' }
    ],
    listButton: [
      { id: BUTTON_TYPE.ADD_LIST_MAIL, name: 'Thêm vào ds mail', color: 'primary' },
      { id: BUTTON_TYPE.ASSIGN, name: 'Giao việc', color: 'primary' },
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

  numberAll = 0;
  numberUnAssign = 0;
  numberAssignAll = 0;
  numberAssign = 0;
  numberFollow = 0;

  // checked = false;
  // indeterminate = false;
  // disabled = false;

  paramsObj: any;



  numberOfItemSelected = 0;

  addSub = 0

  page = 1;
  collectionSize: number;

  timeFrom = null;
  timeTo = null;
  userIDFind = null;
  searchKey = null;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.mService.LoadAppConfig();

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    if (this.mService.getUser()) {

      let params: any = this.mService.handleActivatedRoute();

      this.page = params.page;
      this.menuSelected = params.menu;
      if (params.timeFrom) this.timeFrom = params.timeFrom;
      if (params.timeTo) this.timeTo = params.timeTo;
      if (params.userIDFind) this.userIDFind = params.userIDFind;
      if (params.searchKey) this.searchKey = params.searchKey;

      this.onLoadData(this.page, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
    }
    else {
      this.mService.publishPageRoute('login');
    }

  }

  onLoadData(page: number, contactType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {
    this.mService.getApiService().sendRequestGET_LIST_CONTACT_FULL(


      page,
      contactType,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.numberAll = data.all;
        this.numberUnAssign = data.unassign;
        this.numberAssignAll = data.assignAll;
        this.numberAssign = data.assign;
        this.numberFollow = data.follow;

        if (this.menuSelected == 1) {
          this.collectionSize = data.all;
        } else if (this.menuSelected == 2) {
          this.collectionSize = data.unassign;
        } else if (this.menuSelected == 3) {
          this.collectionSize = data.follow;
        } else if (this.menuSelected == 4) {
          this.collectionSize = data.assign;
        } else if (this.menuSelected == 5) {
          this.collectionSize = data.assignAll;
        }

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: this.page,
          collectionSize: this.collectionSize,
          listData: data.array,
          listTbData: this.listTbData
        });

        let listParams = [];
        if (this.timeFrom != "") listParams.push({ key: 'timeFrom', value: this.timeFrom });
        if (this.timeTo != "") listParams.push({ key: 'timeTo', value: this.timeTo });
        if (this.userIDFind != "") listParams.push({ key: 'userIDFind', value: this.userIDFind });
        if (this.searchKey != "") listParams.push({ key: 'searchKey', value: this.searchKey });

        listParams.push({ key: 'menu', value: this.menuSelected });
        listParams.push({ key: 'page', value: this.page });

        this.paramsObj = this.mService.handleParamsRoute(listParams);

      }
    })
  }

  onClickMenu(index: number) {
    this.page = 1;
    this.menuSelected = index;
    this.cookieService.set('contact-menu', index + "");

    this.onLoadData(1, index, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickPagination(event) {
    this.page = event;
    this.onLoadData(event, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.CONTACT) {
        this.mService.publishPageRoute('contact-detail', { contactID: event.data.id });
      }
      else if (event.clickDetail == CLICK_DETAIL.COMPANY) {
        this.mService.publishPageRoute('company-detail', { companyID: event.data.id });
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

  onClickBtn(event: any) {
    if (event.btnType == BUTTON_TYPE.ASSIGN) {
      const dialogRef = this.dialog.open(DialogAssignCompanyComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestASSIGN_CONTACT_OWNER(


            res,
            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {

              this.mService.publishEvent(EVENT_PUSH.SELECTION, true);
              this.mService.showSnackBar(data.message);
            }
          })
        }
      });
    } else if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestDELETE_CONTACT(


            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.mService.showSnackBar(data.message);

              this.onLoadData(this.page, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
            }
          })
        }
      });
    } else if (event.btnType == BUTTON_TYPE.ADD_LIST_MAIL) {
      const dialogRef = this.dialog.open(DialogAddMailListComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestADD_MAIL_LIST_DETAIL(res, event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {

              this.mService.publishEvent(EVENT_PUSH.SELECTION, true);
              this.mService.showSnackBar(data.message);
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
    this.searchKey = event.searchKey;

    this.onLoadData(1, this.menuSelected, event.searchKey, event.timeFrom, event.timeTo, event.userID);
  }

}
