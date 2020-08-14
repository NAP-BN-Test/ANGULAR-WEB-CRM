import { Component, OnInit } from "@angular/core";
import {
  LOCAL_STORAGE_KEY,
  BUTTON_TYPE,
  STATUS,
  EVENT_PUSH,
  CLICK_DETAIL,
} from "src/app/services/constant/app-constant";
import { AppModuleService } from "src/app/services/app-module.service";
import { ParamsKey } from "src/app/services/constant/paramskey";

import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "src/app/dialogs/dialog/dialog.component";
import { DialogEmailErrorComponent } from "src/app/dialogs/dialog-email-error/dialog-email-error.component";

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
      { name: "Owner", cell: "Owner" },
      { name: "Reg. No.:", cell: "RegNo" },
      { name: "Class B", cell: "ClassB" },
      { name: "Firm", cell: "Firm" },
      { name: "Address", cell: "Address" },
      { name: "Tel", cell: "Tel" },
      { name: "Fax", cell: "Fax" },
      { name: "Email", cell: "Email" },
      { name: "Status", cell: "Status" },
      { name: "Reminder", cell: "Reminder" },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  mTitle: any;
  page = 1;
  searchKey = null;
  collectionSize: number;
  mObj: any;
  addInfoInitialID: number;
  tableHaveValue = false;
  mailMergeCampaignID = -1;
  nameCampaign: string;

  constructor(
    public mService: AppModuleService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  mDulicate = [];

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.mailMergeCampaignID = params.mailMergeCampaignID;
      this.page = params.page;
      this.onLoadData(this.mailMergeCampaignID);
    } else {
      this.mService.publishPageRoute("login");
    }
    this.resetInfoLeft();
  }

  resetInfoLeft() {
    this.mObj = {
      ID: null,
      Owner: null,
      OurRef: null,
      PAT: null,
      Applicant: null,
      ApplicationNo: null,
      ClassA: null,
      FilingDate: null,
      PriorTrademark: null,
      RegNo: null,
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

  onLoadData(mailMergeCampaignID) {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_ADDITIONAL_INFORMATION(mailMergeCampaignID)
      .then((data) => {
        this.nameCampaign = data.nameCampaign;
        this.tableHaveValue = true;
        data.array.forEach((e) => {
          data.array.FilingDate = moment(data.array.FilingDate).format(
            "DD-MM-YYYY"
          );
          if (e.checkDuplicate) {
            this.mDulicate.push(
              "Thông tin của liên hệ [" +
                e.OurRef +
                "] đã tồn tại ở chiến dịch: " +
                e.nameCampaign +
                "."
            );
          }
        });
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbData,
          });
        }
      });
  }

  onClickPagination(event) {
    this.onLoadData(this.mailMergeCampaignID);
  }

  onClickBtn(event) {
    console.log(event);
    this.mService
      .getApiService()
      .sendRequestDELETE_ADDITIONAL_INFORMATION(event.data)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message);
          this.onLoadData(this.mailMergeCampaignID);
        }
      });
  }

  onClickCell(event) {
    if (event) {
      if (event.clickDetail == CLICK_DETAIL.ADDITIONAL_INFORMATION) {
        this.mObj = event.data;
        this.addInfoInitialID = this.mObj.ID;
      }
    }
  }

  // Hàm hủy thông tin add infor
  onClickCancel() {
    this.mService
      .getApiService()
      .sendRequestGET_DETAIL_ADDITIONAL_INFORMATION(
        this.addInfoInitialID.toString()
      )
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          console.log(data);
          this.mObj = data.array;
        }
      });
  }

  // Hàm lưu thông tin add infor
  onClickSave() {
    console.log(this.mObj);
    let obj = {
      ID: this.mObj.ID ? this.mObj.ID : null,
      OurRef: this.mObj.OurRef ? this.mObj.OurRef : null,
      Applicant: this.mObj.Applicant ? this.mObj.Applicant : null,
      ApplicationNo: this.mObj.ApplicationNo ? this.mObj.ApplicationNo : null,
      ClassA: this.mObj.ClassA ? this.mObj.ClassA : null,
      FilingDate: moment(this.mObj.FilingDate).format("YYYY-MM-DD")
        ? this.mObj.FilingDate
        : null,
      PriorTrademark: this.mObj.PriorTrademark
        ? this.mObj.PriorTrademark
        : null,
      Owner: this.mObj.Owner ? this.mObj.Owner : null,
      RegNo: this.mObj.RegNo ? this.mObj.RegNo : null,
      ClassB: this.mObj.ClassB ? this.mObj.ClassB : null,
      Firm: this.mObj.Firm ? this.mObj.Firm : null,
      Address: this.mObj.Address ? this.mObj.Address : null,
      Tel: this.mObj.Tel ? this.mObj.Tel : null,
      Fax: this.mObj.Fax ? this.mObj.Fax : null,
      Email: this.mObj.Email ? this.mObj.Email : null,
      Status: this.mObj.Status ? this.mObj.Status : null,
      Rerminder: this.mObj.Rerminder ? this.mObj.Rerminder : null,
      UserID: this.mObj.UserID ? this.mObj.UserID : null,
      Description: this.mObj.Description ? this.mObj.Description : null,
      TimeRemind: this.mObj.TimeRemind ? this.mObj.TimeRemind : null,
      PAT: this.mObj.PAT ? this.mObj.PAT : null,
    };
    this.mService
      .getApiService()
      .sendRequestUPDATE_ADDITIONAL_INFORMATION(obj)
      .then((data) => {
        if (data.status == STATUS.SUCCESS && data.emailExist === false) {
          const dialogRef = this.dialog.open(DialogEmailErrorComponent, {
            width: "500px",
          });
        }
        else {
          this.mService.showSnackBar(data.message);
          this.onLoadData(this.mailMergeCampaignID);
          this.resetInfoLeft();
        }
      });
  }

  //Hàm thêm mới các add_info cho MailmergeCampaign
  OnClickAddNew() {
    this.mService.publishPageRoute("add-items-to-mailmerge-campaign", {
      mailMergeCampaignID: this.mailMergeCampaignID,
    });
  }

  //Hàm thực hiện gửi
  onClickSend() {
    this.tableHaveValue = false;
    this.mService
      .getApiService()
      .sendRequestSEND_MAILMERGE(this.mailMergeCampaignID.toString())
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message);
        }
      });
  }
}
