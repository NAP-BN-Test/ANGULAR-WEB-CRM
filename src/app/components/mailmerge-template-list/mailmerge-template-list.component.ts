import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { LOCAL_STORAGE_KEY, BUTTON_TYPE, STATUS, EVENT_PUSH } from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";
import { ParamsKey } from 'src/app/services/constant/paramskey';


@Component({
  selector: "app-mailmerge-template-list",
  templateUrl: "./mailmerge-template-list.component.html",
  styleUrls: ["./mailmerge-template-list.component.scss"],
})
export class MailmergeTemplateListComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: "Name", cell: "Name" },
      { name: "Create Date", cell: "TimeCreate" },
      { name: "Create User", cell: "UserID" },
      { name: "Data Send Email", cell: "dataName" },
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
      .sendRequestGET_MAILMERGE_TEMPLATE(page, searchKey)
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

}
