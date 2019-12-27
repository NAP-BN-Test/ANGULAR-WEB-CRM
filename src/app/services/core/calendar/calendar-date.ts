
export class CalendarDate {
    private static _instance: CalendarDate;

    public mm: number = -1;
    public HH: number = -1;
    public DD: number = -1;
    public MM: number = -1;
    public YYYY: number = -1;
    public Day: number = -1;

    public WEEK_DAYS: Array<string> = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    public MONTH_NAMES = ["Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6", "Thg7", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12"];

    constructor() {

    }

    public static getInstance(): CalendarDate {
        if (this._instance == null) {
            this._instance = new CalendarDate();
        }
        return this._instance;
    }

    public setDate(DD: number, MM: number, YYYY: number): void {
        this.DD = DD;
        this.MM = MM;
        this.YYYY = YYYY;
    }
    public setTime(date: Date): void {
        this.mm = date.getMinutes();
        this.HH = date.getHours();
        this.DD = date.getDate();
        this.MM = date.getMonth();
        this.YYYY = date.getFullYear();
        this.Day = date.getDay();
    }

    public setDateFromString(dateString: string){
        let arr = dateString.split("/");
        this.DD = parseInt(arr[0]);
        this.MM = parseInt(arr[1]);
        this.YYYY = parseInt(arr[2]);
    }
    
    public getDay(): number {
        return this.DD;
    }
    public getMonth(): number {
        return this.MM;
    }
    public getYear(): number {
        return this.YYYY;
    }

    getId(): string {
        return this.DD + "" + this.MM + "" + this.YYYY;
    }

    getDateString(): string{
        return (this.DD < 10 ? "0" : "") + this.DD +"/"+ (this.MM + 1 < 10 ? "0": "") + (this.MM + 1) +"/"+ this.YYYY; 
    }

    getDateStringStyleDate(): string {
        return this.WEEK_DAYS[this.Day] + ", " + this.DD + " " + this.MONTH_NAMES[this.MM] + " " + this.YYYY;
    } 

}