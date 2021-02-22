//author: GiHug
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AppModuleService } from "src/app/services/app-module.service";
import { startWith, map } from "rxjs/operators";
import {
  LOCAL_STORAGE_KEY,
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from "src/app/services/constant/app-constant";
import { FormControl } from "@angular/forms";
import { ParamsKey } from "src/app/services/constant/paramskey";

@Component({
  selector: "app-add-items-to-mailmerge-campaign",
  templateUrl: "./add-items-to-mailmerge-campaign.component.html",
  styleUrls: ["./add-items-to-mailmerge-campaign.component.scss"],
})
export class AddItemsToMailmergeCampaignComponent implements OnInit {
  filterListCompany: Observable<string[]>;
  listCompany = [];
  myControlCompany = new FormControl();
  mTitle: any;
  page: 1;
  type = "MailMerge";
  mObj: any;
  collectionSize: number;
  mailMergeCampaignID = -1;

  listTbData = {
    listColum: [
      { name: "Name", cell: "name" },
      { name: "Job Title", cell: "JobTileName" },
      { name: "Email", cell: "email" },
    ],
    listButton: [
      {
        id: BUTTON_TYPE.ADD_LIST_INFO,
        name: "Thêm vào danh sách",
        color: "primary",
      },
    ],
  };

  constructor(public mService: AppModuleService) {}

  ngOnInit(): void {
    this.mObj = {
      name: null,
      JobTileName: null,
      email: null,
    };
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.mailMergeCampaignID = params.mailMergeCampaignID;
      this.page = params.page;
      this.onLoadData();
    } else {
      this.mService.publishPageRoute("login");
    }

    this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_COMPANY()
      .then((data) => {
        this.listCompany = data.array;
        this.filterListCompany = this.myControlCompany.valueChanges.pipe(
          startWith(""),
          map((value) => this._filter(value))
        );
      });
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listCompany.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onLoadData() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      page: this.page,
      collectionSize: this.collectionSize,
      listData: this.mObj,
      listTbData: this.listTbData,
    });
  }

  onClickPagination(event) {
    this.onLoadData();
  }

  // Bắt sự kiện khi tích vào ô ở bảng
  onClickBtn(event) {
    this.mService
      .getApiService()
      .sendRequestADD_INFORMATION_FROM_CONTACT(
        event.data,
        this.mailMergeCampaignID
      )
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.mService.publishPageRoute("setup-follow-mailmerge-campaign", {
            mailMergeCampaignID: this.mailMergeCampaignID,
          });
        }
      });
  }

  // Bắt sự kiện khi chọn company
  onSelectCompany() {
    let obj = this.listCompany.find((item) => {
      return (
        item.name.toLowerCase() == this.myControlCompany.value.toLowerCase()
      );
    });
    this.mService
      .getApiService()
      .sendRequestGET_LIST_CONTACT_FROM_COMPANY(obj.id)
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.collectionSize = data.count;
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbData,
          });
        }
      });
  }

  onClickCancel() {
    this.mService.publishPageRoute("setup-follow-mailmerge-campaign", {
      mailMergeCampaignID: this.mailMergeCampaignID,
    });
  }
}
