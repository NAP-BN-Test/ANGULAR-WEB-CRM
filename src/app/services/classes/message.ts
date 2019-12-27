export class Messages {

    public senderID: number = -1;

    public targetID: number = -1;

    public roomID: number = -1;

    public message: string = "";

    public time: string = "";


    constructor() { }

    public toObj(data: any) {
        if ('senderID' in data) this.setSenderID(data.senderID);
        if ('targetID' in data) this.setTargetID(data.targetID);
        if ('roomID' in data) this.setRoomID(data.roomID);
        if ('message' in data) this.setMessage(data.message);
        if ('time' in data) this.setTime(data.time);
       
    }

    public getSenderID(): number {
        return this.senderID;
    }

    public setSenderID(senderID: number) {
        this.senderID = senderID;
    }

    public getTargetID(): number {
        return this.targetID;
    }

    public setTargetID(targetID: number) {
        this.targetID = targetID;
    }

    public getRoomID(): number {
        return this.roomID;
    }

    public setRoomID(roomID: number) {
        this.roomID = roomID;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string) {
        this.message = message;
    }

    public getTime(): string {
        return this.time;
    }

    public setTime(time: string) {
        this.time = time;
    }


}