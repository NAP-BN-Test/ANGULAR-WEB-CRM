import { Component, OnInit } from "@angular/core";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
  EVENT_PUSH,
  BUTTON_TYPE,
} from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";
import { ParamsKey } from "src/app/services/constant/paramskey";

@Component({
  selector: "app-setup-follow-mailmerge-campaign",
  templateUrl: "./setup-follow-mailmerge-campaign.component.html",
  styleUrls: ["./setup-follow-mailmerge-campaign.component.scss"],
})
export class SetupFollowMailmergeCampaignComponent implements OnInit {
  //data for component table
  listTbData = {
    listColum: [
      { name: "OurRef", cell: "OurRef" },
      { name: "Potential Adverse Trademarkn", cell: "PAT" },
      { name: "Applicant", cell: "Applicant" },
      { name: "Application No.", cell: "ApplicationNo" },
      { name: "Class A", cell: "ClassA" },
      { name: "Filing Date", cell: "FilingDate" },
      { name: "Prior Trademark", cell: "PriorTrademark" },
      { name: "Owner", cell: "OwnerID" },
      { name: "Reg. No..", cell: "RedNo" },
      { name: "Class B", cell: "ClassB" },
      { name: "Status", cell: "Status" },
      { name: "Firm", cell: "Firm" },
      { name: "Address", cell: "Address" },
      { name: "Tel", cell: "Tel" },
      { name: "Fax", cell: "Fax" },
      { name: "Email", cell: "Email" },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  mTitle: any;
  page = 1;
  searchKey = null;
  collectionSize: number;
  paramsObj: any;
  mObj: any;

  constructor(public mService: AppModuleService) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.page = params.page;

      // this.onLoadData(this.page, this.searchKey);
    } else {
      this.mService.publishPageRoute("login");
    }
  }

  // onLoadData(page: number, searchKey: string) {
  //   this.mService
  //     .getApiService()
  //     .sendRequestGET_MAILMERGE_CAMPAIGN(page, searchKey)
  //     .then((data) => {
  //       if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
  //         console.log(data);
  //         this.collectionSize = data.count;

          // this.mService.publishEvent(EVENT_PUSH.TABLE, {
          //   page: this.page,
          //   collectionSize: this.collectionSize,
          //   listData: data.array,
          //   listTbData: this.listTbData,
          // });

  //         let listParams = [{ key: "page", value: this.page }];
  //         if (this.searchKey != "")
  //           listParams.push({ key: "searchKey", value: this.searchKey });

  //         this.paramsObj = this.mService.handleParamsRoute(listParams);
  //       }
  //     });
  // }

  // onClickPagination(event) {
  //   this.onLoadData(event, this.searchKey);
  // }

  onClickCell(event) {
    console.log(event);
  }
}
