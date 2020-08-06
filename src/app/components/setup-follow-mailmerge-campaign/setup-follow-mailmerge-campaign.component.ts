import { Component, OnInit } from "@angular/core";
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
import { FormControl } from "@angular/forms";
import { ParamsKey } from "src/app/services/constant/paramskey";

import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";

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
  add_info_initial_id: number;
  tableHaveValue = false;
  mailMergeCampaignID = -1;

  constructor(
    public mService: AppModuleService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Gihug: Nhận param gửi từ mailmerge-campaign-list
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mailMergeCampaignID = Number(params.mailMergeCampaignID);
    });
    console.log(this.mailMergeCampaignID)
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
    this.resetInfoLeft();
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listMailList.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  resetInfoLeft() {
    this.mObj = {
      ID: null,
      OwnerID: null,
      OurRef: null,
      PAT: null,
      Applicant: null,
      ApplicationNo: null,
      ClassA: null,
      FilingDate: null,
      PriorTrademark: null,
      RedNo: null,
      ClassB: null,
      Firm: null,
      Address: null,
      Tel: null,
      Fax: null,
      Email: null,
      Status: null,
      Rerminder: null,
      TimeCreate: null,
      TimeStart: null,
      Description: null,
      TimeRemind: null,
      UserID: null,
      TimeUpdate: null,
    };
    this.tableHaveValue = false;
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
    let obj = this.listMailList.find((item) => {
      return item.name.toLowerCase() == this.myControl.value.toLowerCase();
    });
    this.mService
      .getApiService()
      .sendRequestGET_ALL_DATA_MAILLIST(obj.id)
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          console.log(data.information);
          this.tableHaveValue = true;
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
    this.resetInfoLeft();
  }

  onClickBtn(event) {
    console.log(event);
  }

  onClickEdit(event) {
    console.log(event);
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.ADDITIONAL_INFORMATION) {
        this.mObj = event.data;
        this.add_info_initial_id = this.mObj.ID;
      }
    }
  }

  onClickCancel() {
    this.mService
      .getApiService()
      .sendRequestGET_DETAIL_ADDITIONAL_INFORMATION(
        this.add_info_initial_id.toString()
      )
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          console.log(data);
          this.mObj = data.array;
          this.onClickSelect();
        }
      });
  }

  onClickSave() {
    console.log(this.mObj);
    let obj = {
      ID: this.mObj.ID,
      OurRef: this.mObj.OurRef,
      Applicant: this.mObj.Applicant,
      ApplicationNo: this.mObj.ApplicationNo,
      ClassA: this.mObj.ClassA,
      FilingDate: moment(this.mObj.FilingDate).format("YYYY-MM-DD"),
      PriorTrademark: this.mObj.PriorTrademark,
      OwnerID: this.mObj.OwnerID,
      RedNo: this.mObj.RedNo,
      ClassB: this.mObj.ClassB,
      Firm: this.mObj.Firm,
      Address: this.mObj.Address,
      Tel: this.mObj.Tel,
      Fax: this.mObj.Fax,
      Email: this.mObj.Email,
      Status: this.mObj.Status,
      Rerminder: this.mObj.Rerminder,
      UserID: this.mObj.UserID,
      Description: this.mObj.Description,
      TimeRemind: this.mObj.TimeRemind,
      PAT: this.mObj.PAT,
    };
    this.mService
      .getApiService()
      .sendRequestUPDATE_ADDITIONAL_INFORMATION(obj)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message);
          this.onClickSelect();
        }
      });
  }

  //Gihug: Hàm lưu thông tin mailmerge-campaign với chi tiết maillist
  onClickSaveDetail() {
    let mailList = this.listMailList.find((item) => {
      return item.name.toLowerCase() == this.myControl.value.toLowerCase();
    });
    let obj = {
      id: this.mailMergeCampaignID,
      mailListID: mailList.id,
    };
    console.log(this.mailMergeCampaignID)
    console.log(obj);
    // this.mService
    //   .getApiService()
    //   .sendRequestUPDATE_MAIL_CAMPAIN(obj.id)
    //   .then((data) => {
    //     this.mService.showSnackBar(data.message);
    //     if (data.status == STATUS.SUCCESS) {
    //       console.log(data)
    //     }
    //   });
  }
}
