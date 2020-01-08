import { Injectable } from '@angular/core';
import { ApiService } from './api-service/api-service';
import { Config } from './core/app/config';
import { Users } from './classes/user';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { LANGUAGE_TYPE } from './constant/app-constant';

@Injectable({
  providedIn: 'root'
})
export class AppModuleService {

  private mApiService: ApiService;
  private mAppConfig: Config;

  mUser: Users;
  token: string = "";
  ip: string = "";

  isLogin: boolean = false;

  constructor(
    public mAngularHttp: Http,
    public router: Router
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

  public getUser(): Users {
    return this.mUser;
  }

  public setUser(user: Users) {
    this.mUser = user;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getIP(): string {
    return this.ip;
  }

  public setIP(ip: string) {
    this.ip = ip;
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

  public LoadTitle(languageType: number) {
    this.getApiService().createClient(this.mAngularHttp);
    return new Promise((resolve, reject) => {
      if (this.getAppConfig().hasData()) {
        return resolve();
      } else {
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
      }
    });
  }

  public LoadTitles(languageType: number) {
    return new Promise((resolve, reject) => {
      this.mAngularHttp.request("assets/data/title.json").subscribe(data => {
        let mData = data.json();
        let language;
        if (languageType == LANGUAGE_TYPE.VIETNAMESE)
          language = mData.VI;
        else
          language = mData.EN;

        resolve(language)
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

}
