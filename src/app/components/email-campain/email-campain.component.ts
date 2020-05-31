import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogAssignCompanyComponent } from '../dialog-assign-company/dialog-assign-company.component';

@Component({
  selector: 'app-email-campain',
  templateUrl: './email-campain.component.html',
  styleUrls: ['./email-campain.component.scss']
})
export class EmailCampainComponent implements OnInit {

  listContact = [];

  mData: any;

  menuSelected = 1;

  numberAll = 0;
  numberUnAssign = 0;
  numberAssignAll = 0;
  numberAssign = 0;
  numberFollow = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  addSub = 0

  page = 1;
  pageSize = 12;
  collectionSize: number;

  timeFrom = null;
  timeTo = null;
  userIDFind = null;

  mPage = 1;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.email;
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
    this.mService.getApiService().sendRequestGET_LIST_MAIL_CAMPAIN(
      this.mService.getUser().username,
      this.mService.getUser().id,
      page,
      searchKey,
      timeFrom,
      timeTo,
      userIDFind
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.listContact = data.array;

        this.numberAll = data.count;
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
    this.mPage = 1;
    this.menuSelected = index;
    this.cookieService.set('contact-menu', index + "");

    this.onLoadData(1, index, this.cookieService.get('search-key-contact'), this.timeFrom, this.timeTo, this.userIDFind);

  }

  onCheckBoxChange(event) {
    let checked = event.checked;
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
      this.listContact.forEach(item => {
        item.checked = false;
      })
    }
    else {
      this.listContact.forEach(it => {
        let obj = this.listContact.find(it1 => {
          return it1.id == it.id;
        });
        obj.checked = true;
        this.numberOfItemSelected += 1;
      })
    }
  }

  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, this.menuSelected, this.cookieService.get('search-key-contact'), this.timeFrom, this.timeTo, this.userIDFind);
  }

  onSearchChange(event) {
    this.onLoadData(1, this.menuSelected, event, this.timeFrom, this.timeTo, this.userIDFind);
  }

  onClickItem(item, type) {
    if (type == 1) {
      this.router.navigate(['contact-detail'], { state: { params: item } });
    } else if (type == 2) {
      if (item.companyID > 0) {
        this.router.navigate(['company-detail'], { state: { params: item } });
      }
    }
  }

  onClickAdd() {
    this.addSub = 1;
  }

  onClickCloseAdd(event) {
    if (event) {
      this.listContact.unshift(event)
    }
    this.addSub = 0
  }

  onClickAssign(index) {
    if (index == 0) {
      const dialogRef = this.dialog.open(DialogAssignCompanyComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          let listID = [];
          this.listContact.forEach(item => {
            if (item.checked) listID.push(item.id)
          })
          this.mService.getApiService().sendRequestASSIGN_CONTACT_OWNER(
            this.mService.getUser().username,
            this.mService.getUser().id,
            res,
            JSON.stringify(listID)
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.listContact.forEach(item => {
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
          this.listContact.forEach(item => {
            if (item.checked) listID.push(item.id)
          })
          this.mService.getApiService().sendRequestDELETE_CONTACT(


            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.listContact.forEach(item => {
                if (item.checked) {
                  let index = this.listContact.findIndex(itm => {
                    return itm.id === item.id;
                  });
                  if (index > -1) {
                    this.listContact.splice(index, 1)
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

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;

    this.onLoadData(1, this.menuSelected, this.cookieService.get('search-key-call'), event.timeFrom, event.timeTo, event.userID);
  }

}
