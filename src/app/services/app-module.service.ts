import { Injectable, TemplateRef } from '@angular/core';
import { ApiService } from './api-service/api-service';
import { Config } from './core/app/config';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { LANGUAGE_TYPE, TIME_SELECT, TIME_TYPE, LOCAL_STORAGE_KEY } from './constant/app-constant';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppModuleService {

  private mApiService: ApiService;
  private mAppConfig: Config;

  mUser: any;
  token: string = "";
  serverInfo: string = "";

  isLogin: boolean = false;

  constructor(
    public mAngularHttp: Http,
    public router: Router,
    public activatedRoute: ActivatedRoute,

    private _snackBar: MatSnackBar

  ) {
    this.mApiService = new ApiService();
    this.mAppConfig = new Config();
  }


  //----------------------------------------------------//

  public getApiService(): ApiService {
    return this.mApiService;
  }

  public getAppConfig(): Config {
    return this.mAppConfig;
  }

  //----------------------------------------------------//

  public getUser(): any {
    if (localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO)) {
      this.mUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO));
    }
    return this.mUser;
  }

  public setUser(user: any) {
    localStorage.setItem(LOCAL_STORAGE_KEY.USER_INFO, user)
    this.mUser = user;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getServer(): any {
    if (localStorage.getItem(LOCAL_STORAGE_KEY.SERVER_INFO)) {
      this.serverInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.SERVER_INFO));
    }
    return this.serverInfo;
  }

  public setServer(serverInfo: any) {
    this.serverInfo = serverInfo;
  }

  //----------------------------------------------------//


  public LoadAppConfig() {
    this.getApiService().createClient(this.mAngularHttp);
    return new Promise((resolve, reject) => {
      if (this.getAppConfig().hasData()) {
        return resolve();
      } else {
        this.getApiService().getAngularHttp().request("assets/data/config.json").subscribe(
          response => {
            let dataObject = response.json();
            this.mAppConfig.setData(dataObject);
            this.getApiService().setData(dataObject);

            return resolve();
          }, error => {
            return reject();
          }
        );
      }
    });
  }

  public LoadTitle(languageType: any) {
    this.getApiService().createClient(this.mAngularHttp);
    return new Promise((resolve, reject) => {
      this.getApiService().getAngularHttp().request("assets/data/title.json").subscribe(
        response => {
          let dataObj = response.json();
          let language;
          if (languageType == LANGUAGE_TYPE.VIETNAMESE)
            language = dataObj.VI;
          else
            language = dataObj.EN;

          return resolve(language);
        }, error => {
          return reject();
        }
      );
    });
  }

  public LoadTitles(languageType: any) {
    return new Promise((resolve, reject) => {
      this.mAngularHttp.request("assets/data/title.json").subscribe(data => {
        let mTitle = data.json();
        let language;
        if (languageType == LANGUAGE_TYPE.VIETNAMESE)
          language = mTitle.VI;
        else
          language = mTitle.EN;

        resolve(language)
      })
    });
  }

  public loadVieLanguage() {
    return new Promise((resolve, reject) => {
      this.mAngularHttp.request("assets/data/language-vie.json").subscribe(data => {
        let mTitle = data.json();
        resolve(mTitle)
      })
    });
  }

  //----------------------------------------------------//

  public parseTime(time: string): string {
    return moment(time).format("DD/MM/YYYY");
  }

  public parseMonthTime(time: string): string {
    return moment(time).format("MM-YYYY");
  }


  //----------------------------------------------------//


  public showSnackBar(message: string, duration?: number, hPosition?: any, vPosition?: any) {
    this._snackBar.open(message, null, {
      duration: duration ? duration : 2000,
      horizontalPosition: hPosition ? hPosition : 'center',
      verticalPosition: vPosition ? vPosition : 'bottom',
    });
  }

  //----------------------------------------------------//

  public dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();

  publishEvent(name: string, params: any) {
    this.dataObserved.next({ name: name, params: params });
  }

  //----------------------------------------------------//

  handleParamsRoute(listParams) {
    let paramsObj = {};
    for (let field of listParams) {
      paramsObj[field.key] = field.value
    }
    this.router.navigate([], {
      queryParams: paramsObj
    })

    return paramsObj;
  }

  publishPageRoute(component: string, params?: any, state?: any) {
    this.router.navigate([component], {
      queryParams: params ? params : {},
      state: { params: state ? state : {} }
    });
  }

  handleActivatedRoute() {
    let array = [];
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.mailListID) array.push({ key: 'mailListID', value: params.mailListID })
      if (params.email) array.push({ key: 'email', value: params.email })
      if (params.campainID) array.push({ key: 'campainID', value: params.campainID })
      if (params.tabIndex) array.push({ key: 'tabIndex', value: params.tabIndex })
      if (params.campainName) array.push({ key: 'campainName', value: params.campainName })
      if (params.mailListName) array.push({ key: 'mailListName', value: params.mailListName })

      if (params.stepID) array.push({ key: 'stepID', value: params.stepID })
      if (params.cityID) array.push({ key: 'cityID', value: params.cityID })
      if (params.timeFrom) array.push({ key: 'timeFrom', value: params.timeFrom })
      if (params.timeTo) array.push({ key: 'timeTo', value: params.timeTo })
      if (params.userIDFind) array.push({ key: 'userIDFind', value: params.userIDFind })
      if (params.searchKey) array.push({ key: 'searchKey', value: params.searchKey })

      if (params.menu) array.push({ key: 'menu', value: params.menu })
      if (params.page) array.push({ key: 'page', value: params.page })
    });

    let paramsObj = {};
    for (let field of array) {
      paramsObj[field.key] = field.value
    }
    this.router.navigate([], {
      queryParams: paramsObj
    })
    return paramsObj;
  }

  handleReportTimeSelect(isTimeSelect: boolean, selectTimeIndex: number) {
    if (isTimeSelect) {
      let timePickerJson = localStorage.getItem(LOCAL_STORAGE_KEY.REPORT_TIME_SELECT_TIME_PICKER);
      let timePicker = JSON.parse(timePickerJson);

      return {
        timeFrom: timePicker.timeFrom,
        timeTo: timePicker.timeTo,
        timeType: timePicker.timeType,
        timeSelect: TIME_SELECT.SELECT
      }
    } else {
      let now = moment().format("YYYY-MM-DD HH:mm:ss");
      if (selectTimeIndex == TIME_SELECT.TODAY) {
        return {
          timeFrom: moment().format("YYYY-MM-DD"),
          timeTo: now,
          timeType: TIME_TYPE.HOUR,
          timeSelect: TIME_SELECT.TODAY
        }
      } else if (selectTimeIndex == TIME_SELECT.YESTERDAY) {
        let yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");
        return {
          timeFrom: yesterday,
          timeTo: yesterday + " 23:59:59",
          timeType: TIME_TYPE.HOUR,
          timeSelect: TIME_SELECT.YESTERDAY
        }
      } else if (selectTimeIndex == TIME_SELECT.LAST_24H) {
        return {
          timeFrom: moment().add(-24, 'hours').format("YYYY-MM-DD HH:mm:ss"),
          timeTo: now,
          timeType: TIME_TYPE.HOUR,
          timeSelect: TIME_SELECT.LAST_24H
        }
      } else if (selectTimeIndex == TIME_SELECT.LAST_7DAY) {
        return {
          timeFrom: moment().add(-7, 'days').format("YYYY-MM-DD"),
          timeTo: now,
          timeType: TIME_TYPE.DAY,
          timeSelect: TIME_SELECT.LAST_7DAY
        }
      } else if (selectTimeIndex == TIME_SELECT.LAST_30DAY) {
        return {
          timeFrom: moment().add(-30, 'days').format("YYYY-MM-DD"),
          timeTo: now,
          timeType: TIME_TYPE.DATE,
          timeSelect: TIME_SELECT.LAST_30DAY
        }
      } else if (selectTimeIndex == TIME_SELECT.THIS_MONTH) {
        let thisMonth = moment().format("YYYY-MM");
        return {
          timeFrom: thisMonth + "-01",
          timeTo: now,
          timeType: TIME_TYPE.DATE,
          timeSelect: TIME_SELECT.THIS_MONTH
        }
      } else if (selectTimeIndex == TIME_SELECT.LAST_MONTH) {
        let lastMonth = moment().add(-1, 'months').format("YYYY-MM");
        let dayInMonth = moment().add(-1, 'months').daysInMonth();
        return {
          timeFrom: lastMonth + "-01",
          timeTo: lastMonth + "-" + dayInMonth + " 23:59:59",
          timeType: TIME_TYPE.DATE,
          timeSelect: TIME_SELECT.LAST_MONTH
        }
      } else {
        return {
          timeType: TIME_TYPE.MONTH,
          timeSelect: TIME_SELECT.ALL_TIME
        };
      }
    }
  }

  getRouterUrl() {
    let urlFull = this.router.url;
    let urlSplit = urlFull.split("?");
    let url = urlSplit[0].replace("/", "");

    return url;
  }
}
