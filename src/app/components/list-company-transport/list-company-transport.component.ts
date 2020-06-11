import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogAssignCompanyComponent } from '../../dialogs/dialog-assign-company/dialog-assign-company.component';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-company-transport',
  templateUrl: './list-company-transport.component.html',
  styleUrls: ['./list-company-transport.component.scss']
})
export class ListCompanyTransportComponent implements OnInit {

  listData = [];

  mData: any;

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

  // searchKey = "";

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
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params.page;
    });
  }

  ngOnInit() {

    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.contact;
    });
    if (this.mService.getUser()) {
      this.menuSelected = this.cookieService.get('company-menu') ? Number(this.cookieService.get('company-menu')) : 1;

      this.onLoadData(this.page, this.menuSelected, this.cookieService.get('search-key'), this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);

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
      cityID,
      null,
      true
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listData = data.array;

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
      }
    });
  }

  pow = 0;
  onSort() {
    this.pow += 1;

    this.listData = this.listData.sort((a, b) => {
      if (a.name > b.name) return Math.pow(-1, this.pow);
      if (a.name < b.name) return Math.pow(-1, this.pow + 1);
      return 0;
    })
  }

  onClickMenu(index: number) {
    this.page = 1;
    this.menuSelected = index;
    this.cookieService.set('company-menu', index + "");

    this.router.navigate([], {
      queryParams: { page: 1 }
    })

    this.onLoadData(1, index, this.cookieService.get('search-key'), this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
  }

  onCheckBoxChange(item) {
    let checked = item.checked;

    if (checked) this.numberOfItemSelected += 1;
    else this.numberOfItemSelected -= 1;

    if (this.numberOfItemSelected == 0) {
      this.indeterminate = false;
      this.checked = false;
    } else if (this.numberOfItemSelected < 12 && this.numberOfItemSelected > 0) {
      this.indeterminate = true;
      this.checked = false;
    } else if (this.numberOfItemSelected >= 12) {
      this.indeterminate = false;
      this.checked = true;
    }
  }

  onCheckAllChange() {
    this.numberOfItemSelected = 0;

    if (this.checked) {
      this.listData.forEach(item => {
        item.checked = false;
      })
    }
    else {
      this.listData.forEach(it => {
        let obj = this.listData.find(it1 => {
          return it1.id == it.id;
        });
        obj.checked = true;
        this.numberOfItemSelected += 1;
      })
    }
  }

  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, this.menuSelected, this.cookieService.get('search-key'), this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);

    this.router.navigate([], {
      queryParams: { page: event }
    })
  }
  onClickSettingItemPerPage(event) {
    this.itemPerPage = event;
    this.onLoadData(1, this.menuSelected, this.cookieService.get('search-key'), this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
  }

  onClickItem(item) {
    this.router.navigate(['company-detail'], { state: { params: item } });
  }

  onSearchChange(event) {
    this.onLoadData(1, this.menuSelected, event, this.timeFrom, this.timeTo, this.userIDFind, this.stageID, this.cityID);
  }

  onClickAssign(index) {
    if (index == 0) {
      const dialogRef = this.dialog.open(DialogAssignCompanyComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          let listID = [];
          this.listData.forEach(item => {
            if (item.checked) listID.push(item.id)
          })
          this.mService.getApiService().sendRequestASSIGN_COMPANY_OWNER(


            this.mService.getUser().username,
            this.mService.getUser().id,
            res,
            JSON.stringify(listID)
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.listData.forEach(item => {
                if (item.checked) {
                  item.assignName = data.obj ? data.obj.name : "";
                  item.checked = false;
                }
              });
              this.checked = false;
              this.indeterminate = false;
            }
          })
        }
      });
    } else if (index == 1) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          let listID = [];
          this.listData.forEach(item => {
            if (item.checked) listID.push(item.id)
          })
          this.mService.getApiService().sendRequestDELETE_COMPANY(


            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.listData.forEach(item => {
                if (item.checked) {
                  let index = this.listData.findIndex(itm => {
                    return itm.id === item.id;
                  });
                  if (index > -1) {
                    this.listData.splice(index, 1)
                  }
                  this.checked = false;
                  this.indeterminate = false;
                }
              })
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
      this.listData.unshift(event)
    }
    this.addSub = 0
  }

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;
    this.stageID = event.stepID;
    this.cityID = event.cityID;

    this.onLoadData(1, this.menuSelected, this.cookieService.get('search-key'), event.timeFrom, event.timeTo, event.userID, event.stepID, event.cityID);
  }

}
