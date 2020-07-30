import { Component, OnInit } from "@angular/core";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
  EVENT_PUSH,
  BUTTON_TYPE,
} from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";
import { ParamsKey } from "src/app/services/constant/paramskey";
import { MatDialog } from "@angular/material";
import { AddUpdateMailmergeCampaignComponent } from "../add-update-mailmerge-campaign/add-update-mailmerge-campaign.component";

@Component({
  selector: "app-mailmerge-campaign-list",
  templateUrl: "./mailmerge-campaign-list.component.html",
  styleUrls: ["./mailmerge-campaign-list.component.scss"],
})
export class MailmergeCampaignListComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: "Name", cell: "Name" },
      { name: "Template", cell: "Template_ID" },
      { name: "Create Date", cell: "Create_Date" },
      { name: "Create User", cell: "UserID" },
      { name: "Number Of AddressBook", cell: "Number_Address" },
      { name: "Thao tác", cell: undefined },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  mTitle: any;
  searchKey = null;
  page = 1;
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
      .sendRequestGET_MAILMERGE_CAMPAIGN(page, searchKey)
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
          Name: res.Name,
          Template_ID: res.Template_ID,
        };
        console.log(obj);
        this.mService
          .getApiService()
          .sendRequestADD_MAILMERGE_CAMPAIGN(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(1, this.searchKey);
            }
          });
      }
    });
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddUpdateMailmergeCampaignComponent, {
      width: "500px",
      data: {
        Name: event.data.Name,
        Template_ID: event.data.Template_ID,
        Number_Address: event.data.Number_Address,
        Description: event.data.Description,
      },
    });

    console.log(event)

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          Name: res.name,
          Template_ID: res.Template_ID,
          Number_Address: res.Number_Address,
          Description: res.Description,
        };
        this.mService
          .getApiService()
          .sendRequestUPDATE_MAILMERGE_CAMPAIGN(obj, event.data.id)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(1, this.searchKey);
            }
          });
      }
    });
  }
}
