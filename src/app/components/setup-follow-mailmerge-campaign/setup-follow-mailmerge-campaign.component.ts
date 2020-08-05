import { Component, OnInit, Inject } from "@angular/core";
import {
  LOCAL_STORAGE_KEY,
  BUTTON_TYPE,
  STATUS,
  EVENT_PUSH,
  CLICK_DETAIL,
} from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { ParamsKey } from "src/app/services/constant/paramskey";

@Component({
  selector: "app-setup-follow-mailmerge-campaign",
  templateUrl: "./setup-follow-mailmerge-campaign.component.html",
  styleUrls: ["./setup-follow-mailmerge-campaign.component.scss"],
})
export class SetupFollowMailmergeCampaignComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.ADDITIONAL_INFORMATION,
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
      { name: "Action", cell: undefined },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  mTitle: any;
  page = 1;
  searchKey = null;
  collectionSize: number;
  paramsObj: any;
  mObj: any;
  listMailList = [];
  filterMailList: Observable<string[]>;
  myControl = new FormControl();
  mailListName: string;

  constructor(public mService: AppModuleService) {}

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

    this.mService
      .getApiService()
      .sendRequestGET_MAIL_LIST(this.page, null, null, null, null)
      .then((data) => {
        console.log(data);
        this.listMailList = data.array;
        this.filterMailList = this.myControl.valueChanges.pipe(
          startWith(""),
          map((value) => this._filter(value))
        );
      });

    this.mObj = {
      ID: null,
      OwnerID: null,
      OurRef: "",
      PAT: "",
      Applicant: null,
      ApplicationNo: null,
      ClassA: null,
      FilingDate: null,
      PriorTrademark: null,
      RedNo: null,
      ClassB: null,
      Firm: null,
      Address: "",
      Tel: null,
      Fax: "",
      Email: null,
      Status: null,
      Rerminder: null,
      TimeCreate: "",
      TimeStart: null,
      Description: null,
      TimeRemind: null,
      UserID: "",
      TimeUpdate: "",
    };
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listMailList.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onLoadData(page: number, searchKey: string) {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      page: this.page,
      collectionSize: this.collectionSize,
      listData: this.listTbData,
      listTbData: this.listTbData,
    });
  }

  onClickPagination(event) {
    this.onLoadData(event, this.searchKey);
  }

  onClickSelect() {
    console.log(this.mailListName);
    let obj = this.listMailList.find((item) => {
      return item.name.toLowerCase() == this.myControl.value.toLowerCase();
    });
    console.log(obj.id);
    this.mService
      .getApiService()
      .sendRequestGET_ALL_DATA_MAILLIST(obj.id)
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          console.log(data.information);
          this.collectionSize = data.count;
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.information,
            listTbData: this.listTbData,
          });
          let listParams = [{ key: "page", value: this.page }];
          if (this.searchKey != "")
            listParams.push({ key: "searchKey", value: this.searchKey });
          this.paramsObj = this.mService.handleParamsRoute(listParams);
        }
      });
  }

  onClickBtn(event) {
    console.log(event);
  }

  onClickEdit(event) {
    console.log(event);
  }

  onClickCell(event) {
    console.log(event);
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.ADDITIONAL_INFORMATION) {
        this.mObj = event.data;
      }
    }
  }
}
