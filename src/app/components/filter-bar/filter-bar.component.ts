import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { CookieService } from 'ngx-cookie-service';
import { STATUS } from 'src/app/services/constant/app-constant';
import * as moment from 'moment';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Output('searchChange') searchChange = new EventEmitter();
  @Output('clickAdd') clickAdd = new EventEmitter();
  @Output('sort') sort = new EventEmitter();

  mData: any;

  listUser = [];

  searchKey = "";

  userID = -1;
  timeFrom = moment.utc().format("YYYY-MM-DD");;
  timeTo = moment.utc().format("YYYY-MM-DD");

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.contact;
    });
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
  }

  onSearchChange(event) {
    let searchKey = event.target.value;

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
      timeFrom: this.timeFrom,
      timeTo: this.timeTo
    })
  }

}
