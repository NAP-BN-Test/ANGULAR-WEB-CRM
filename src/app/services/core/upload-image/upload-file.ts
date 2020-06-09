
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from "@angular/common/http";
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UploadType } from "./upload-type";

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

                const req = new HttpRequest('POST', "http://192.168.1.130:3002/crm/upload_file", formData, {
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
}