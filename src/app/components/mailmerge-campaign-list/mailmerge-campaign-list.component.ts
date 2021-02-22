import { Component, OnInit } from "@angular/core";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
  EVENT_PUSH,
  BUTTON_TYPE,
  CLICK_DETAIL,
} from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";
import { ParamsKey } from "src/app/services/constant/paramskey";
import { MatDialog } from "@angular/material";
import { AddUpdateMailmergeCampaignComponent } from "../add-update-mailmerge-campaign/add-update-mailmerge-campaign.component";
import { DialogComponent } from "src/app/dialogs/dialog/dialog.component";

@Component({
  selector: "app-mailmerge-campaign-list",
  templateUrl: "./mailmerge-campaign-list.component.html",
  styleUrls: ["./mailmerge-campaign-list.component.scss"],
})
export class MailmergeCampaignListComponent implements OnInit {
  listTbData = {
    clickDetail: CLICK_DETAIL.MAILMERGE_CAMPAIGN_LIST,
    listColum: [
      { name: "Name", cell: "name" },
      { name: "Template", cell: "TemplateName" },
      { name: "Create Date", cell: "createTime" },
      { name: "Create User", cell: "owner" },
      { name: "Number Of AddressBook", cell: "NumberAddressBook" },
      { name: "Action", cell: undefined },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  mTitle: any;
  searchKey = null;
  page = 1;
  collectionSize: number;
  paramsObj: any;
  type = "MailMerge";

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
      .sendRequestGET_LIST_MAIL_CAMPAIN(
        page,
        searchKey,
        null,
        null,
        null,
        this.type
      )
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

  onClickAdd() {
    const dialogRef = this.dialog.open(AddUpdateMailmergeCampaignComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          name: res.Name,
          Template_ID: res.Template_ID,
          Type: this.type,
        };
        this.mService
          .getApiService()
          .sendRequestADD_MAIL_CAMPAIN(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (
              data.status == STATUS.SUCCESS &&
              res.textContent !== "Thiết lập"
            ) {
              this.onLoadData(1, this.searchKey);
            } else {
              this.mService.publishPageRoute(
                "setup-follow-mailmerge-campaign",
                {
                  mailMergeCampaignID: data.id,
                }
              );
            }
          });
      }
    });
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddUpdateMailmergeCampaignComponent, {
      width: "500px",
      data: {
        Name: event.data.name,
        Template_ID: event.data.TemplateName,
        Number_Address: event.data.NumberAddressBook,
        Description: event.data.Description,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          id: event.data.id,
          name: res.Name,
          Template_ID: res.Template_ID,
          NumberAddressBook: res.Number_Address,
          Description: res.Description,
          Type: this.type,
        };
        this.mService
          .getApiService()
          .sendRequestUPDATE_MAIL_CAMPAIN(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (
              data.status == STATUS.SUCCESS &&
              res.textContent !== "Thiết lập"
            ) {
              this.onLoadData(1, this.searchKey);
            } else {
              this.mService.publishPageRoute(
                "setup-follow-mailmerge-campaign",
                {
                  mailMergeCampaignID: event.data.id,
                }
              );
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
            .sendRequestDELETE_MAIL_CAMPAIN(event.data)
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
      if (event.clickDetail == CLICK_DETAIL.MAILMERGE_CAMPAIGN_LIST) {
        this.mService.publishPageRoute("setup-follow-mailmerge-campaign", {
          mailMergeCampaignID: event.data.id,
        });
      }
    }
  }
}
