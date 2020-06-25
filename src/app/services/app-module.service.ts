import { Injectable, TemplateRef } from '@angular/core';
import { ApiService } from './api-service/api-service';
import { Config } from './core/app/config';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { LANGUAGE_TYPE } from './constant/app-constant';
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
    if (localStorage.getItem('user-info')) {
      this.mUser = JSON.parse(localStorage.getItem('user-info'));
    }
    return this.mUser;
  }

  public setUser(user: any) {
    localStorage.setItem('user-info', user)
    this.mUser = user;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getServer(): any {
    if (localStorage.getItem('server-info')) {
      this.serverInfo = JSON.parse(localStorage.getItem('server-info'));
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
      verticalPosition: vPosition ? vPosition : 'top',
    });
  }

  //----------------------------------------------------//

  private dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();

  publishEvent(name: string, params: any) {
    this.dataObserved.next({ name: name, params: params });
  }

  //----------------------------------------------------//

  handleActivatedRoute(listParams) {
    let paramsObj = {};
    for (let field of listParams) {
      paramsObj[field.key] = field.value
    }
    this.router.navigate([], {
      queryParams: paramsObj
    })

    return paramsObj;
  }
}
