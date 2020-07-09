import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, SORT_TYPE, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

import { AddCategoryJobTileComponent } from 'src/app/dialogs/add-category-job-tile/add-category-job-tile.component';

@Component({
  selector: 'app-category-job-tile',
  templateUrl: './category-job-tile.component.html',
  styleUrls: ['./category-job-tile.component.scss']
})
export class CategoryJobTileComponent implements OnInit {

  //data for component table
  listTbData = {
    listColum: [
      { name: 'Tên', cell: 'name' },
      { name: 'Thao tác', cell: undefined }
    ],
    listButton: [
      { id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'warn' }
    ]
  };

  //data for component fillter bar
  toppingList = [
    { id: SORT_TYPE.SEARCH, name: 'Tìm kiếm' }
  ]

  mTitle: any;
  paramsObj: any;

  searchKey: any = "";

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.mService.LoadAppConfig();

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      if (params.searchKey) this.searchKey = params.searchKey;

      this.onLoadData();
    }
    else {
      this.mService.publishPageRoute('login')
    }

  }

  onLoadData() {
    this.mService.getApiService().sendRequestGET_CATEGORY_JOB_TILE(this.searchKey).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          listData: data.array,
          listTbData: this.listTbData
        });

        let listParams = [];
        if (this.searchKey != "") listParams.push({ key: 'searchKey', value: this.searchKey });

        this.paramsObj = this.mService.handleParamsRoute(listParams);

      }
    })
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddCategoryJobTileComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          name: res.name,
        }

        this.mService.getApiService().sendRequestADD_CATEGORY_JOB_TILE(obj).then(data => {
          this.mService.showSnackBar(data.message)
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData();
          }
        })
      }

    });
  }

  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.mService.getApiService().sendRequestDELETE_CATEGORY_JOB_TILE(event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData();
            }
          })
        }
      });
    }
  }

  onClickSort(event) {
    this.searchKey = event.searchKey;
    this.onLoadData();
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddCategoryJobTileComponent, {
      width: '500px',
      data: { name: event.data.name }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          name: res.name
        }
        this.mService.getApiService().sendRequestUPDATE_CATEGORY_JOB_TILE(obj, event.data.id).then(data => {
          this.mService.showSnackBar(data.message)
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData();
          }
        })
      }
    });
  }

}
