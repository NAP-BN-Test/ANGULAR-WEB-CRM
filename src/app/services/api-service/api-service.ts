import { HttpClient } from '../core/http/http-client';
import { ParamBuilder } from '../core/http/param-builder';
import { ApiCmd } from './api-service-cmd';

export class ApiService extends HttpClient {
    // mUrl: string = "http://192.168.1.10:3002/";
    mUrl: string = "http://163.44.192.123:3302/";
    mClientKey: string = "8c24516c23b611420defccf253598412";
    mSecretKey: string = "";

    mUserID: string = "";

    mDevices: string = "Android Samsung GT|123456";

    ip = localStorage.getItem('server-info') ? JSON.parse(localStorage.getItem('server-info')).ip : "";
    dbName = localStorage.getItem('server-info') ? JSON.parse(localStorage.getItem('server-info')).dbName : "";

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
    public sendRequestUSER_LOGIN(ip: string, dbName: string, username: string, password: string): Promise<any> {
        this.ip = ip;
        this.dbName = dbName;

        return this.requestPost(this.mUrl + ApiCmd.USER_LOGIN,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("password", password));
    }


    //2
    public sendRequestGET_LIST_QUICK_CONTACT(username: string, userID: number, companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID));
    }

    //3
    public sendRequestGET_LIST_COMPANY(
        username: string,
        userID: number,
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
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
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
    public sendRequestGET_DETAIL_COMPANY(username: string, userID: number, companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DETAIL_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID));
    }

    //5
    public sendRequestGET_LIST_QUICK_COMPANY(username: string, userID: number, companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID));
    }

    //6
    public sendRequestGET_LIST_QUICK_DEAL(username: string, companyID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_DEAL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("companyID", companyID));
    }

    //7
    public sendRequestGET_LIST_ACTIVITY(username: string, companyID: string, activityType: number, attendID?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_ACTIVITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("companyID", companyID)
                .add("activityType", activityType)
                .add("attendID", attendID ? attendID : -1));
    }

    //8
    public sendRequestGET_LIST_CONTACT(username: string, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("companyID", companyID));
    }

    //9
    public sendRequestGET_LIST_CONTACT_FULL(
        username: string,
        userID: number,
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
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind)
                .add("contactType", contactType));
    }

    //10
    public sendRequestUPDATE_ACTIVITY(
        username: string,
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
                .add("username", username)
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
    public sendRequestGET_LIST_MEET_ATTEND(username: string, meetID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_MEET_ATTEND,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("meetID", meetID));
    }

    //12
    public sendRequestGET_LIST_USER(username: string, userID: number, all?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_USER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .addIgnoreNull("all", all));
    }

    //13
    public sendRequestCREATE_NOTE(username: string, userID: number, companyID: string, contactID: string, description: string, listAssociate: any, timeRemind: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_NOTE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("description", description)
                .add("listAssociate", JSON.stringify(listAssociate))
                .addIgnoreNull("timeRemind", timeRemind));
    }

    //14
    public sendRequestGET_NOTE_ASSOCIATE(username: string, noteID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_NOTE_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("noteID", noteID));
    }

    //15
    public sendRequestUPDATE_NOTE_ASSOCIATE(username: string, contactID: number, noteID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_NOTE_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID)
                .add("noteID", noteID)
                .add("state", state));
    }

    //17
    public sendRequestCREATE_CALL(username: string, userID: number,
        companyID: string, contactID: number, outcomeType: number, timeStart: string, timeRemind: string, description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_CALL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("outcomeType", outcomeType)
                .add("timeStart", timeStart)
                .addIgnoreNull("timeRemind", timeRemind)
                .add("listAssociate", JSON.stringify(listAssociate))
                .add("description", description));
    }

    //18
    public sendRequestADD_COMMENT(username: string, userID: number, userName: string, activity: any, content: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_COMMENT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("userName", userName)
                .add("content", content)
                .add("activityID", activity.id)
                .add("activityType", activity.activityType));
    }

    //19
    public sendRequestEDIT_COMMENT(username: string, userID: number, activity: any, cmtID: number, content: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.EDIT_COMMENT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("cmtID", cmtID)
                .add("content", content)
                .add("activityType", activity.activityType));
    }

    //20
    public sendRequestDELETE_COMMENT(username: string, userID: number, activity: any, cmtID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_COMMENT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("cmtID", cmtID)
                .add("activityType", activity.activityType));
    }

    //21
    public sendRequestCREATE_EMAIL(username: string, userID: number,
        companyID: string, contactID: number, outcomeType: number, timeStart: string, timeRemind: string, description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_EMAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .addIgnoreNull("companyID", companyID)
                .addIgnoreNull("contactID", contactID)
                .add("outcomeType", outcomeType)
                .add("timeStart", timeStart)
                .addIgnoreNull("timeRemind", timeRemind)
                .add("listAssociate", JSON.stringify(listAssociate))
                .add("description", description));
    }

    //22
    public sendRequestUPDATE_MEET_ATTEND(username: string, userID: number, meetID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_MEET_ATTEND,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("meetID", meetID)
                .add("state", state));
    }

    //23
    public sendRequestCREATE_MEET(username: string, userID: number,
        companyID: string, contactID: string,
        listAttendID: any, duration: number, timeStart: string, timeRemind: string, description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_MEET,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
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
    public sendRequestCREATE_TASK(username: string, userID: number,
        companyID: string, contactID: string,
        assignID: number, taskType: number, taskName: string,
        timeStart: string, timeAssign: string, timeRemind: string,
        description: string, listAssociate: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_TASK,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
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
    public sendRequestADD_CONTACT(username: string, userID: number, companyID: string, contact: any, addOut: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
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
    public sendRequestADD_CONTACT_BY_ID(username: string, userID: number, companyID: string, contactID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CONTACT_BY_ID,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID)
                .add("contactID", contactID));
    }

    //27
    public sendRequestSEARCH_CONTACT(username: string, userID: number, searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.SEARCH_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("searchKey", searchKey));
    }

    //28
    public sendRequestUPDATE_COMPANY(
        username: string,
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
                .add("username", username)
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
    public sendRequestGET_CALL_ASSOCIATE(username: string, callID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_CALL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("callID", callID));
    }

    //30
    public sendRequestUPDATE_CALL_ASSOCIATE(username: string, contactID: number, callID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CALL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID)
                .add("callID", callID)
                .add("state", state));
    }

    //31
    public sendRequestGET_EMAIL_ASSOCIATE(username: string, emailID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_EMAIL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("emailID", emailID));
    }

    //32
    public sendRequestUPDATE_EMAIL_ASSOCIATE(username: string, contactID: number, emailID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_EMAIL_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID)
                .add("emailID", emailID)
                .add("state", state));
    }

    //33
    public sendRequestGET_MEET_ASSOCIATE(username: string, meetID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_MEET_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("meetID", meetID));
    }

    //34
    public sendRequestUPDATE_MEET_ASSOCIATE(username: string, contactID: number, meetID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_MEET_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID)
                .add("meetID", meetID)
                .add("state", state));
    }

    //35
    public sendRequestGET_TASK_ASSOCIATE(username: string, taskID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_TASK_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("taskID", taskID));
    }

    //36
    public sendRequestUPDATE_TASK_ASSOCIATE(username: string, contactID: number, taskID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_TASK_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID)
                .add("taskID", taskID)
                .add("state", state));
    }

    //37
    public sendRequestSEARCH_COMPANY(username: string, userID: number, companyID: string, searchKey: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.SEARCH_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID)
                .add("searchKey", searchKey));
    }

    //38
    public sendRequestADD_COMPANY(username: string, userID: number, companyID: string, company: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
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
    public sendRequestADD_PARENT_COMPANY_BY_ID(username: string, userID: number, companyID: string, companyAddID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_PARENT_COMPANY_BY_ID,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID)
                .add("companyAddID", companyAddID));
    }

    //40
    public sendRequestADD_CHILD_COMPANY_BY_ID(username: string, userID: number, companyID: string, companyAddID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_CHILD_COMPANY_BY_ID,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID)
                .add("companyAddID", companyAddID));
    }

    //41
    public sendRequestGET_DEAL_STAGE(username: string, userID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DEAL_STAGE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID));
    }

    //41
    public sendRequestADD_DEAL(username: string, userID: number, deal: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_DEAL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .addIgnoreNull("companyID", deal.companyID)
                .add("contactID", deal.contactID)
                .add("name", deal.name)
                .add("stageID", deal.stageID)
                .add("timeClose", deal.timeClose)
                .add("timeRemind", deal.timeRemind)
                .add("amount", deal.amount));
    }

    //42
    public sendRequestGET_DETAIL_CONTACT(username: string, userID: string, contactID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DETAIL_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("contactID", contactID));
    }

    //43
    public sendRequestGET_LIST_ACTIVITY_FOR_CONTACT(username: string, contactID: string, activityType: number, attendID?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_ACTIVITY_FOR_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID)
                .add("activityType", activityType)
                .add("attendID", attendID ? attendID : -1));
    }

    //44
    public sendRequestGET_LIST_QUICK_DEAL_FOR_CONTACT(username: string, contactID: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_DEAL_FOR_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID));
    }

    //45
    public sendRequestUPDATE_CONTACT(username: string, contactID: string,
        contactName?: string, contactAddress?: string, contactPhone?: string, contactEmail?: string, contactJobTile?: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("contactID", contactID)
                .addIgnoreNull("contactName", contactName)
                .addIgnoreNull("contactAddress", contactAddress)
                .addIgnoreNull("contactPhone", contactPhone)
                .addIgnoreNull("contactEmail", contactEmail)
                .addIgnoreNull("contactJobTile", contactJobTile));
    }

    //46
    public sendRequestASSIGN_COMPANY_OWNER(username: string, userID: number, assignID: number, companyIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ASSIGN_COMPANY_OWNER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("assignID", assignID)
                .add("companyIDs", companyIDs));
    }

    //47
    public sendRequestASSIGN_CONTACT_OWNER(username: string, userID: number, assignID: number, contactIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ASSIGN_CONTACT_OWNER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("assignID", assignID)
                .add("contactIDs", contactIDs));
    }

    //47
    public sendRequestDELETE_CONTACT(username: string, userID: number, contactIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("contactIDs", contactIDs));
    }

    //48
    public sendRequestFOLLOW_COMPANY(username: string, userID: number, companyID: string, follow: boolean): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.FOLLOW_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID)
                .addIgnoreNull("follow", follow));
    }

    //49
    public sendRequestFOLLOW_CONTACT(username: string, userID: number, contactID: string, follow: boolean): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.FOLLOW_CONTACT,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("contactID", contactID)
                .addIgnoreNull("follow", follow));
    }

    //50
    public sendRequestDELETE_COMPANY(username: string, userID: number, companyIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyIDs", companyIDs));
    }

    //51
    public sendRequestGET_LIST_TASK(
        username: string,
        userID: number,
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
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //52
    public sendRequestUPDATE_TASK(username: string, userID: number, taskIDs: string, status: boolean): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_TASK,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("taskIDs", taskIDs)
                .addIgnoreNull("status", status));
    }

    //53
    public sendRequestDELETE_CONTACT_FROM_COMPANY(username: string, userID: number, contactID): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CONTACT_FROM_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("contactID", contactID));
    }

    //54
    public sendRequestDELETE_COMPANY_FROM_COMPANY(username: string, userID: number, role: number, companyID: string, companyIDRemove: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_COMPANY_FROM_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("role", role)
                .add("companyID", companyID)
                .add("companyIDRemove", companyIDRemove));
    }

    //55
    public sendRequestDELETE_DEAL_FROM_COMPANY(username: string, userID: number, dealID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_DEAL_FROM_COMPANY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("dealID", dealID));
    }

    //56
    public sendRequestUPDATE_DEAL(username: string, userID: number, dealID: number, stageID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_DEAL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("dealID", dealID)
                .addIgnoreNull("stageID", stageID));
    }

    //57
    public sendRequestGET_LIST_CALL(
        username: string,
        userID: number,
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
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //58
    public sendRequestDELETE_CALL(username: string, userID: number, activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_CALL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("activityIDs", activityIDs));
    }

    //59
    public sendRequestGET_LIST_EMAIL(
        username: string,
        userID: number,
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
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //60
    public sendRequestDELETE_EMAIL(username: string, userID: number, activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_EMAIL,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("activityIDs", activityIDs));
    }

    //61
    public sendRequestGET_LIST_MEET(
        username: string,
        userID: number,
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
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //62
    public sendRequestDELETE_MEET(username: string, userID: number, activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_MEET,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("activityIDs", activityIDs));
    }

    //63
    public sendRequestGET_LIST_NOTE(
        username: string,
        userID: number,
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
                .add("username", username)
                .add("userID", userID)
                .add("page", page)
                .add("menuType", menuType)
                .add("timeType", timeType)
                .addIgnoreNull("searchKey", searchKey)
                .addIgnoreNull("timeFrom", timeFrom)
                .addIgnoreNull("timeTo", timeTo)
                .addIgnoreNull("userIDFind", userIDFind));
    }

    //16
    public sendRequestDELETE_NOTE(username: string, userID: number, activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_NOTE,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("activityIDs", activityIDs));
    }

    //64
    public sendRequestGET_SUMMARY_INFO(username: string, userID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_SUMMARY_INFO,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID));
    }

    //65
    public sendRequestGET_LIST_CITY(username: string, userID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CITY,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID));
    }

    //66
    public sendRequestDELETE_TASK(username: string, userID: number, activityIDs: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_TASK,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("activityIDs", activityIDs));
    }

    //67
    public sendRequestADD_USER(username: string, userID: number, userReg: any): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_USER,
            ParamBuilder.builder()
                .add("ip", this.ip)
                .add("dbName", this.dbName)
                .add("username", username)
                .add("userID", userID)
                .add("regName", userReg.name)
                .add("regUsername", userReg.username)
                .add("regPhone", userReg.phone)
                .add("regEmail", userReg.email)
                .add("regPassword", userReg.password));
    }
}