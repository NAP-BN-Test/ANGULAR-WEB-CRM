
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from "@angular/common/http";
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UploadType } from "./upload-type";

import * as XLSX from 'xlsx';

export class UploadFileModule {
    public static _instance: UploadFileModule = null;

    public http: HttpClient = null;

    constructor() { }

    public _initiallize(http: HttpClient) {
        this.setHttp(http);
    }

    public setHttp(http: HttpClient) {
        this.http = http;
    }

    public static getInstance(): UploadFileModule {
        if (this._instance == null) {
            this._instance = new UploadFileModule();
        }
        return this._instance;
    }

    /**resize: true - false */
    public _onUploadFileInBrowser(selectedFile: any, type: any, resize: string, key?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (selectedFile) {
                var formData: FormData = new FormData();
                formData.append("file", selectedFile);

                var headers: HttpHeaders = new HttpHeaders();
                headers.append('Content-Type', null);
                headers.append('Accept', 'multipart/form-data');

                var httpParams: HttpParams = new HttpParams();
                httpParams = httpParams.append('__type', type + "");
                httpParams = httpParams.append('__resize', resize);
                httpParams = httpParams.append('__command', "upload_image");
                if (key) httpParams = httpParams.append('__key', key);

                const req = new HttpRequest('POST', "http://163.44.192.123:3302/crm/upload_file", formData, {
                    reportProgress: true,
                    responseType: 'text',
                    params: httpParams,
                    headers: headers
                });

                this.http.request(req).subscribe((data: any) => {
                    if (data.type == 4) {
                        resolve(JSON.parse(data.body));
                    }
                });

            } else {
                reject("Please select file first");
            }
        })
    }

    public _openFileInBrowser(callback: any) {
        let input = document.createElement("input");
        input.type = "file";
        input.style.display = "none";
        input.onchange = (data) => {
            let file = input.files[0];
            if (file.type.startsWith("image")) {
                var reader = new FileReader();
                reader.addEventListener("load", (image) => {
                    let avatar = image.target["result"];
                    callback({ selectedFile: file, avatar: avatar });
                })
                reader.readAsDataURL(file);

            } else {
                callback();
            }
        }
        document.body.appendChild(input);
        input.click();
    }

    public openFileImport(callback: any) {
        let input = document.createElement("input");
        input.type = "file";
        input.style.display = "none";
        input.onchange = (data) => {
            let file = input.files[0];

            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                let arrayBuffer: any = fileReader.result;
                var workbook = XLSX.read(arrayBuffer, { type: "buffer" });
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];

                var jsonSheet = XLSX.utils.sheet_to_json(worksheet, { raw: true })

                var output = jsonSheet.map((s: any) => {
                    var obj = {
                        name: "",
                        type: "",
                        address: "",
                        country: "",
                        source: "",
                        timeWorking: "",
                        timeActive: "",
                        note: "",
                        charge: "",
                        listMail: [],
                    };

                    if (s['Name']) obj.name = s['Name'];

                    if (s['Agent/ Company']) obj.type = s['Agent/ Company'];

                    if (s['Contact']) obj.address = s['Contact'];

                    if (s['Country']) obj.country = s['Country'];

                    if (s['Source']) obj.source = s['Source'];

                    if (s['Begin working time']) obj.timeWorking = s['Begin working time'];

                    if (s['Established']) obj.timeActive = s['Established'];

                    if (s['Note']) obj.note = s['Note'];

                    if (s['Schedule of Charge']) obj.charge = s['Schedule of Charge'];

                    let listMail = [];
                    if (s['Email 1']) {
                        if (s['contact Person1']) {
                            listMail.push({
                                name: s['contact Person1'],
                                email: s['Email 1']
                            });
                        } else {
                            listMail.push({
                                name: s['Email 1'],
                                email: s['Email 1']
                            });
                        }
                    }
                    if (s['Email 2']) {
                        if (s['contact Person2']) {
                            listMail.push({
                                name: s['contact Person2'],
                                email: s['Email 2']
                            });
                        } else {
                            listMail.push({
                                name: s['Email 2'],
                                email: s['Email 2']
                            });
                        }
                    }
                    if (s['Email 3']) {
                        if (s['contact Person3']) {
                            listMail.push({
                                name: s['contact Person3'],
                                email: s['Email 3']
                            });
                        } else {
                            listMail.push({
                                name: s['Email 3'],
                                email: s['Email 3']
                            });
                        }
                    }

                    if (s['Other Email']) {
                        let listMailString = s['Other Email'].split(';')
                        listMailString.forEach(listMailStringItem => {
                            listMail.push({
                                name: listMailStringItem,
                                email: listMailStringItem
                            });
                        })
                    }

                    obj.listMail = listMail;

                    return obj
                })
                callback(output);
            }
            fileReader.readAsArrayBuffer(file);
        }
        document.body.appendChild(input);
        input.click();
    }

    public __openFileInBrowser(callback: any) {
        let input = document.createElement("input");
        input.type = "file";
        input.style.display = "none";
        input.onchange = (data) => {
            let file = input.files[0];

            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                let arrayBuffer: any = fileReader.result;
                var workbook = XLSX.read(arrayBuffer, { type: "buffer" });
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];

                var jsonSheet = XLSX.utils.sheet_to_json(worksheet, { raw: true })

                var output = jsonSheet.map((s: any) => {
                    return {
                        name: s['Tên người liên hệ'],
                        email: s['Địa chỉ Email']
                    };
                })

                callback(output);
            }
            fileReader.readAsArrayBuffer(file);
        }
        document.body.appendChild(input);
        input.click();
    }
}