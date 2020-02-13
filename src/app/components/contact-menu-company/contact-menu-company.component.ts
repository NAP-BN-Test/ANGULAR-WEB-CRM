import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { Utils } from 'src/app/services/core/app/utils';
import { MatDialog } from '@angular/material';
import { DialogAssignCompanyComponent } from '../dialog-assign-company/dialog-assign-company.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-contact-menu-company',
  templateUrl: './contact-menu-company.component.html',
  styleUrls: ['./contact-menu-company.component.scss']
})
export class ContactMenuCompanyComponent implements OnInit {

  listData = [];
  // listDataSummary = [];
  // listDataCache = [];

  mData: any;

  menuSelected = 1;

  numberAll = 0;
  numberUnAssign = 0;
  numberAssign = 0;
  numberFollow = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  addSub = 0

  page = 1;

  mPage = 1;

  searchKey = "";

  pageSize = 12;
  collectionSize = 0;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.contact;
    });
    if (this.mService.getUser()) {
      this.onLoadData(1, 1, null);
    }
    else {
      this.router.navigate(['login']);
    }
  }

  onLoadData(page: number, companyType: number, searchKey: string) {
    this.mService.getApiService().sendRequestGET_LIST_COMPANY(
      
      
      this.mService.getUser().username,
      this.mService.getUser().id,
      page,
      companyType,
      searchKey
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listData = data.array;
        // this.listDataCache = data.array;
        // this.listDataSummary = data.array;

        this.numberAll = data.all;
        this.numberUnAssign = data.unassign;
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
    this.mPage = 1;
    this.menuSelected = index;
    this.onLoadData(1, index, this.searchKey);
  }

  onCheckBoxChange(item, event) {
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
    this.onLoadData(event, this.menuSelected, this.searchKey);
  }

  onClickItem(item) {
    this.router.navigate(['company-detail'], { state: { params: item } });
  }

  onSearchChange(event) {
    let searchKey = event.target.value;

    this.onLoadData(1, this.menuSelected, searchKey);
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
                  item.email = data.obj.name;
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

}
