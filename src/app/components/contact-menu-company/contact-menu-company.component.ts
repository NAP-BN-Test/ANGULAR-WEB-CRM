import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, CLICK_DETAIL, BUTTON_TYPE, SORT_TYPE, EVENT_PUSH, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogAssignCompanyComponent } from '../../dialogs/dialog-assign-company/dialog-assign-company.component';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { UploadFileModule } from 'src/app/services/core/upload-image/upload-file';
import { DialogAddMailListComponent } from 'src/app/dialogs/dialog-add-mail-list/dialog-add-mail-list.component';

@Component({
  selector: 'app-contact-menu-company',
  templateUrl: './contact-menu-company.component.html',
  styleUrls: ['./contact-menu-company.component.scss']
})
export class ContactMenuCompanyComponent implements OnInit {
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
      { name: 'Agent/Company', cell: 'companyType' },
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

      this.activatedRoute.queryParams.subscribe(params => {
        this.page = params.page;
        this.menuSelected = params.menu;

        this.onLoadData(this.page, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
      });

    }
    else {
      this.router.navigate(['login']);
    }
  }


  onLoadData(page: number, companyType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number, stepID: number, cityID: number) {
    this.mService.getApiService().sendRequestGET_LIST_COMPANY(
      this.mService.getUser().username,
      this.mService.getUser().id,
      page,
      companyType,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind,
      stepID,
      cityID
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

        let listParams = [
          { key: 'page', value: this.page },
          { key: 'menu', value: this.menuSelected }
        ];
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
            this.mService.getUser().username,
            this.mService.getUser().id,
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
            this.mService.getUser().username,
            this.mService.getUser().id,
            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(event, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
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
          this.mService.getApiService().sendRequestADD_MAIL_LIST_DETAIL(this.mService.getUser().id, res, event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {

              this.mService.publishEvent(EVENT_PUSH.SELECTION, true);
              this.mService.showSnackBar(data.message);
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

  onClickImport() {
    UploadFileModule.getInstance().openFileImport(res => {
      this.mService.getApiService().sendRequestIMPORT_DATA(JSON.stringify(res)).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.onLoadData(1, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
        }
      })
    });
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
