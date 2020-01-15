import { HttpClient } from '../core/http/http-client';
import { ParamBuilder } from '../core/http/param-builder';
import { ApiCmd } from './api-service-cmd';

export class ApiService extends HttpClient {
    mUrl: string = "http://192.168.1.129:3002/";
    // mUrl: string = "http://163.44.192.123:8771/";
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
    public sendRequestUSER_LOGIN(ip: string, dbName: string, username: string, password: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.USER_LOGIN,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("password", password));
    }


    //2
    public sendRequestGET_LIST_QUICK_CONTACT(ip: string, dbName: string, username: string, userID: number, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_CONTACT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID));
    }

    //3
    public sendRequestGET_LIST_COMPANY(ip: string, dbName: string, username: string, userID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_COMPANY,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID));
    }

    //4
    public sendRequestGET_DETAIL_COMPANY(ip: string, dbName: string, username: string, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_DETAIL_COMPANY,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("companyID", companyID));
    }

    //5
    public sendRequestGET_LIST_QUICK_COMPANY(ip: string, dbName: string, username: string, parentID: number, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_COMPANY,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("parentID", parentID)
                .add("companyID", companyID));
    }

    //6
    public sendRequestGET_LIST_QUICK_DEAL(ip: string, dbName: string, username: string, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_QUICK_DEAL,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("companyID", companyID));
    }

    //7
    public sendRequestGET_LIST_ACTIVITY(ip: string, dbName: string, username: string, companyID: number, activityType: number, attendID?: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_ACTIVITY,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("companyID", companyID)
                .add("activityType", activityType)
                .add("attendID", attendID ? attendID : -1));
    }

    //8
    public sendRequestGET_LIST_CONTACT(ip: string, dbName: string, username: string, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CONTACT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("companyID", companyID));
    }

    //9
    public sendRequestGET_LIST_CONTACT_FULL(ip: string, dbName: string, username: string, companyID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_CONTACT_FULL,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("companyID", companyID));
    }

    //10
    public sendRequestUPDATE_ACTIVITY(
        ip: string,
        dbName: string,
        username: string,
        activity: any,
        contactID?: number,
        activityState?: number,
        timeStart?: string,
        duration?: number,
        listAttendID?: string,
        description?: string,
        assignID?: number,
        taskType?: number
    ): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_ACTIVITY,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
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
                .addIgnoreNull("taskType", taskType));
    }

    //11
    public sendRequestGET_LIST_MEET_ATTEND(ip: string, dbName: string, username: string, meetID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_MEET_ATTEND,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("meetID", meetID));
    }

    //12
    public sendRequestGET_LIST_USER(ip: string, dbName: string, username: string, userID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_LIST_USER,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID));
    }

    //13
    public sendRequestCREATE_NOTE(ip: string, dbName: string, username: string, userID: number, companyID: number, description: string, listAssociate: any, timeRemind: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_NOTE,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID)
                .add("description", description)
                .add("listAssociate", JSON.stringify(listAssociate))
                .addIgnoreNull("timeRemind", timeRemind));
    }

    //14
    public sendRequestGET_NOTE_ASSOCIATE(ip: string, dbName: string, username: string, noteID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.GET_NOTE_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("noteID", noteID));
    }

    //15
    public sendRequestUPDATE_NOTE_ASSOCIATE(ip: string, dbName: string, username: string, userID: number, noteID: number, state: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.UPDATE_NOTE_ASSOCIATE,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID)
                .add("noteID", noteID)
                .add("state", state));
    }

    //16
    public sendRequestDELETE_NOTE(ip: string, dbName: string, username: string, userID: number, noteID: number): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.DELETE_NOTE,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID)
                .add("noteID", noteID));
    }

    //17
    public sendRequestCREATE_CALL(ip: string, dbName: string, username: string, userID: number,
        companyID: string, contactID: number, outcomeType: number, timeStart: string, timeRemind: string, description: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.CREATE_CALL,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID)
                .add("companyID", companyID)
                .add("contactID", contactID)
                .add("outcomeType", outcomeType)
                .add("timeStart", timeStart)
                .add("timeRemind", timeRemind)
                .add("description", description));
    }

    //18
    public sendRequestADD_COMMENT(ip: string, dbName: string, username: string, userID: number, userName: string, activity: any, content: string): Promise<any> {
        return this.requestPost(this.mUrl + ApiCmd.ADD_COMMENT,
            ParamBuilder.builder()
                .add("ip", ip)
                .add("dbName", dbName)
                .add("username", username)
                .add("userID", userID)
                .add("userName", userName)
                .add("content", content)
                .add("activityID", activity.id)
                .add("activityType", activity.activityType));
    }
}