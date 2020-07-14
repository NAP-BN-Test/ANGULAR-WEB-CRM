import { HttpClient } from '../core/http/http-client';
import { ParamBuilder } from '../core/http/param-builder';
import { ApiCmd } from './api-service-cmd';

import * as md5 from 'md5';
import { LOCAL_STORAGE_KEY } from '../constant/app-constant';

export class ApiService extends HttpClient {
    // mUrl: string = "http://192.168.1.4:3002/";
    mUrl: string = "http://163.44.192.123:3302/";
    mSecretKey: string = "00a2152372fa8e0e62edbb45dd82831a";

    userID = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO)).id : -1;
    username = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO)).username : "";

    ip = localStorage.getItem(LOCAL_STORAGE_KEY.SERVER_INFO) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.SERVER_INFO)).ip : "";
    dbName = localStorage.getItem(LOCAL_STORAGE_KEY.SERVER_INFO) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.SERVER_INFO)).dbName : "";

    itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;

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

                this.setDebugEnable(http['debug']);
            }
        }
    }

    public setItemPerPage(itemPerPage) {
        super.setData(itemPerPage);
        if (itemPerPage) {
            localStorage.setItem('item-per-page', itemPerPage);
            this.itemPerPage = itemPerPage;
        }
    }

    public setUserInfo(userInfo) {
        super.setData(userInfo);
        if (userInfo) {
            localStorage.setItem(LOCAL_STORAGE_KEY.USER_INFO, JSON.stringify(userInfo));
            this.userID = userInfo.id;
            this.username = userInfo.username;
        }
    }

    public setServerInfo(serverInfo) {
        super.setData(serverInfo);
        if (serverInfo) {
            localStorage.setItem(LOCAL_STORAGE_KEY.SERVER_INFO, JSON.stringify(serverInfo));
            this.ip = serverInfo.ip;
            this.dbName = serverInfo.dbName;
        }
    }


    //1
    public sendRequestUSER_LOGIN(ip: string, dbName: string, username: string, password: string): Promise<any> {
        this.ip = ip;
        this.dbName = dbName;

        return this.requestPost(this.mUrl + ApiCmd.USER_LOGIN,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", username)
                .add("password", password));
    }


    //2
    public sendRequestGET_LIST_QUICK_CONTACT(companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID));
    }

    //3
    public sendRequestGET_LIST_COMPANY(


        page: number,
        companyType: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number,
        stageID: number,
        cityID: number,
        logistic?: any,
        transport?: any
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind)
                .addIgnoreNull("stageID", stageID)
                .addIgnoreNull("cityID", cityID)
                .addIgnoreNull("logistic", logistic)
                .addIgnoreNull("transport", transport)
                .add("companyType", companyType));
    }

    //4
    public sendRequestGET_DETAIL_COMPANY(companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DETAIL_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID));
    }

    //5
    public sendRequestGET_LIST_QUICK_COMPANY(companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID));
    }

    //6
    public sendRequestGET_LIST_QUICK_DEAL(companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_DEAL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("companyID", companyID));
    }

    //7
    public sendRequestGET_LIST_ACTIVITY(companyID: string, activityType: number, attendID?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_ACTIVITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("companyID", companyID)
                .add("activityType", activityType)
                .add("attendID", attendID ? attendID : -1));
    }

    //8
    public sendRequestGET_LIST_CONTACT(companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("companyID", companyID));
    }

    //9
    public sendRequestGET_LIST_CONTACT_FULL(


        page: number,
        contactType: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CONTACT_FULL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind)
                .add("contactType", contactType));
    }

    //10
    public sendRequestUPDATE_ACTIVITY(

        activity: any,
        contactID?: number,
        activityState?: number,
        timeStart?: string,
        duration?: number,
        listAttendID?: string,
        description?: string,
        assignID?: number,
        taskType?: number,
        taskName?: string,
        timeAssign?: string
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_ACTIVITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("activityID", activity.id)
                .add("activityType", activity.activityType)
                .addIgnoreNull("activityState", activityState)
                .addIgnoreNull("contactID", contactID)
                .addIgnoreNull("timeStart", timeStart)
                .addIgnoreNull("duration", duration)
                .addIgnoreNull("listAttendID", listAttendID)
                .addIgnoreNull("description", description)
                .addIgnoreNull("assignID", assignID)
                .addIgnoreNull("taskType", taskType)
                .addIgnoreNull("taskName", taskName)
                .addIgnoreNull("timeAssign", timeAssign));
    }

    //11
    public sendRequestGET_LIST_MEET_ATTEND(meetID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_MEET_ATTEND,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("meetID", meetID));
    }

    //12
    public sendRequestGET_LIST_USER(all?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_USER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .addIgnoreNull("all", all));
    }

    //13
    public sendRequestCREATE_NOTE(companyID: string, contactID: string, description: string, listAssociate: any, timeRemind: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_NOTE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("description", description)
                .add("listAssociate", JSON.stringify(listAssociate))
                .addIgnoreNull("timeRemind", timeRemind));
    }

    //14
    public sendRequestGET_NOTE_ASSOCIATE(noteID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_NOTE_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("noteID", noteID));
    }

    //15
    public sendRequestUPDATE_NOTE_ASSOCIATE(contactID: number, noteID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_NOTE_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID)
                .add("noteID", noteID)
                .add("state", state));
    }

    //17
    public sendRequestCREATE_CALL(
        companyID: string, contactID: number, outcomeType: number, timeStart: string, timeRemind: string, description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_CALL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("outcomeType", outcomeType)
                .add("timeStart", timeStart)
                .addIgnoreNull("timeRemind", timeRemind)
                .add("listAssociate", JSON.stringify(listAssociate))
                .add("description", description));
    }

    //18
    public sendRequestADD_COMMENT(userName: string, activity: any, content: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_COMMENT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("userName", userName)
                .add("content", content)
                .add("activityID", activity.id)
                .add("activityType", activity.activityType));
    }

    //19
    public sendRequestEDIT_COMMENT(activity: any, cmtID: number, content: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.EDIT_COMMENT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("cmtID", cmtID)
                .add("content", content)
                .add("activityType", activity.activityType));
    }

    //20
    public sendRequestDELETE_COMMENT(activity: any, cmtID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_COMMENT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("cmtID", cmtID)
                .add("activityType", activity.activityType));
    }

    //21
    public sendRequestCREATE_EMAIL(
        companyID: string, contactID: number, outcomeType: number, timeStart: string, timeRemind: string, description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_EMAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("outcomeType", outcomeType)
                .add("timeStart", timeStart)
                .addIgnoreNull("timeRemind", timeRemind)
                .add("listAssociate", JSON.stringify(listAssociate))
                .add("description", description));
    }

    //22
    public sendRequestUPDATE_MEET_ATTEND(meetID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_MEET_ATTEND,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("meetID", meetID)
                .add("state", state));
    }

    //23
    public sendRequestCREATE_MEET(
        companyID: string, contactID: string,
        listAttendID: any, duration: number, timeStart: string, timeRemind: string, description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_MEET,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("listAttendID", JSON.stringify(listAttendID))
                .add("duration", duration)
                .add("timeStart", timeStart)
                .addIgnoreNull("timeRemind", timeRemind)
                .add("listAssociate", JSON.stringify(listAssociate))
                .add("description", description));
    }

    //24
    public sendRequestCREATE_TASK(
        companyID: string, contactID: string,
        assignID: number, taskType: number, taskName: string,
        timeStart: string, timeAssign: string, timeRemind: string,
        description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_TASK,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("assignID", assignID)
                .add("taskType", taskType)
                .add("taskName", taskName)
                .add("timeStart", timeStart)
                .add("timeAssign", timeAssign)
                .addIgnoreNull("timeRemind", timeRemind)
                .add("listAssociate", JSON.stringify(listAssociate))
                .add("description", description));
    }

    //25
    public sendRequestADD_CONTACT(companyID: string, contact: any, addOut: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID)
                .add("name", contact.name)
                .add("gender", contact.gender)
                .add("jobTile", contact.jobTile)
                .add("phone", contact.phone)
                .add("email", contact.email)
                .add("address", contact.address)
                .addIgnoreNull("addOut", addOut));
    }

    //26
    public sendRequestADD_CONTACT_BY_ID(companyID: string, contactID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CONTACT_BY_ID,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID)
                .add("contactID", contactID));
    }

    //27
    public sendRequestSEARCH_CONTACT(searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.SEARCH_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("searchKey", searchKey));
    }

    //28
    public sendRequestUPDATE_COMPANY(

        companyID: string,
        companyName?: string,
        companyShortName?: string,
        companyAddress?: string,
        companyPhone?: string,
        companyEmail?: string,
        companyCity?: string,
        website?: string,
        stageID?: string,
        timeActive?: string
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("companyID", companyID)
                .addIgnoreNull("companyName", companyName)
                .addIgnoreNull("companyShortName", companyShortName)
                .addIgnoreNull("companyAddress", companyAddress)
                .addIgnoreNull("companyPhone", companyPhone)
                .addIgnoreNull("companyEmail", companyEmail)
                .addIgnoreNull("companyCity", companyCity)
                .addIgnoreNull("website", website)
                .addIgnoreNull("stageID", stageID)
                .addIgnoreNull("timeActive", timeActive));
    }

    //29
    public sendRequestGET_CALL_ASSOCIATE(callID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_CALL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("callID", callID));
    }

    //30
    public sendRequestUPDATE_CALL_ASSOCIATE(contactID: number, callID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CALL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID)
                .add("callID", callID)
                .add("state", state));
    }

    //31
    public sendRequestGET_EMAIL_ASSOCIATE(emailID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_EMAIL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("emailID", emailID));
    }

    //32
    public sendRequestUPDATE_EMAIL_ASSOCIATE(contactID: number, emailID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_EMAIL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID)
                .add("emailID", emailID)
                .add("state", state));
    }

    //33
    public sendRequestGET_MEET_ASSOCIATE(meetID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_MEET_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("meetID", meetID));
    }

    //34
    public sendRequestUPDATE_MEET_ASSOCIATE(contactID: number, meetID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_MEET_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID)
                .add("meetID", meetID)
                .add("state", state));
    }

    //35
    public sendRequestGET_TASK_ASSOCIATE(taskID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_TASK_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("taskID", taskID));
    }

    //36
    public sendRequestUPDATE_TASK_ASSOCIATE(contactID: number, taskID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_TASK_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID)
                .add("taskID", taskID)
                .add("state", state));
    }

    //37
    public sendRequestSEARCH_COMPANY(companyID: string, searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.SEARCH_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID)
                .add("searchKey", searchKey));
    }

    //38
    public sendRequestADD_COMPANY(companyID: string, company: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID)
                .add("name", company.name)
                .add("shortName", company.shortName)
                .add("phone", company.phone)
                .add("email", company.email)
                .add("address", company.address)
                .add("cityID", company.cityID)
                .add("cityName", company.cityName)
                .add("role", company.role));
    }

    //39
    public sendRequestADD_PARENT_COMPANY_BY_ID(companyID: string, companyAddID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_PARENT_COMPANY_BY_ID,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID)
                .add("companyAddID", companyAddID));
    }

    //40
    public sendRequestADD_CHILD_COMPANY_BY_ID(companyID: string, companyAddID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CHILD_COMPANY_BY_ID,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID)
                .add("companyAddID", companyAddID));
    }

    //41
    public sendRequestGET_DEAL_STAGE(): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DEAL_STAGE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID));
    }

    //41
    public sendRequestADD_DEAL(deal: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_DEAL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .addIgnoreNull("companyID", deal.companyID)
                .add("contactID", deal.contactID)
                .add("name", deal.name)
                .add("stageID", deal.stageID)
                .add("timeClose", deal.timeClose)
                .add("timeRemind", deal.timeRemind)
                .add("amount", deal.amount));
    }

    //42
    public sendRequestGET_DETAIL_CONTACT(contactID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DETAIL_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("contactID", contactID));
    }

    //43
    public sendRequestGET_LIST_ACTIVITY_FOR_CONTACT(contactID: string, activityType: number, activityID?: number, attendID?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_ACTIVITY_FOR_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID)
                .add("activityType", activityType)
                .addIgnoreNull("activityID", activityID)
                .add("attendID", attendID ? attendID : -1));
    }

    //44
    public sendRequestGET_LIST_QUICK_DEAL_FOR_CONTACT(contactID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_DEAL_FOR_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID));
    }

    //45
    public sendRequestUPDATE_CONTACT(contactID: string,
        contactName?: string, contactAddress?: string, contactPhone?: string, contactEmail?: string, contactJobTile?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("contactID", contactID)
                .addIgnoreNull("contactName", contactName)
                .addIgnoreNull("contactAddress", contactAddress)
                .addIgnoreNull("contactPhone", contactPhone)
                .addIgnoreNull("contactEmail", contactEmail)
                .addIgnoreNull("contactJobTile", contactJobTile));
    }

    //46
    public sendRequestASSIGN_COMPANY_OWNER(assignID: number, companyIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ASSIGN_COMPANY_OWNER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("assignID", assignID)
                .add("companyIDs", companyIDs));
    }

    //47
    public sendRequestASSIGN_CONTACT_OWNER(assignID: number, contactIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ASSIGN_CONTACT_OWNER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("assignID", assignID)
                .add("contactIDs", contactIDs));
    }

    //47
    public sendRequestDELETE_CONTACT(contactIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("contactIDs", contactIDs));
    }

    //48
    public sendRequestFOLLOW_COMPANY(companyID: string, follow: boolean): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.FOLLOW_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyID", companyID)
                .addIgnoreNull("follow", follow));
    }

    //49
    public sendRequestFOLLOW_CONTACT(contactID: string, follow: boolean): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.FOLLOW_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("contactID", contactID)
                .addIgnoreNull("follow", follow));
    }

    //50
    public sendRequestDELETE_COMPANY(companyIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("companyIDs", companyIDs));
    }

    //51
    public sendRequestGET_LIST_TASK(


        page: number,
        menuType: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number,
        timeType: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_TASK,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //52
    public sendRequestUPDATE_TASK(taskIDs: string, status: boolean): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_TASK,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("taskIDs", taskIDs)
                .addIgnoreNull("status", status));
    }

    //53
    public sendRequestDELETE_CONTACT_FROM_COMPANY(contactID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CONTACT_FROM_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("contactID", contactID));
    }

    //54
    public sendRequestDELETE_COMPANY_FROM_COMPANY(role: number, companyID: string, companyIDRemove: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_COMPANY_FROM_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("role", role)
                .add("companyID", companyID)
                .add("companyIDRemove", companyIDRemove));
    }

    //55
    public sendRequestDELETE_DEAL_FROM_COMPANY(dealID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_DEAL_FROM_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("dealID", dealID));
    }

    //56
    public sendRequestUPDATE_DEAL(dealID: number, stageID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_DEAL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("dealID", dealID)
                .addIgnoreNull("stageID", stageID));
    }

    //57
    public sendRequestGET_LIST_CALL(


        page: number,
        menuType: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number,
        timeType: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CALL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //58
    public sendRequestDELETE_CALL(activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CALL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("activityIDs", activityIDs));
    }

    //59
    public sendRequestGET_LIST_EMAIL(


        page: number,
        menuType: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number,
        timeType: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_EMAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //60
    public sendRequestDELETE_EMAIL(activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_EMAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("activityIDs", activityIDs));
    }

    //61
    public sendRequestGET_LIST_MEET(


        page: number,
        menuType: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number,
        timeType: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_MEET,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //62
    public sendRequestDELETE_MEET(activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_MEET,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("activityIDs", activityIDs));
    }

    //63
    public sendRequestGET_LIST_NOTE(


        page: number,
        menuType: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number,
        timeType: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_NOTE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //16
    public sendRequestDELETE_NOTE(activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_NOTE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("activityIDs", activityIDs));
    }

    //64
    public sendRequestGET_SUMMARY_INFO(): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_SUMMARY_INFO,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID));
    }

    //65
    public sendRequestGET_LIST_CITY(): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID));
    }

    //66
    public sendRequestDELETE_TASK(activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_TASK,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("activityIDs", activityIDs));
    }

    //==============================
    public sendRequestADD_USER(userReg: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_USER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("username", this.username)
                .add("userID", this.userID)
                .add("regName", userReg.name)
                .add("regUsername", userReg.username)
                .add("regPhone", userReg.phone)
                .add("regEmail", userReg.email)
                .add("regPassword", md5(userReg.password)));
    }

    //==============================
    public sendRequestGET_CATEGORY_LIST_USER(searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_CATEGORY_LIST_USER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("searchKey", searchKey));
    }

    //==============================
    public sendRequestDELETE_USER(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_USER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }

    //==============================
    public sendRequestGET_MAIL_LIST(


        page: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_MAIL_LIST,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage));
    }

    //==============================
    public sendRequestGET_MAIL_LIST_DETAIL(


        mailListID: number,
        page: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_MAIL_LIST_DETAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)
                .add("mailListID", mailListID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage));
    }

    //==============================
    public sendRequestGET_LIST_MAIL_CAMPAIN(


        page: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_MAIL_CAMPAIN,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage));
    }

    //==============================
    public sendRequestGET_LIST_REPORT_BY_CAMPAIN(


        page: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind?: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_REPORT_BY_CAMPAIN,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //==============================
    public sendRequestGET_LIST_REPORT_BY_MAILLIST(


        page: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind?: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_REPORT_BY_MAILLIST,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)
                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //==============================
    public sendRequestGET_REPORT_BY_CAMPAIN_SUMMARY(campainID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_REPORT_BY_CAMPAIN_SUMMARY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("campainID", campainID));
    }

    //==============================
    public sendRequestGET_REPORT_BY_MAILLIST_SUMMARY(mailListID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_REPORT_BY_MAILLIST_SUMMARY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("mailListID", mailListID));
    }

    //==============================
    public sendRequestGET_REPORT_BY_CAMPAIN_MAIL_TYPE(campainID: number, mailType, timeType: number, timeFrom?: string, timeTo?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_REPORT_BY_CAMPAIN_MAIL_TYPE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("campainID", campainID)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .add("timeType", timeType)
                .add("mailType", mailType));
    }

    //==============================
    public sendRequestGET_REPORT_BY_MAILLIST_TYPE(mailListID: number, mailType, timeType: number, timeFrom?: string, timeTo?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_REPORT_BY_MAILLIST_TYPE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("mailListID", mailListID)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .add("timeType", timeType)
                .add("mailType", mailType));
    }

    //==============================
    public sendRequestGET_REPORT_BY_USER_SUMMARY(): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_REPORT_BY_USER_SUMMARY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID));
    }

    //==============================
    public sendRequestGET_REPORT_BY_USER_MAIL_TYPE(mailType, timeType: number, timeFrom?: string, timeTo?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_REPORT_BY_USER_MAIL_TYPE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .add("timeType", timeType)
                .add("mailType", mailType));
    }

    //==============================
    public sendRequestGET_MAIL_LIST_OPTION(): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_MAIL_LIST_OPTION,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID));
    }

    //==============================
    public sendRequestADD_MAIL_CAMPAIN(obj: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_MAIL_CAMPAIN,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("userID", this.userID)
                .add("name", obj.name)
                .add("subject", obj.subject)
                .add("mailListID", obj.mailListID));
    }

    //==============================
    public sendRequestADD_MAIL_LIST(obj: any, listMail?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_MAIL_LIST,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("userID", this.userID)
                .add("name", obj.name)
                .addIgnoreNull("listMail", listMail));
    }

    //==============================
    public sendRequestDELETE_MAIL_LIST(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_MAIL_LIST,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }

    //==============================
    public sendRequestDELETE_MAIL_LIST_DETAIL(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_MAIL_LIST_DETAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }

    //==============================
    public sendRequestADD_MAIL_LIST_DETAIL(mailListID: number, listMail: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_MAIL_LIST_DETAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("userID", this.userID)
                .add("mailListID", mailListID)
                .add("listMail", listMail));
    }

    //==============================
    public sendRequestDELETE_MAIL_CAMPAIN(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_MAIL_CAMPAIN,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }

    //==============================
    public sendRequestUPLOAD_FILE(uri: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPLOAD_FILE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("uri", uri));
    }

    //==============================
    public sendRequestGET_MAIL_CAMPAIN_DETAIL(campainID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_MAIL_CAMPAIN_DETAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("campainID", campainID));
    }

    //==============================
    public sendRequestUPDATE_MAIL_CAMPAIN(obj: any): Promise<any> {
        let body = obj.body.replace(/&/g, "%26");
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_MAIL_CAMPAIN,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("campainID", obj.id)
                .add("subject", obj.subject)
                // .add("startTime", obj.startTime)
                // .add("endTime", obj.endTime)
                .add("body", body)
                .add("mailListID", obj.mailListID)
                .add("name", obj.name));
    }

    //==============================
    public sendRequestADD_MAIL_SEND(obj: any, isTestMail?: boolean): Promise<any> {
        let body = obj.body.replace(/&/g, '%26');
        return this.requestPost(this.mUrl + ApiCmd.ADD_MAIL_SEND,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("campainID", obj.id)
                .add("subject", obj.subject)
                .add("body", body)
                .add("mailListID", obj.mailListID)
                .add("myMail", obj.myMail)
                .addIgnoreNull("isTestMail", isTestMail));
    }

    //==============================
    public sendRequestCHECK_VERIFY_EMAIL(email: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CHECK_VERIFY_EMAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("email", email));
    }

    //==============================
    public sendRequestVERIFY_EMAIL(email: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.VERIFY_EMAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("email", email));
    }

    //==============================
    public sendRequestREPORT_MAIL_DETAIL(

        page: number,
        searchKey: string,
        timeFrom: string,
        timeTo: string,
        userIDFind: number,
        email: string
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.REPORT_MAIL_DETAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("page", page)
                .add("itemPerPage", this.itemPerPage)
                .add("email", email));
    }

    //==============================
    public sendRequestIMPORT_DATA(dataJson: string): Promise<any> {
        let dataJ = dataJson.replace(/&/g, "%26");

        return this.requestPost(this.mUrl + ApiCmd.IMPORT_DATA,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("dataJson", dataJ));
    }

    //==============================
    public sendRequestGET_CATEGORY_CITY(page: number, searchKey: string): Promise<any> {
        let mSearchKey = searchKey != "" ? searchKey : null;

        return this.requestPost(this.mUrl + ApiCmd.GET_CATEGORY_CITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("page", page)
                .addIgnoreNull("searchKey", mSearchKey)
                .add("itemPerPage", this.itemPerPage));
    }

    //==============================
    public sendRequestADD_CATEGORY_CITY(obj: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CATEGORY_CITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name)
                .add("countryID", obj.countryID)
                .add("code", obj.code));
    }

    //==============================
    public sendRequestUPDATE_CATEGORY_CITY(obj: any, cityID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CATEGORY_CITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("cityID", cityID)
                .add("name", obj.name)
                .add("countryID", obj.countryID)
                .add("code", obj.code));
    }

    //==============================
    public sendRequestDELETE_CATEGORY_CITY(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CATEGORY_CITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }

    //==============================
    public sendRequestGET_ALL_CATEGORY_COUNTRY(): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_ALL_CATEGORY_COUNTRY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID));
    }

    //==============================
    public sendRequestGET_CATEGORY_COUNTRY(page: number, searchKey: string): Promise<any> {
        let mSearchKey = searchKey != "" ? searchKey : null;

        return this.requestPost(this.mUrl + ApiCmd.GET_CATEGORY_COUNTRY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("page", page)
                .addIgnoreNull("searchKey", mSearchKey)
                .add("itemPerPage", this.itemPerPage));
    }

    //==============================
    public sendRequestADD_CATEGORY_COUNTRY(obj: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CATEGORY_COUNTRY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name)
                .add("code", obj.code));
    }

    //==============================
    public sendRequestUPDATE_CATEGORY_COUNTRY(obj: any, countryID): Promise<any> {

        console.log(countryID);

        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CATEGORY_COUNTRY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("countryID", countryID)
                .add("name", obj.name)
                .add("code", obj.code));
    }

    //==============================
    public sendRequestDELETE_CATEGORY_COUNTRY(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CATEGORY_COUNTRY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }


    //==============================
    public sendRequestGET_CATEGORY_STEP(page: number, searchKey: string): Promise<any> {
        let mSearchKey = searchKey != "" ? searchKey : null;

        return this.requestPost(this.mUrl + ApiCmd.GET_CATEGORY_STEP,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("page", page)
                .addIgnoreNull("searchKey", mSearchKey)
                .add("itemPerPage", this.itemPerPage));
    }

    //==============================
    public sendRequestADD_CATEGORY_STEP(obj: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CATEGORY_STEP,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name)
                .add("process", obj.process)
                .add("stage", obj.stage));
    }

    //==============================
    public sendRequestUPDATE_CATEGORY_STEP(obj: any, stepID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CATEGORY_STEP,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("stepID", stepID)
                .add("name", obj.name)
                .add("process", obj.process)
                .add("stage", obj.stage));
    }

    //==============================
    public sendRequestDELETE_CATEGORY_STEP(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CATEGORY_STEP,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }

    //==============================
    public sendRequestADD_HISTORY(name: string, router: string, param: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_HISTORY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", name)
                .add("router", router)
                .add("param", param));
    }

    //==============================
    public sendRequestGET_HISTORY(searchKey: string, timeSelect): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_HISTORY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("searchKey", searchKey)
                .add("timeSelect", timeSelect));
    }

    //==============================
    public sendRequestDELETE_HISTORY(historyID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_HISTORY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("historyID", historyID));
    }


    //==============================
    public sendRequestGET_CATEGORY_JOB_TILE(searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_CATEGORY_JOB_TILE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("searchKey", searchKey));
    }

    //==============================
    public sendRequestADD_CATEGORY_JOB_TILE(obj: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CATEGORY_JOB_TILE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name));
    }

    //==============================
    public sendRequestUPDATE_CATEGORY_JOB_TILE(obj: any, categoryID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CATEGORY_JOB_TILE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name)
                .add("categoryID", categoryID));
    }

    //==============================
    public sendRequestDELETE_CATEGORY_JOB_TILE(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CATEGORY_JOB_TILE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }


    //==============================
    public sendRequestGET_CATEGORY_MAIL_OUTCOME(searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_CATEGORY_MAIL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("searchKey", searchKey));
    }

    //==============================
    public sendRequestADD_CATEGORY_MAIL_OUTCOME(obj: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CATEGORY_MAIL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name));
    }

    //==============================
    public sendRequestUPDATE_CATEGORY_MAIL_OUTCOME(obj: any, categoryID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CATEGORY_MAIL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name)
                .add("categoryID", categoryID));
    }

    //==============================
    public sendRequestDELETE_CATEGORY_MAIL_OUTCOME(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CATEGORY_MAIL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }


    //==============================
    public sendRequestGET_CATEGORY_CALL_OUTCOME(searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_CATEGORY_CALL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("searchKey", searchKey));
    }

    //==============================
    public sendRequestADD_CATEGORY_CALL_OUTCOME(obj: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CATEGORY_CALL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name));
    }

    //==============================
    public sendRequestUPDATE_CATEGORY_CALL_OUTCOME(obj: any, categoryID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CATEGORY_CALL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)
                .add("userID", this.userID)

                .add("name", obj.name)
                .add("categoryID", categoryID));
    }

    //==============================
    public sendRequestDELETE_CATEGORY_CALL_OUTCOME(listID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CATEGORY_CALL_OUTCOME,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("secretKey", this.mSecretKey)

                .add("listID", listID));
    }
}