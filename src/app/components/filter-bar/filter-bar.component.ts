import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { CookieService } from 'ngx-cookie-service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @Input('onContact') onContact = false;
  @Input('listActivity') listActivity = false;

  @Output('searchChange') searchChange = new EventEmitter();
  @Output('clickAdd') clickAdd = new EventEmitter();
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

  timeFrom = null;
  timeTo = null;

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

  onPickDate(event, type) {
    if (type == 1) {
      this.timeFrom = event;
    } else {
      this.timeTo = event;
    }
  }

  onClickSort() {
    this.sort.emit({
      userID: this.userID > 0 ? this.userID : null,
      cityID: this.cityID > 0 ? this.cityID : null,
      stepID: this.stepID > 0 ? this.stepID : null,
      timeFrom: this.timeFrom,
      timeTo: this.timeTo,
      timeType: this.timeType
    })
  }

  onClickClear() {
    this.userID = -1;
    this.stepID = -1;
    this.cityID = -1;
    this.timeFrom = null;
    this.timeTo = null;
    this.timeType = 1;
  }

}
