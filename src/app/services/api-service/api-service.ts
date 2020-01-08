import { HttpClient } from '../core/http/http-client';
import { ParamBuilder } from '../core/http/param-builder';
import { ApiCmd } from './api-service-cmd';

import { Messages } from '../classes/message';

import * as moment from 'moment';

export class ApiService extends HttpClient {
    mUrl: string = "http://192.168.1.129:3002/";
    mClientKey: string = "8c24516c23b611420defccf253598412";
    mSecretKey: string = "";

    mUserID: string = "";

    mDevices: string = "Android Samsung GT|123456";

    public static _instance: ApiService = null;

    constructor() {
        super();
    }

    public setData(data) {
        super.setData(data);
        if (data) {
            if ('http' in data) {
                let http = data['http'];

                this.mUrl = http[http["api_server"]].host;

                this.mClientKey = http["client_key"];

                this.setDebugEnable(http['debug']);
            }
        }
    }

    //1
    public sendRequestUSER_LOGIN(username: string, password: string, token: string, ip: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.USER_LOGIN,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("password", password)
                .addStringIgnoreEmpty("fcmToken", token));
    }


    //2
    public sendRequestGET_LIST_QUICK_CONTACT(ip: string, username: string, userID: number, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_CONTACT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID));
    }


}