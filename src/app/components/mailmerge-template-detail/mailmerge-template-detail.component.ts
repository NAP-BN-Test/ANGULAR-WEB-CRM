import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
} from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";

@Component({
  selector: "app-mailmerge-template-detail",
  templateUrl: "./mailmerge-template-detail.component.html",
  styleUrls: ["./mailmerge-template-detail.component.scss"],
})
export class MailmergeTemplateDetailComponent implements OnInit {
  mTitle: any;
  page = 1;
  mailMergeTemplateID = -1;
  mObj: any;

  constructor(public mService: AppModuleService) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.mailMergeTemplateID = params.mailMergeTemplateID;
      this.page = params.page;
      this.onLoadData(this.mailMergeTemplateID);
    } else {
      this.mService.publishPageRoute("login");
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "500px",
    minHeight: "0",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: "http://163.44.192.123:3302/crm/upload_file",
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [],
  };

  onLoadData(mailMergeTemplateID) {
    this.mService
      .getApiService()
      .sendRequestGET_DETAIL_MAILMERGE_TEMPLATE(mailMergeTemplateID)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message);
          this.mObj = data.obj;
        }
      });
  }

  onClickSave(event) {
    let obj = {
      ID: this.mailMergeTemplateID,
      body: this.mObj.body,
    };
    this.mService
      .getApiService()
      .sendRequestUPDATE_MAILMERGE_TEMPLATE(obj)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message);
        }
      });
  }

  onClickSaveClose(event) {
    this.onClickSave(event);
    this.onClickClose(event);
  }

  onClickClose(event) {
    this.mService.publishPageRoute("mailmerge-template-list");
  }
}
