import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, SORT_TYPE, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';
import { MatInput, MatSelect } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @ViewChild('dateStartInput', { read: MatInput }) dateStartInput: MatInput;
  @ViewChild('dateEndInput', { read: MatInput }) dateEndInput: MatInput;
  @ViewChild('searchKeyInput', { read: MatInput }) searchKeyInput: MatInput;

  @ViewChild('userSelect', { read: MatSelect }) userSelect: MatSelect;
  @ViewChild('stepSelect', { read: MatSelect }) stepSelect: MatSelect;
  @ViewChild('citySelect', { read: MatSelect }) citySelect: MatSelect;
  @ViewChild('timeTypeSelect', { read: MatSelect }) timeTypeSelect: MatSelect;

  @Input('noAdd') noAdd = false;
  @Input('noImport') noImport = false;

  @Input('toppingList') toppingList = [];

  @Input('paramsObj') paramsObj: any;


  @Output('searchChange') searchChange = new EventEmitter();
  @Output('clickAdd') clickAdd = new EventEmitter();
  @Output('clickImport') clickImport = new EventEmitter();
  @Output('sort') sort = new EventEmitter();

  mTitle: any;

  listUser = [];
  listStep = [];
  listCity = [];

  searchKey = "";

  userID = -1;
  stepID = -1;
  cityID = -1;

  timeType = 1;

  // timeFrom = null;
  // timeTo = null;



  sortUser = false;
  sortStep = false;
  sortCity = false;
  sortTimeStart = false;
  sortTimeEnd = false;
  sortSearch = false;
  sortTimeType = false;

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    this.mService.getApiService().sendRequestGET_LIST_USER(
      this.mService.getUser().username,
      this.mService.getUser().id,
      1
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listUser = data.array;
        this.listUser.unshift({ id: -1, name: this.mTitle.all })
      }
    })

    this.mService.getApiService().sendRequestGET_DEAL_STAGE(
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listStep = data.array;
        this.listStep.unshift({ id: -1, name: this.mTitle.all })
      }
    })

    this.mService.getApiService().sendRequestGET_LIST_CITY(
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listCity = data.array;
        this.listCity.unshift({ id: -1, name: this.mTitle.all })
      }
    })

    this.handleParams();

  }

  onClickAdd() {
    this.clickAdd.emit();
  }

  onClickImport() {
    this.clickImport.emit();
  }

  onClickSort() {
    this.sort.emit({
      userID: toID(this.userSelect.value),
      stepID: toID(this.stepSelect.value),
      cityID: toID(this.citySelect.value),
      timeType: this.timeType,
      timeFrom: toDate(this.dateStartInput.value),
      timeTo: toDate(this.dateEndInput.value),
      searchKey: this.searchKeyInput.value
    })

  }

  onClickClear() {
    this.dateStartInput.value = '';
    this.dateEndInput.value = '';
    this.searchKeyInput.value = '';
    this.userSelect.value = '';
    this.stepSelect.value = '';
    this.citySelect.value = '';
    this.timeTypeSelect.value = '';

  }

  onSortChange(event) {
    this.sortUser = event.value.includes(SORT_TYPE.USER);
    this.sortStep = event.value.includes(SORT_TYPE.STEP);
    this.sortCity = event.value.includes(SORT_TYPE.CITY);
    this.sortTimeStart = event.value.includes(SORT_TYPE.TIME_START);
    this.sortTimeEnd = event.value.includes(SORT_TYPE.TIME_END);
    this.sortSearch = event.value.includes(SORT_TYPE.SEARCH);
    this.sortTimeType = event.value.includes(SORT_TYPE.TIME_TYPE);
  }

  toppingListSelected;
  handleParams() {
    setTimeout(() => {
      this.toppingListSelected = [];
      if (this.paramsObj)
        if (this.paramsObj.searchKey) {
          this.searchKeyInput.value = this.paramsObj.searchKey;
          this.sortSearch = true;
          this.toppingListSelected.push(SORT_TYPE.SEARCH);
        }
    }, 500);

  }

}

function toDate(time): string {
  if (time)
    return moment(time).format("YYYY-MM-DD")
  else return null;
}
function toID(value): number {
  if (value) {
    if (!isNaN(value))
      return Number(value)
    else return null;
  } else return null;
}
