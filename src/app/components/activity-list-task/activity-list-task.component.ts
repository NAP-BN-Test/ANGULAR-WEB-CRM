import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, CLICK_DETAIL, BUTTON_TYPE, SORT_TYPE, EVENT_PUSH } from 'src/app/services/constant/app-constant';
import { DialogAssignContactComponent } from '../../dialogs/dialog-assign-contact/dialog-assign-contact.component';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';


@Component({
  selector: 'app-activity-list-task',
  templateUrl: './activity-list-task.component.html',
  styleUrls: ['./activity-list-task.component.scss']
})
export class ActivityListTaskComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.ACTIVITY,
    listColum: [
      { name: 'Tên', cell: 'taskName' },
      { name: 'Nội dung', cell: 'description' },
      { name: 'Phân công', cell: 'assignName' },
      { name: 'Loại', cell: 'type' },
      { name: 'Người tạo', cell: 'createName' },
      { name: 'Ngày tạo', cell: 'timeCreate' },
      { name: 'Hết hạn', cell: 'timeRemind' },
    ],
    listButton: [
      { id: BUTTON_TYPE.COMPLETE, name: 'Hoàn thành hết', color: 'primary' },
      { id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'warn' }
    ]
  };

  //data for component fillter bar
  toppingList = [
    { id: SORT_TYPE.USER, name: 'User' },
    { id: SORT_TYPE.TIME_TYPE, name: 'Loại tg' },
    { id: SORT_TYPE.TIME_START, name: 'Tg bắt đầu' },
    { id: SORT_TYPE.TIME_END, name: 'Tg kết thúc' },
    { id: SORT_TYPE.SEARCH, name: 'Tìm kiếm' }
  ]

  mTitle: any;

  menuSelected = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  numberAll = 0;

  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;
  collectionSize: number;

  timeFrom = null;
  timeTo = null;
  userIDFind = null;
  timeType = 1;

  page = 1;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.contact;
    });

    if (this.mService.getUser()) {
      this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
    }
    else {
      this.router.navigate(['login']);
    }
  }

  onLoadData(page: number, menuType: number, searchKey: string, timeFrom: string, timeTo: string, userIDFind: number, timeType: number) {
    this.mService.getApiService().sendRequestGET_LIST_TASK(
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

        this.numberAll = data.all;

        this.collectionSize = data.all;

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


  onClickPagination(event) {
    this.checked = false;
    this.onLoadData(event, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
  }
  onClickSettingItemPerPage(event) {
    this.itemPerPage = event;
    this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);
  }

  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestDELETE_TASK(
            this.mService.getUser().username,
            this.mService.getUser().id,
            event.data
          ).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(1, 1, "", this.timeFrom, this.timeTo, this.userIDFind, this.timeType);

            }
          })
        }
      });
    }
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

  onClickSort(event) {
    this.timeFrom = event.timeFrom;
    this.timeTo = event.timeTo;
    this.userIDFind = event.userID;

    this.onLoadData(1, 1, "", event.timeFrom, event.timeTo, event.userID, event.timeType);
  }

}
