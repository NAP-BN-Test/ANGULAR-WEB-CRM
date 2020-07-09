import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, SORT_TYPE, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

import { AddCategoryCountryComponent } from 'src/app/dialogs/add-category-country/add-category-country.component';

@Component({
  selector: 'app-category-country',
  templateUrl: './category-country.component.html',
  styleUrls: ['./category-country.component.scss']
})
export class CategoryCountryComponent implements OnInit {

  //data for component table
  listTbData = {
    listColum: [
      { name: 'Tên nước', cell: 'name' },
      { name: 'Mã nước', cell: 'code' },
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

  searchKey = null;

  page = 1;
  collectionSize: number;

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

      this.onLoadData(this.page, this.searchKey);
    }
    else {
      this.mService.publishPageRoute('login')
    }

  }

  onLoadData(page: number, searchKey: string) {
    this.mService.getApiService().sendRequestGET_CATEGORY_COUNTRY(
      page,
      searchKey
    ).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {

        this.collectionSize = data.count;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: this.page,
          collectionSize: this.collectionSize,
          listData: data.array,
          listTbData: this.listTbData
        });

        let listParams = [{ key: 'page', value: this.page }];
        if(this.searchKey != "") listParams.push({key: 'searchKey', value: this.searchKey});

        this.paramsObj = this.mService.handleParamsRoute(listParams);

      }
    })
  }

  onClickPagination(event) {
    this.onLoadData(event, this.searchKey);
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddCategoryCountryComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          name: res.name,
          code: res.code
        }

        this.mService.getApiService().sendRequestADD_CATEGORY_COUNTRY(obj).then(data => {
          this.mService.showSnackBar(data.message)
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData(1, this.searchKey);
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
          this.mService.getApiService().sendRequestDELETE_CATEGORY_COUNTRY(event.data).then(data => {
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.searchKey);
            }
          })
        }
      });
    }
  }

  onClickSort(event) {
    this.searchKey = event.searchKey;
    this.onLoadData(1, this.searchKey);
  }

  onClickEdit(event) {

    const dialogRef = this.dialog.open(AddCategoryCountryComponent, {
      width: '500px',
      data: { name: event.data.name, code: event.data.code }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let obj = {
          name: res.name,
          code: res.code
        }
        this.mService.getApiService().sendRequestUPDATE_CATEGORY_COUNTRY(obj, event.data.id).then(data => {
          this.mService.showSnackBar(data.message)
          if (data.status == STATUS.SUCCESS) {
            this.onLoadData(1, this.searchKey);
          }
        })
      }
    });
  }
}
