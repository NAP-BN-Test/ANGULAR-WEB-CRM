import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatAccordion } from "@angular/material";

@Component({
  selector: "app-add-new-sales-selling-quotation",
  templateUrl: "./add-new-sales-selling-quotation.component.html",
  styleUrls: ["./add-new-sales-selling-quotation.component.scss"],
})
export class AddNewSalesSellingQuotationComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    });
  }

  ngOnInit(): void {}

  onSubmit(value) {}
}
