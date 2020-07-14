import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, TIME_SELECT } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-list-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.scss']
})
export class ListHistoryComponent implements OnInit {

  searchKey = "";

  listData = [];
  listDataFilter = [];

  menuSelected = TIME_SELECT.ALL_TIME;

  listMenu = [
    { id: TIME_SELECT.ALL_TIME, name: "Tất cả", icon: "vertical_split" },
    { id: TIME_SELECT.TODAY, name: "Hôm nay", icon: "today" },
    { id: TIME_SELECT.YESTERDAY, name: "Hôm qua", icon: "event" },
    { id: TIME_SELECT.LAST_7DAY, name: "Tuần trước", icon: "date_range" },
  ]

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {
    this.mService.LoadAppConfig();

    this.onLoadData();
  }

  onLoadData() {
    this.mService.getApiService().sendRequestGET_HISTORY(this.searchKey, this.menuSelected).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listData = data.array;
        this.listDataFilter = data.array;
      }
    })
  }

  onClickDelete(item) {
    this.mService.getApiService().sendRequestDELETE_HISTORY(item.id).then(data => {
      this.mService.showSnackBar(data.message);
      if (data.status == STATUS.SUCCESS) {
        this.onLoadData();
      }
    })
  }

  onClickMenu(index) {
    this.menuSelected = index;
    this.onLoadData();
  }

  onSearchChange() {
    this.listData = this.listDataFilter.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase()) === 0;
    })
  }

  onClickItem(item) {
    let params = JSON.parse(item.param);

    let listParams = [];
    
    if (params.stepID != "") listParams.push({ key: 'stepID', value: params.stepID });
    if (params.cityID != "") listParams.push({ key: 'cityID', value: params.cityID });
    if (params.timeFrom != "") listParams.push({ key: 'timeFrom', value: params.timeFrom });
    if (params.timeTo != "") listParams.push({ key: 'timeTo', value: params.timeTo });
    if (params.userIDFind != "") listParams.push({ key: 'userIDFind', value: params.userIDFind });
    if (params.searchKey != "") listParams.push({ key: 'searchKey', value: params.searchKey });
    if (params.menu != "") listParams.push({ key: 'menu', value: params.menu });
    if (params.page != "") listParams.push({ key: 'page', value: params.page });

    let paramsObj = this.mService.handleParamsRoute(listParams);

    this.mService.publishPageRoute(item.router, paramsObj);
  }

}
