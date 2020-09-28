import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppModuleService } from "src/app/services/app-module.service";
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from "src/app/services/constant/app-constant";

@Component({
  selector: "app-sales-selling-quotation",
  templateUrl: "./sales-selling-quotation.component.html",
  styleUrls: ["./sales-selling-quotation.component.scss"],
})
export class SalesSellingQuotationComponent implements OnInit {
  collectionSize: number;
  page: number = 1;

  //data for component table
  listTbData = {
    listColum: [
      { name: "", cell: "icon" },
      { name: "Báo giá số", cell: "quoteNumber" },
      { name: "Hiệu lực từ", cell: "activeFromDate" },
      { name: "Hiệu lực đến", cell: "activeToDate" },
      { name: "Dịch vụ", cell: "service" },
      { name: "Loại", cell: "type" },
      { name: "Tuyến", cell: "route" },
      { name: "Khách hàng", cell: "customer" },
      { name: "Hướng", cell: "direction" },
      { name: "Thanh toán", cell: "payment" },
      { name: "Cước VC", cell: "postageVC" },
      { name: "Chí phí khác", cell: "otherFee" },
      { name: "Phí NĐ & NN", cell: "feeNDNN" },
      { name: "Chia sẻ & HH", cell: "shareHH" },
      { name: "Phê duyệt", cell: "approval" },
      { name: "Người duyệt", cell: "approvedBy" },
      { name: "Người tạo", cell: "creater" },
      { name: "Ngày tạo", cell: "createDate" },
      { name: "Người sửa", cell: "editer" },
      { name: "Ngày sửa", cell: "editDate" },
      { name: "Thao tác", cell: undefined },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  dataTemplate = [
    {
      icon: true,
      quoteNumber: "Test000001",
      activeFromDate: "20/09/2020",
      activeToDate: "28/09/2020",
      service: "DOOR TO DOOR",
      type: "FCL",
      route: "HPH-HCM",
      customer: "ALP LOGISTIC",
      direction: "IM",
      payment: "Trả trước ",
      postageVC: "",
      otherFee: "",
      feeNDNN: " ",
      shareHH: "",
      approval: false,
      approvedBy: "Son_Lm",
      creater: "Son_Lm",
      createDate: "20/09/2020",
      editer: "Son_Lm",
      editDate: "20/09/2020",
    },
    {
      icon: false,
      quoteNumber: "Test000002",
      activeFromDate: "20/09/2020",
      activeToDate: "28/09/2020",
      service: "DOOR TO DOOR",
      type: "FCL",
      route: "HPH-HCM",
      customer: "ALP LOGISTIC",
      direction: "EX",
      payment: "Trả sau",
      postageVC: "",
      otherFee: "",
      feeNDNN: "",
      shareHH: "",
      approval: false,
      approvedBy: "Son_Lm",
      creater: "Son_Lm",
      createDate: "20/09/2020",
      editer: "Son_Lm",
      editDate: "20/09/2020",
    },
    {
      icon: true,
      quoteNumber: "Test000003",
      activeFromDate: "20/09/2020",
      activeToDate: "28/09/2020",
      service: "DOOR TO DOOR",
      type: "FCL",
      route: "HPH-HCM",
      customer: "ALP LOGISTIC",
      direction: "EX",
      payment: "Trả sau",
      postageVC: "",
      otherFee: "",
      feeNDNN: "",
      shareHH: "",
      approval: true,
      approvedBy: "Son_Lm",
      creater: "Son_Lm ",
      createDate: "20/09/2020",
      editer: "Son_Lm",
      editDate: "20/09/2020",
    },
  ];

  constructor(public mService: AppModuleService, public router: Router) {}

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      page: this.page,
      collectionSize: this.collectionSize,
      listData: this.dataTemplate,
      listTbData: this.listTbData,
    });
  }

  onClickAdd() {
    this.router.navigate(["add-new-sales-selling-quotation"]);
  }
}
