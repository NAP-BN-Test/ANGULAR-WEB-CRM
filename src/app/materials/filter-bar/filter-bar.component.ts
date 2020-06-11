import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { CookieService } from 'ngx-cookie-service';
import { STATUS, SORT_TYPE } from 'src/app/services/constant/app-constant';
import { FormControl } from '@angular/forms';
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

  @Input('onContact') onContact = false;
  @Input('listActivity') listActivity = false;
  @Input('noCreate') noCreate = false;

  @Input('type') type = -1;

  @Input('toppingList') toppingList = [];


  @Output('searchChange') searchChange = new EventEmitter();
  @Output('clickAdd') clickAdd = new EventEmitter();
  @Output('clickImport') clickImport = new EventEmitter();
  @Output('sort') sort = new EventEmitter();

  mData: any;

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
  sortTimeStart = false;
  sortTimeEnd = false;
  sortSearch = false;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.contact;
    });

    if (this.onContact)
      this.searchKey = this.cookieService.get('search-key-contact');
    else
      this.searchKey = this.cookieService.get('search-key');

    this.mService.getApiService().sendRequestGET_LIST_USER(
      this.mService.getUser().username,
      this.mService.getUser().id,
      1
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listUser = data.array;
        this.listUser.unshift({ id: -1, name: this.mData.all })
      }
    })

    this.mService.getApiService().sendRequestGET_DEAL_STAGE(
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listStep = data.array;
        this.listStep.unshift({ id: -1, name: this.mData.all })
      }
    })

    this.mService.getApiService().sendRequestGET_LIST_CITY(
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listCity = data.array;
        this.listCity.unshift({ id: -1, name: this.mData.all })
      }
    })

  }

  onSearchChange(event) {
    let searchKey = event.target.value;

    if (this.onContact)
      this.cookieService.set('search-key-contact', searchKey);
    else
      this.cookieService.set('search-key', searchKey);

    this.searchChange.emit(searchKey);
  }

  onClickAdd() {
    this.clickAdd.emit();
  }

  // onPickDate(event, type) {
  //   if (type == 1) {
  //     this.timeFrom = event;
  //   } else {
  //     this.timeTo = event;
  //   }
  // }

  onClickSort() {
    this.sort.emit({
      // userID: this.userID > 0 ? this.userID : null,
      // cityID: this.cityID > 0 ? this.cityID : null,
      // stepID: this.stepID > 0 ? this.stepID : null,
      // timeFrom: this.timeFrom,
      // timeTo: this.timeTo,
      // timeType: this.timeType
      userID: toID(this.userSelect.value),
      timeFrom: toDate(this.dateStartInput.value),
      timeTo: toDate(this.dateEndInput.value),
      searchKey: this.searchKeyInput.value
    })

  }

  onClickClear() {
    // this.userID = -1;
    // this.stepID = -1;
    // this.cityID = -1;
    // this.timeFrom = null;
    // this.timeTo = null;
    // this.timeType = 1;

    this.dateStartInput.value = '';
    this.dateEndInput.value = '';
    this.searchKeyInput.value = '';
    this.userSelect.value = '';

  }

  onClickImport() {
    this.clickImport.emit();
  }

  onSortChange(event) {
    this.sortUser = event.value.includes(SORT_TYPE.USER);
    this.sortTimeStart = event.value.includes(SORT_TYPE.TIME_START);
    this.sortTimeEnd = event.value.includes(SORT_TYPE.TIME_END);
    this.sortSearch = event.value.includes(SORT_TYPE.SEARCH);
  }

  onUserChange(event) {
    if (event)
      this.userID = Number(event.value)
  }

  applyFilter(event: Event) {
    console.log(event);
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
