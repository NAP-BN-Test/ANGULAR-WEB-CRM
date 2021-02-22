import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import {
  LOCAL_STORAGE_KEY,
  BUTTON_TYPE,
  STATUS,
  EVENT_PUSH,
  CLICK_DETAIL,
} from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";
import { ParamsKey } from "src/app/services/constant/paramskey";
import { AddMailmergeTemplateComponent } from "src/app/dialogs/add-mailmerge-template/add-mailmerge-template.component";
import { DialogComponent } from "src/app/dialogs/dialog/dialog.component";

@Component({
  selector: "app-mailmerge-template-list",
  templateUrl: "./mailmerge-template-list.component.html",
  styleUrls: ["./mailmerge-template-list.component.scss"],
})
export class MailmergeTemplateListComponent implements OnInit {
  listTbData = {
    clickDetail: CLICK_DETAIL.MAILMERGE_TEMPLATE_LIST,
    listColum: [
      { name: "Name", cell: "Name" },
      { name: "Create Date", cell: "TimeCreate" },
      { name: "Create User", cell: "UserName" },
      { name: "Date Send Email", cell: "TimeStart" },
      { name: "Action", cell: undefined },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  page = 1;
  mTitle: any;
  searchKey = null;
  collectionSize: number;
  paramsObj: any;

  constructor(public mService: AppModuleService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.page = params.page;
      this.onLoadData(this.page, this.searchKey);
    } else {
      this.mService.publishPageRoute("login");
    }
  }

  onLoadData(page: number, searchKey: string) {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_MAILMERGE_TEMPLATE(page, searchKey)
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.collectionSize = data.count;
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbData,
          });
          let listParams = [{ key: "page", value: this.page }];
          if (this.searchKey != "")
            listParams.push({ key: "searchKey", value: this.searchKey });
          this.paramsObj = this.mService.handleParamsRoute(listParams);
        }
      });
  }

  onClickPagination(event) {
    this.onLoadData(event, this.searchKey);
  }

  onClickAddNew() {
    const dialogRef = this.dialog.open(AddMailmergeTemplateComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          Name: res.Name,
        };
        this.mService
          .getApiService()
          .sendRequestADD_MAILMERGE_TEMPLATE(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (
              data.status == STATUS.SUCCESS &&
              res.textContent !== "Thiết lập"
            ) {
              this.onLoadData(1, this.searchKey);
            } else {
              this.mService.publishPageRoute("mailmerge-template-detail", {
                mailMergeTemplateID: data.obj.ID,
              });
            }
          });
      }
    });
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddMailmergeTemplateComponent, {
      width: "500px",
      data: {
        Name: event.data.Name,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          ID: event.data.ID,
          Name: res.Name,
        };
        this.mService
          .getApiService()
          .sendRequestUPDATE_MAILMERGE_TEMPLATE(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (
              data.status == STATUS.SUCCESS &&
              res.textContent !== "Thiết lập"
            ) {
              this.onLoadData(1, this.searchKey);
            } else {
              this.mService.publishPageRoute("mailmerge-template-detail", {
                mailMergeTemplateID: obj.ID,
              });
            }
          });
      }
    });
  }

  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "500px",
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_MAILMERGE_TEMPLATE(event.data)
            .then((data) => {
              if (data.status == STATUS.SUCCESS) {
                this.onLoadData(1, this.searchKey);
              }
            });
        }
      });
    }
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.MAILMERGE_TEMPLATE_LIST) {
        this.mService.publishPageRoute("mailmerge-template-detail", {
          mailMergeTemplateID: event.data.ID,
        });
      }
    }
  }
}
