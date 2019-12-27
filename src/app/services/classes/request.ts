export class Requests {

    public jobID: number = -1;

    public userID: number = -1;

    public type: number = -1;

    public objType: number = -1;

    public objID: number = -1;

    public paymentDate: string = "";

    public amount: number = 0;

    public currencyID: number = -1;

    public note: string = "";

    public explane: string = "";

    public state: number = -1;



    constructor() { }

    public toObj(data: any) {
        // if ('userID' in data) this.setUserID(data.userID);
        // if ('roomID' in data) this.setRoomID(data.roomID);
        // if ('username' in data) this.setUsername(data.username);
        // if ('password' in data) this.setPassword(data.password);
        // if ('avatar' in data) this.setAvatar(data.avatar);
        // if ('phone' in data) this.setPhone(data.phone);
        // if ('role' in data) this.setRole(data.role);
        // if ('active' in data) this.setActive(data.active);
        // if ('name' in data) this.setName(data.name);
    }

    public getJobID(): number {
        return this.jobID;
    }

    public setJobID(jobID: number) {
        this.jobID = jobID;
    }

    public getUserID(): number {
        return this.userID;
    }

    public setUserID(userID: number) {
        this.userID = userID;
    }

    public getType(): number {
        return this.type;
    }

    public setType(type: number) {
        this.type = type;
    }

    public getObjType(): number {
        return this.objType;
    }

    public setObjType(objType: number) {
        this.objType = objType;
    }

    public getObjID(): number {
        return this.objID;
    }

    public setObjID(objID: number) {
        this.objID = objID;
    }

    public getPayementDate(): string {
        return this.paymentDate;
    }

    public setPayementDate(paymentDate: string) {
        this.paymentDate = paymentDate;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number) {
        this.amount = amount;
    }

    public getCurrencyID(): number {
        return this.currencyID;
    }

    public setCurrencyID(currencyID: number) {
        this.currencyID = currencyID;
    }

    public getNote(): string {
        return this.note;
    }

    public setNote(note: string) {
        this.note = note;
    }

    public getExplane(): string {
        return this.explane;
    }

    public setExplane(explane: string) {
        this.explane = explane;
    }

    public getState(): number {
        return this.state;
    }

    public setState(state: number) {
        this.state = state;
    }


}