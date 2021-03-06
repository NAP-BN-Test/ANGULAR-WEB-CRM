import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, CLICK_DETAIL, BUTTON_TYPE, SORT_TYPE, EVENT_PUSH, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogAssignCompanyComponent } from '../../dialogs/dialog-assign-company/dialog-assign-company.component';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-company-logistic',
  templateUrl: './list-company-logistic.component.html',
  styleUrls: ['./list-company-logistic.component.scss']
})
export class ListCompanyLogisticComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.COMPANY,
    listColum: [
      { name: 'Tên', cell: 'name' },
      { name: 'Phân công', cell: 'assignName' },
      { name: 'Bước', cell: 'stageName' },
      { name: 'Địa chỉ', cell: 'address' },
      { name: 'Tỉnh/TP', cell: 'city' },
      { name: 'HĐ gần đây', cell: 'lastActivity' },
      { name: 'Ngày tạo', cell: 'timeCreate' },
      { name: 'Đăng ký', cell: 'companyType' },
    ],
    listButton: [
      { id: BUTTON_TYPE.ASSIGN, name: 'Giao việc', color: 'primary' },
      { id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'warn' }
    ]
  };

  //data for component fillter bar
  toppingList = [
    { id: SORT_TYPE.USER, name: 'User' },
    { id: SORT_TYPE.STEP, name: 'Bước' },
    { id: SORT_TYPE.CITY, name: 'Tỉnh/TP' },
    { id: SORT_TYPE.TIME_START, name: 'Tg bắt đầu' },
    { id: SORT_TYPE.TIME_END, name: 'Tg kết thúc' },
    { id: SORT_TYPE.SEARCH, name: 'Tìm kiếm' }
  ]

  mTitle: any;
  paramsObj: any;

  menuSelected = 1;

  numberAll = 0;
  numberUnAssign = 0;
  numberAssignAll = 0;
  numberAssign = 0;
  numberFollow = 0;
  numberCustomer = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  addSub = 0

  page: number = 1;

  searchKey = "";
  timeFrom = null;
  timeTo = null;
  userIDFind = null;
  stageID = null;
  cityID = null;

  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;
  collectionSize: number;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit() {

    this.mService.LoadAppConfig();

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    if (this.mService.getUser()) {

      let params: any = this.mService.handleActivatedRoute();

      this.page = params.page;
      this.menuSelected = params.menu;
      if (params.stepID) this.stageID = params.stepID;
      if (params.cityID) this.cityID = params.cityID;
      if (params.timeFrom) this.timeFrom = params.timeFrom;
      if (params.timeTo) this.timeTo = params.timeTo;
      if (params.userIDFind) this.userIDFind = params.userIDFind;
      if (params.searchKey) this.searchKey = params.searchKey;

      this.onLoadData(this.page, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
    }
    else {
      this.mService.publishPageRoute('login');
    }
  }


  onLoadData(page: number, companyType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number, stepID: number, cityID: number) {
    this.mService.getApiService().sendRequestGET_LIST_COMPANY(


      page,
      companyType,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind,
      stepID,
      cityID,
      true
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.numberAll = data.all;
        this.numberUnAssign = data.unassign;
        this.numberAssignAll = data.assignAll;
        this.numberAssign = data.assign;
        this.numberFollow = data.follow;
        this.numberCustomer = data.customer;

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
        } else if (this.menuSelected == 6) {
          this.collectionSize = data.customer;
        }

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: this.page,
          collectionSize: this.collectionSize,
          listData: data.array,
          listTbData: this.listTbData
        });

        let listParams = [];
        if (this.stageID != "") listParams.push({ key: 'stepID', value: this.stageID });
        if (this.cityID != "") listParams.push({ key: 'cityID', value: this.cityID });
        if (this.timeFrom != "") listParams.push({ key: 'timeFrom', value: this.timeFrom });
        if (this.timeTo != "") listParams.push({ key: 'timeTo', value: this.timeTo });
        if (this.userIDFind != "") listParams.push({ key: 'userIDFind', value: this.userIDFind });
        if (this.searchKey != "") listParams.push({ key: 'searchKey', value: this.searchKey });

        listParams.push({ key: 'menu', value: this.menuSelected });
        listParams.push({ key: 'page', value: this.page });

        this.paramsObj = this.mService.handleParamsRoute(listParams);
      }
    });
  }

  onClickMenu(index: number) {
    this.page = 1;
    this.menuSelected = index;
    this.cookieService.set('company-menu', index + "");

    this.onLoadData(1, index, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
  }

  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
  }

  onClickBtn(event: any) {
    if (event.btnType == BUTTON_TYPE.ASSIGN) {
      const dialogRef = this.dialog.open(DialogAssignCompanyComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestASSIGN_COMPANY_OWNER(


            res,
            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.mService.publishEvent(EVENT_PUSH.SELECTION, true);
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
          this.mService.getApiService().sendRequestDELETE_COMPANY(


            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(event, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
            }
          })
        }
      });
    }
  }

  onClickAdd() {
    this.addSub = 1;
  }

  onClickCloseAdd(event) {
    if (event) {
      this.onLoadData(event, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
    }
    this.addSub = 0
  }

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;
    this.stageID = event.stepID;
    this.cityID = event.cityID;
    this.searchKey = event.searchKey;

    this.onLoadData(1, this.menuSelected, this.searchKey, event.timeFrom, event.timeTo, event.userID, event.stepID, event.cityID);
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

}
