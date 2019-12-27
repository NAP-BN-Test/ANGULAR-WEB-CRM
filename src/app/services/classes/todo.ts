export class Todo {

    public todoID: number = 0;

    public name: string = "";

    public contact: string = "";

    public phone: string = "";

    public assignDate: string = "";

    public endDate: string = "";

    public alertTime: string = "";

    public canAssign: boolean = false;

    public status: number = -1;

    public state: number = -1;

    public note: string = "";

    public assignUser: string = "";

    public agent: string = "";


    public jobID: number = -1;

    public jobCode: string = "";

    public jobType: string = "";

    public jobFrom: string = "";

    public jobTo: string = "";

    public jobVolume: string = "";

    public jobOpenDate: string = "";

    public jobCutOfDate: string = "";

    public jobSale: string = "";

    public jobHblMbl: string = "";


    constructor() { }

    public toObj(data: any) {
        if ('todoID' in data) this.setTodoID(data.todoID ? data.todoID : -1);
        if ('name' in data) this.setName(data.name);
        if ('contact' in data) this.setContact(data.contact);
        if ('phone' in data) this.setPhone(data.phone);
        if ('alertTime' in data) this.setAlertTime(data.alertTime);
        if ('assignDate' in data) this.setAssignDate(data.assignDate);
        if ('endDate' in data) this.setEndDate(data.endDate);
        if ('canAssign' in data) this.setCanAssign(data.canAssign);
        if ('status' in data) this.setStatus(data.status);
        if ('state' in data) this.setState(data.state);
        if ('note' in data) this.setNote(data.note);
        if ('assignUser' in data) this.setAssignUser(data.assignUser);
        if ('agent' in data) this.setAgent(data.agent);

        if ('jobID' in data) this.setJobID(data.jobID);
        if ('jobCode' in data) this.setJobCode(data.jobCode);
        if ('jobType' in data) this.setJobType(data.jobType);
        if ('jobFrom' in data) this.setJobFrom(data.jobFrom);
        if ('jobTo' in data) this.setJobTo(data.jobTo);
        if ('jobVolume' in data) this.setJobVolume(data.jobVolume);
        if ('jobOpenDate' in data) this.setJobOpenDate(data.jobOpenDate);
        if ('jobCutOfDate' in data) this.setJobCutOfDate(data.jobCutOfDate);
        if ('jobSale' in data) this.setJobSale(data.jobSale);
        if ('jobHblMbl' in data) this.setJobHblMbl(data.jobHblMbl);

    }

    public getTodoID(): number {
        return this.todoID;
    }

    public setTodoID(todoID: number) {
        this.todoID = todoID;
    }

    public getContact(): string {
        return this.contact;
    }

    public setContact(contact: string) {
        this.contact = contact;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string) {
        this.phone = phone;
    }

    public getAlertTime(): string {
        return this.alertTime;
    }

    public setAlertTime(alertTime: string) {
        this.alertTime = alertTime;
    }

    public getAssignDate(): string {
        return this.assignDate;
    }

    public setAssignDate(assignDate: string) {
        this.assignDate = assignDate;
    }

    public getEndDate(): string {
        return this.endDate;
    }

    public setEndDate(endDate: string) {
        this.endDate = endDate;
    }

    public getCanAssign(): boolean {
        return this.canAssign;
    }

    public setCanAssign(canAssign: boolean) {
        this.canAssign = canAssign;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(status: number) {
        this.status = status;
    }

    public getState(): number {
        return this.state;
    }

    public setState(state: number) {
        this.state = state;
    }

    public getNote(): string {
        return this.note;
    }

    public setNote(note: string) {
        this.note = note;
    }

    public getAssignUser(): string {
        return this.assignUser;
    }

    public setAssignUser(assignUser: string) {
        this.assignUser = assignUser;
    }

    public getAgent(): string {
        return this.agent;
    }

    public setAgent(agent: string) {
        this.agent = agent;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getJobID(): number {
        return this.jobID;
    }

    public setJobID(jobID: number) {
        this.jobID = jobID;
    }

    public getJobCode(): string {
        return this.jobCode;
    }

    public setJobCode(jobCode: string) {
        this.jobCode = jobCode;
    }

    public getJobType(): string {
        return this.jobType;
    }

    public setJobType(jobType: string) {
        this.jobType = jobType;
    }

    public getJobFrom(): string {
        return this.jobFrom;
    }

    public setJobFrom(jobFrom: string) {
        this.jobFrom = jobFrom;
    }

    public getJobTo(): string {
        return this.jobTo;
    }

    public setJobTo(jobTo: string) {
        this.jobTo = jobTo;
    }

    public getJobVolume(): string {
        return this.jobVolume;
    }

    public setJobVolume(jobVolume: string) {
        this.jobVolume = jobVolume;
    }

    public getJobOpenDate(): string {
        return this.jobOpenDate;
    }

    public setJobOpenDate(jobOpenDate: string) {
        this.jobOpenDate = jobOpenDate;
    }

    public getJobCutOfDate(): string {
        return this.jobCutOfDate;
    }

    public setJobCutOfDate(jobCutOfDate: string) {
        this.jobCutOfDate = jobCutOfDate;
    }

    public getJobSale(): string {
        return this.jobSale;
    }

    public setJobSale(jobSale: string) {
        this.jobSale = jobSale;
    }

    public getJobHblMbl(): string {
        return this.jobHblMbl;
    }

    public setJobHblMbl(jobHblMbl: string) {
        this.jobHblMbl = jobHblMbl;
    }


}
