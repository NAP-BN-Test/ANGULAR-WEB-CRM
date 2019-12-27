import { HttpClient } from '../core/http/http-client';
import { ParamBuilder } from '../core/http/param-builder';
import { ApiCmd } from './api-service-cmd';

import { Messages } from '../classes/message';

import * as moment from 'moment';

export class ApiService extends HttpClient {
    mUrl: string = "";
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
    public sendRequestGET_LIST_TODO(ip: string, username: string, userID: number, sort: number, page: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_TODO,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("sort", sort)
                .add("page", page));
    }

    //2.1
    public sendRequestGET_LIST_TODO_OF_JOB(ip: string, username: string, userID: number, jobID: number, sort: number, page: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_TODO_OF_JOB,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("jobID", jobID)
                .add("sort", sort)
                .add("page", page));
    }

    //3
    public sendRequestCHANGE_STATUS_TODO(ip: string, username: string, todoID: number, userID: number, status?: string, endDate?: string, alertTime?: string, roomIDAssign?: number, userIDAssign?: number, note?: string): Promise<any> {

        if (endDate)
            endDate = moment(endDate).format("YYYY-MM-DD");

        if (alertTime)
            alertTime = moment(alertTime).format("YYYY-MM-DD HH:mm");

        if (userIDAssign > -1)
            roomIDAssign = -1;

        return this.requestPost(this.mUrl + ApiCmd.CHANGE_STATUS_TODO,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("todoID", todoID)
                .add("userID", userID)
                .addIgnoreNull("status", status)
                .addIgnoreNull("endDate", endDate)
                .addIgnoreNull("alertTime", alertTime)
                .addIgnoreNull("roomIDAssign", roomIDAssign)
                .addIgnoreNull("userIDAssign", userIDAssign)
                .addIgnoreNull("note", note));
    }

    //4
    public sendRequestGET_GENERAL_TODO(ip: string, username: string, userID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_GENERAL_TODO,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID));
    }

    //5
    public sendRequestGET_LIST_DEPARTMENT(ip: string, username: string, ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_DEPARTMENT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username));
    }

    //6
    public sendRequestGET_LIST_USER(ip: string, username: string, roomID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_USER,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("roomID", roomID));
    }

    //7
    public sendRequestGET_LIST_MESSAGE(ip: string, username: string, userID: number, targetID: number, time?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_MESSAGE,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("targetID", targetID)
                .addIgnoreNull("time", time));
    }

    //8
    public sendRequestPUSH_MESSAGE(ip: string, username: string, message: Messages): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.PUSH_MESSAGE,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", message.getSenderID())
                .add("targetID", message.getTargetID())
                .add("roomID", message.getRoomID())
                .add("message", message.getMessage())
                .add("time", message.getTime()));
    }

    //9
    public sendRequestGET_LIST_JOB(ip: string, username: string, userID: number, page: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_JOB,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("page", page));
    }

    //10
    public sendRequestGET_JOB_DETAIL(ip: string, username: string, userID: number, jobID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_JOB_DETAIL,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("jobID", jobID));
    }

    //11
    public sendRequestGET_LIST_REQUEST(ip: string, username: string, userID: number, page: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_REQUEST,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("page", page));
    }

    //12
    public sendRequestGET_REQUEST_DETAIL(ip: string, username: string, userID: number, page: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_REQUEST_DETAIL,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("requestID", page));
    }

    //13
    public sendRequestGET_LIST_OBJECT(ip: string, username: string, type: number, jobID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_OBJECT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("jobID", jobID)
                .add("type", type));
    }

    //13
    public sendRequestGET_LIST_CURRENCY(ip: string, username: string, ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CURRENCY,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username));
    }

    //14
    public sendRequestGET_LIST_CHARGE_UNIT(ip: string, username: string, jobID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CHARGE_UNIT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("jobID", jobID));
    }

    //15
    public sendRequestGET_LIST_QUOTATION(ip: string, username: string, userID: number, page?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUOTATION,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("page", page));
    }

    //16
    public sendRequestADD_QUICK_QUOTATION(ip: string, username: string, userID: number, mObj: any): Promise<any> {
        let listCharge = JSON.stringify(mObj.listCharge).replace("&", "").replace("/", "");

        return this.requestPost(this.mUrl + ApiCmd.ADD_QUICK_QUOTATION,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("sendTo", mObj.sendTo)
                .add("transportType", mObj.transportType)
                .add("route", mObj.fromTo)
                .add("currencyID", mObj.currencyID)
                .add("listCharge", listCharge));
    }

    //17
    public sendRequestADD_QUOTATION(ip: string, username: string, userID: number, jobID: number, mObj: any): Promise<any> {

        let listCharge = JSON.stringify(mObj.listCharge).replace("&", "").replace("/", "");

        return this.requestPost(this.mUrl + ApiCmd.ADD_QUOTATION,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("jobID", jobID)
                .add("sendTo", mObj.sendTo)
                .add("listCharge", listCharge));
    }

    //18
    public sendRequestGET_QUOTATION_DETAIL(ip: string, username: string, quotationID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_QUOTATION_DETAIL,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("quotationID", quotationID));
    }

    //19
    public sendRequestCONFIRM_REQUEST(ip: string, username: string, requestID: number, status): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CONFIRM_REQUEST,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("status", status)
                .add("requestID", requestID));
    }

    //20
    public sendRequestSEND_REQUEST(ip: string, username: string, userID: number, targetID: number, requestID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.SEND_REQUEST,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("targetID", targetID)
                .add("requestID", requestID));
    }

    //21
    public sendRequestADD_REQUEST(ip: string, username: string, userID: number, mObj: any): Promise<any> {

        return this.requestPost(this.mUrl + ApiCmd.ADD_REQUEST,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("jobID", mObj.jobID)
                .add("targetID", mObj.targetID)
                .add("objID", mObj.objID)
                .add("type", mObj.type)
                .add("amount", mObj.amount)
                .add("currencyID", mObj.currencyID)
                .add("note", mObj.note)
                .add("paymentDate", moment(mObj.paymentDate).format("YYYY-MM-DD")));
    }

    //22
    public sendRequestGET_LIST_OBJECT_TYPE(ip: string, username: string, jobID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_OBJECT_TYPE,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("jobID", jobID));
    }

    //23
    public sendRequestDELETE_QUOTATION(ip: string, username: string, quotationID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_QUOTATION,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("quotationID", quotationID));
    }

    //24
    public sendRequestGET_LIST_DEBIT_CREDIT(ip: string, username: string, userID: number, type: number, page: number, timeFrom?: string, timeTo?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_DEBIT_CREDIT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
                .add("type", type)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo));
    }

    //25
    public sendRequestGET_DEBIT_CREDIT_DETAIL(ip: string, username: string, debitCreditID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DEBIT_CREDIT_DETAIL,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("username", username)
                .add("debitCreditID", debitCreditID));
    }


}