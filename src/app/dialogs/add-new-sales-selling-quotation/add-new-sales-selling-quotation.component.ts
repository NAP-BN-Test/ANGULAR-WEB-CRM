import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatAccordion, MatTabChangeEvent } from "@angular/material";
import { AppModuleService } from "src/app/services/app-module.service";
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from "src/app/services/constant/app-constant";

@Component({
  selector: "app-add-new-sales-selling-quotation",
  templateUrl: "./add-new-sales-selling-quotation.component.html",
  styleUrls: ["./add-new-sales-selling-quotation.component.scss"],
})
export class AddNewSalesSellingQuotationComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  myForm: FormGroup;

  //data for component table
  listTbDataFCL = {
    listColum: [
      { name: "Charges List", cell: "chargesList" },
      { name: "Charge Type", cell: "chargeType" },
      { name: "Charge Per", cell: "chargePer" },
      { name: "Type Of Move", cell: "typeOfMove" },
      { name: "Route", cell: "route" },
      { name: "Selling", cell: "selling" },
      { name: "VAT Code", cell: "vatCode1" },
      { name: "Bying", cell: "bying" },
      { name: "VAT Code", cell: "vatCode2" },
      { name: "Share", cell: "share" },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  dataTemplateFCL = [
    {
      chargesList: "thc  Terminal Handling Charge",
      chargeType: "Local Charge",
      chargePer: "40 DC",
      typeOfMove: "Door to door",
      route: "HPH - HCM",
    },
    {
      chargesList: "thc  Terminal Handling Charge 1",
      chargeType: "Local Charge",
      chargePer: "40 DC",
      typeOfMove: "Door to door",
      route: "HPH - HCM",
    },
    {
      chargesList: "thc  Terminal Handling Charge 2",
      chargeType: "Local Charge",
      chargePer: "40 DC",
      typeOfMove: "Door to door",
      route: "HPH - HCM",
    },
  ];

  listTbDataLCL = {
    listColum: [
      { name: "Charges List", cell: "chargesList" },
      { name: "Charge Type", cell: "chargeType" },
      { name: "Charge Per", cell: "chargePer" },
      { name: "Type Of Move", cell: "typeOfMove" },
      { name: "Route", cell: "route" },
      { name: "Selling", cell: "selling" },
      { name: "VAT Code", cell: "vatCode1" },
      { name: "Bying", cell: "bying" },
      { name: "VAT Code", cell: "vatCode2" },
      { name: "Min Cost", cell: "minCost" },
      { name: "Share", cell: "share" },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  listTbDataProfit = {
    listColum: [
      { name: "Charges List", cell: "chargesList" },
      { name: "Charge Type", cell: "chargeType" },
      { name: "Charge Per", cell: "chargePer" },
      { name: "Type Of Move", cell: "typeOfMove" },
      { name: "Route", cell: "route" },
      { name: "Share/Refund To", cell: "shareRefundTo" },
      { name: "Ratio/Amount", cell: "ratioAmount" },
      { name: "% Tax Deduct", cell: "percentTaxDeduct" },
      { name: "Min/Shmt", cell: "minShmt" },
      { name: "Max/Shmt", cell: "maxShmt" },
      { name: "Share", cell: "share" },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService
  ) {
    this.myForm = this.formBuilder.group({
      id: [""],
      quoteNumber: [""],
      customer: [""],
      direction: [""],
      createDate: [""],
      quoteNumberTo: [""],
      type: [""],
      activeToDate: [""],
      contactPerson: [""],
      paymentMethod: [""],
      extend: [""],
      phone: [""],
      creditTerm: [""],
      email: [""],
      statusBG: [""],
      icon: [""],
      nationalFrom: [""],
      nationalTo: [""],
      service: [""],
      portFrom: [""],
      portTo: [""],
      shippingUnit: [""],
      parkFrom: [""],
      parkTo: [""],
      etc: [""],
      cfsFrom: [""],
      cfsTo: [""],
      etd: [""],
      receiver: [""],
      placeOfDelivery: [""],
      timeShipping: [""],
      countryInTransit: [""],
      portTransit: [""],
      hideCarrier: true,
      share: false,
      atCost: true,
      hideOnPrint: false,
      typeHHVC: "FCL",
      priceSell: "",
      unitPriceSell: "VND",
      postageFee: "",
      priceBuy: "Main Freight Charges",
      unitPriceBuy: "VND",
      unit: "40 DC",
      codeVAT: "Include VAT 2.5%",
      unitCodeVAT: "",
      maxWeight: "",
      unitMaxWeight: "KG",
      limitWeight: "",
      unitLimitWeight: "KG",
      minInvoice: "",
      unitMinInvoice: "VND",
      minFee: "",
      unitMinFee: "VND",
      limitWeightLA: "",
      unitLimitWeightLA: "KG",
      shareCheck: true,
      shareSelect: "PROFIT SHARE",
      shareFor: "",
      ratio: "",
      amountOfMoney: "",
      unitRatioAmount: "VND",
      taxPercentage: "",
      minChuyen: "",
      maxChuyen: "",
      route: "HPH - HCM",
    });
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      listData: this.dataTemplateFCL,
      listTbData: this.listTbDataFCL,
    });
  }

  onSubmit(value) {}

  // Bắt sự kiện khi đổi tabs
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index === 0) {
      this.mService.publishEvent(EVENT_PUSH.TABLE, {
        listData: this.dataTemplateFCL,
        listTbData: this.listTbDataFCL,
      });
    } else if (tabChangeEvent.index === 1) {
      this.mService.publishEvent(EVENT_PUSH.TABLE, {
        listData: this.dataTemplateFCL,
        listTbData: this.listTbDataLCL,
      });
    } else if (tabChangeEvent.index === 2) {
      this.mService.publishEvent(EVENT_PUSH.TABLE, {
        listData: this.dataTemplateFCL,
        listTbData: this.listTbDataProfit,
      });
    }
  };
}
