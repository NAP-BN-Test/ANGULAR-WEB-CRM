import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { Utils } from 'src/app/services/core/app/utils';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

import * as moment from 'moment'

@Component({
  selector: 'app-activity-list-call',
  templateUrl: './activity-list-call.component.html',
  styleUrls: ['./activity-list-call.component.scss']
})
export class ActivityListCallComponent implements OnInit {
  listData = [];
  listDataSummary = [];
  listDataCache = [];

  mData: any;

  menuSelected = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  addSub = 0

  page = 1;
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
      this.onLoadData();
    }
    else {
      this.router.navigate(['login']);
    }
  }

  onLoadData(type?: number) {
    this.mService.getApiService().sendRequestGET_LIST_CALL(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listData = data.array;
        this.listDataSummary = data.array;
        this.listDataCache = data.array;
      }
    })
  }

  get listDataSort(): Array<any> {
    this.collectionSize = this.listData.length;
    return this.listData
      .map((item, i) => ({ id: i + 1, ...item }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  get contactInfo(): any {
    let all = 0;
    let today = 0;
    let week = 0;

    this.listDataSummary.forEach(item => {
      all += 1;
      if (moment.utc(item.timeRemind).format("YYYY-MM-DD") == moment.utc().format("YYYY-MM-DD"))
        today += 1;
      if (moment.utc(item.timeRemind).valueOf() >= moment.utc(moment.utc().format("YYYY-MM-DD")).valueOf() - 604800000)
        week += 1;
    });

    return { all, today, week };
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
    this.menuSelected = index;
    if (index == 0) {
      this.listData = this.listDataCache;
    } else if (index == 1) {
      this.listData = this.listDataCache.filter(item => {
        return moment.utc(item.timeRemind).format("YYYY-MM-DD") == moment.utc().format("YYYY-MM-DD");
      });
    } else if (index == 2) {
      this.listData = this.listDataCache.filter(item => {
        return moment.utc(item.timeRemind).valueOf() >= moment.utc(moment.utc().format("YYYY-MM-DD")).valueOf() - 604800000;
      });
    }

  }

  onCheckBoxChange(item) {
    let index = this.listData.findIndex(it => {
      return it.id == item.id;
    });

    if (index > -1) {
      this.listData[index].checked = !this.listData[index].checked;
    }

    let value = this.listData[index].checked ? 2 : 0;

    this.numberOfItemSelected = 0;

    this.listDataSort.forEach(it => {
      if (it.checked) this.numberOfItemSelected += 1;

      if (!it.checked && value == 0) value = 0;
      else if (!it.checked && value == 2) value = 1;
      else if (it.checked && value == 0) value = 1;
      else if (it.checked && value == 2) value = 2;
      else value = 1;
    });

    if (value == 0) {
      this.checked = false;
      this.indeterminate = false
    }
    else if (value == 1) {
      this.indeterminate = true;
    }
    else if (value == 2) {
      this.checked = true;
      this.indeterminate = false;
    }

  }

  onStatusChange(event, item) {
    let checked = event.target.checked;
    let obj: any = this.listData.find(itm => {
      return itm.id === item.id;
    });
    if (obj) {
      this.mService.getApiService().sendRequestUPDATE_TASK(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        this.mService.getUser().id,
        item.id,
        checked ? checked : null
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          obj.status = checked;
        }
      })
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
      this.listDataSort.forEach(it => {
        let obj = this.listData.find(it1 => {
          return it1.id == it.id;
        });
        obj.checked = true;
        this.numberOfItemSelected += 1;
      })
    }
  }

  onClickPagination() {
    this.checked = false;
    this.listData.forEach(item => {
      item.checked = false;
    })
  }

  onSearchChange(event) {
    let searchKey = event.target.value;
    this.listData = this.listDataCache.filter(item => {
      return Utils.bodauTiengViet(item.name ? item.name : "").includes(Utils.bodauTiengViet(searchKey));
    })
  }

  onClickItem(item) {
    if (item.type == 1) {
      this.router.navigate(['company-detail'], { state: { params: item } });
    } else if (item.type == 2) {
      this.router.navigate(['contact-detail'], { state: { params: item } });
    }
  }

  onClickCloseAdd(event) {
    if (event) {
      this.listData.unshift(event)
    }
    this.addSub = 0
  }

  onClickAssign(index) {
    if (index == 0) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          let listID = [];
          this.listDataSort.forEach(item => {
            if (item.checked) listID.push(item.id)
          })
          this.mService.getApiService().sendRequestDELETE_CALL(
            this.mService.getServer().ip,
            this.mService.getServer().dbName,
            this.mService.getUser().username,
            this.mService.getUser().id,
            JSON.stringify(listID)
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.listDataSort.forEach(item => {
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

}
