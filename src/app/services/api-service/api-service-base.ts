import { Users } from '../classes/user';
import { Todo } from '../classes/todo';
import { Messages } from '../classes/message';

export class ApiServiceBase {
    isDebug: boolean = false;

    public static _instance: ApiServiceBase = null;

    public static getInstance(): ApiServiceBase {
        if (this._instance == null) {
            this._instance = new ApiServiceBase();
        }
        return this._instance;
    }
    constructor() { }

    onParseUser(data) {
        let obj = new Users();
        obj.toObj(data.obj);
        return obj;
    }

    onParseGeneralTodo(data) {
        return data.obj;
    }

    onParseListMessage(data) {
        let arr: Array<Messages> = [];
        if (data.array != null) {
            if (data.array.length > 0) {
                for (let i = 0; i < data.array.length; i++) {
                    let obj = new Messages();
                    obj.toObj(data.array[i]);
                    arr.push(obj)
                }
            }
            return arr;
        } else {
            return [];
        }
    }

}