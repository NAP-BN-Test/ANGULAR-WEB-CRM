import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, SORT_TYPE, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

import { AddCategoryCallOutcomeComponent } from 'src/app/dialogs/add-category-call-outcome/add-category-call-outcome.component';

@Component({
  selector: 'app-category-call-outcome',
  templateUrl: './category-call-outcome.component.html',
  styleUrls: ['./category-call-outcome.component.scss']
})
export class CategoryCallOutcomeComponent implements OnInit {

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

  page = 1;

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
      this.page = params.page;

      this.onLoadData();
    }
    else {
      this.mService.publishPageRoute('login')
    }

  }

  onLoadData() {
    this.mService.getApiService().sendRequestGET_CATEGORY_CALL_OUTCOME(this.searchKey).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: this.page,
          collectionSize: data.array.length,
          listData: data.array,
          listTbData: this.listTbData
        });

        let listParams = [{ key: 'page', value: this.page }];
        if (this.searchKey != "") listParams.push({ key: 'searchKey', value: this.searchKey });

        this.paramsObj = this.mService.handleParamsRoute(listParams);

      }
    })
  }

  onClickPagination(event) {
    this.page = event;
    this.onLoadData();
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddCategoryCallOutcomeComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          name: res.name,
        }

        this.mService.getApiService().sendRequestADD_CATEGORY_CALL_OUTCOME(obj).then(data => {
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
          this.mService.getApiService().sendRequestDELETE_CATEGORY_CALL_OUTCOME(event.data).then(data => {
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
    const dialogRef = this.dialog.open(AddCategoryCallOutcomeComponent, {
      width: '500px',
      data: { name: event.data.name }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          name: res.name
        }
        this.mService.getApiService().sendRequestUPDATE_CATEGORY_CALL_OUTCOME(obj, event.data.id).then(data => {
          this.mService.showSnackBar(data.message)
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData();
          }
        })
      }
    });
  }

}
