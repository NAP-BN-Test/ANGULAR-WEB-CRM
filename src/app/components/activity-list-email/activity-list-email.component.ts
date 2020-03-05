import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-activity-list-email',
  templateUrl: './activity-list-email.component.html',
  styleUrls: ['./activity-list-email.component.scss']
})
export class ActivityListEmailComponent implements OnInit {
  listData = [];

  mData: any;

  menuSelected = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  addSub = 0

  pageSize = 12;
  collectionSize = 0;

  timeFrom = null;
  timeTo = null;
  userIDFind = null;
  timeType = 1;

  page = 1;

  numberAll = 0;


  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.contact;
    });
    if (this.mService.getUser()) {
      this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
    }
    else {
      this.router.navigate(['login']);
    }
  }

  onLoadData(page: number, menuType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number, timeType: number) {
    this.mService.getApiService().sendRequestGET_LIST_EMAIL(
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
        this.listData = data.array;

        this.numberAll = data.all;
        this.collectionSize = data.all;
      }
    })
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

    this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);

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
    this.onLoadData(event, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
  }

  onClickItem(item, type) {
    if (type == 1) {
      if (Number(item.contactID) > -1)
        this.router.navigate(['contact-detail'], { state: { params: item } });
    } else if (type == 2) {
      if (Number(item.companyID) > -1)
        this.router.navigate(['company-detail'], { state: { params: item } });
    }
  }

  onClickAssign(index) {
    if (index == 0) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          let listID = [];
          this.listData.forEach(item => {
            if (item.checked) listID.push(item.id)
          })
          this.mService.getApiService().sendRequestDELETE_EMAIL(
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

    this.onLoadData(1, 1, "", event.timeFrom, event.timeTo, event.userID, event.timeType);
  }

}
