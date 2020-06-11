import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE } from 'src/app/services/constant/app-constant';
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

  listContact = [];
  
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

  mData: any;

  menuSelected = 1;

  numberAll = 0;
  numberUnAssign = 0;
  numberAssignAll = 0;
  numberAssign = 0;
  numberFollow = 0;

  // checked = false;
  // indeterminate = false;
  // disabled = false;

  showToast = false;

  toasMessage = "";

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
    public router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.contact;
    });

    if (this.mService.getUser()) {
      this.menuSelected = this.cookieService.get('contact-menu') ? Number(this.cookieService.get('contact-menu')) : 1;

      this.activatedRoute.queryParams.subscribe(params => {
        this.page = params.page;
        this.onLoadData(this.page, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
      });

    }
    else {
      this.router.navigate(['login']);
    }

  }

  onLoadData(page: number, contactType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number) {
    this.mService.getApiService().sendRequestGET_LIST_CONTACT_FULL(
      this.mService.getUser().username,
      this.mService.getUser().id,
      page,
      contactType,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.listContact = data.array;

        setTimeout(() => {
          this.mService.publishEvent(EVENT_PUSH.TABLE, this.listContact);
        }, 200);
        this.router.navigate([], {
          queryParams: { page: this.page }
        })

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
      }
    })
  }

  pow = 0;
  onSort() {
    this.pow += 1;

    this.listContact = this.listContact.sort((a, b) => {
      if (a.name > b.name) return Math.pow(-1, this.pow);
      if (a.name < b.name) return Math.pow(-1, this.pow + 1);
      return 0;
    })
  }

  onClickMenu(index: number) {
    this.page = 1;
    this.menuSelected = index;
    this.cookieService.set('contact-menu', index + "");

    this.onLoadData(1, index, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  // onCheckBoxChange(event) {
  //   let checked = event.checked;
  //   if (checked) this.numberOfItemSelected += 1;
  //   else this.numberOfItemSelected -= 1;

  //   if (this.numberOfItemSelected == 0) {
  //     this.indeterminate = false;
  //     this.checked = false;
  //   } else if (this.numberOfItemSelected < 12 && this.numberOfItemSelected > 0) {
  //     this.indeterminate = true;
  //     this.checked = false;
  //   } else if (this.numberOfItemSelected >= 12) {
  //     this.indeterminate = false;
  //     this.checked = true;
  //   }
  // }

  // onCheckAllChange() {
  //   this.numberOfItemSelected = 0;

  //   if (this.checked) {
  //     this.listContact.forEach(item => {
  //       item.checked = false;
  //     })
  //   }
  //   else {
  //     this.listContact.forEach(it => {
  //       let obj = this.listContact.find(it1 => {
  //         return it1.id == it.id;
  //       });
  //       obj.checked = true;
  //       this.numberOfItemSelected += 1;
  //     })
  //   }
  // }

  onClickPagination(event) {
    this.page = event;
    this.onLoadData(event, this.menuSelected, this.searchKey, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onSearchChange(event) {
    this.onLoadData(1, this.menuSelected, event, this.timeFrom, this.timeTo, this.userIDFind);
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
            this.mService.getUser().username,
            this.mService.getUser().id,
            res,
            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onShowToast(data.message);
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
          this.mService.getApiService().sendRequestDELETE_CONTACT(
            this.mService.getUser().username,
            this.mService.getUser().id,
            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onShowToast(data.message);

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
          this.mService.getApiService().sendRequestADD_MAIL_LIST_DETAIL(this.mService.getUser().id, res, event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {

              this.mService.publishEvent(EVENT_PUSH.SELECTION, true);
              this.onShowToast(data.message);
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

  onShowToast(message) {
    this.toasMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }

}
