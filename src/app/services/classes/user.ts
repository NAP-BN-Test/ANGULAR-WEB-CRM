export class Users {

    public userID: number = -1;

    //id phòng ban
    public roomID: number = -1;

    public username: string = "";

    public password: string = "";

    public avatar: string = "";

    public phone: string = "";

    public role: string = "";

    public active: boolean = false;

    public name: string = "";


    constructor() { }

    public toObj(data: any) {
        if ('userID' in data) this.setUserID(data.userID);
        if ('roomID' in data) this.setRoomID(data.roomID);
        if ('username' in data) this.setUsername(data.username);
        if ('password' in data) this.setPassword(data.password);
        if ('avatar' in data) this.setAvatar(data.avatar);
        if ('phone' in data) this.setPhone(data.phone);
        if ('role' in data) this.setRole(data.role);
        if ('active' in data) this.setActive(data.active);
        if ('name' in data) this.setName(data.name);
    }

    public getUserID(): number {
        return this.userID;
    }

    public setUserID(userID: number) {
        this.userID = userID;
    }

    public getRoomID(): number {
        return this.roomID;
    }

    public setRoomID(roomID: number) {
        this.roomID = roomID;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getAvatar(): string {
        return this.avatar;
    }

    public setAvatar(avatar: string) {
        this.avatar = avatar;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string) {
        this.phone = phone;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string) {
        this.role = role;
    }

    public getActive(): boolean {
        return this.active;
    }

    public setActive(active: boolean) {
        this.active = active;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

}