import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-add-new-sales-selling-quotation",
  templateUrl: "./add-new-sales-selling-quotation.component.html",
  styleUrls: ["./add-new-sales-selling-quotation.component.scss"],
})
export class AddNewSalesSellingQuotationComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      id: [""],
      company: [""],
      address: [""],
      phone: [""],
      email: [""],
      fax: [""],
      customerGroup: [""],
      nation: [""],
      note: [""],
      relationship: [""],
    });
  }

  ngOnInit(): void {}

  onSubmit(value) {}
}
