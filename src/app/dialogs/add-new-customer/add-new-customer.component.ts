//author: Gihug
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Observable } from "rxjs";
import { AppModuleService } from "src/app/services/app-module.service";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-add-new-customer",
  templateUrl: "./add-new-customer.component.html",
  styleUrls: ["./add-new-customer.component.scss"],
})
export class AddNewCustomerComponent implements OnInit {
  myForm: FormGroup;
  OldNameChecked: boolean = false;
  filterListNational: Observable<string[]>;
  listNational = [];
  filterListRelationship: Observable<string[]>;
  listRelationship = [];
  filterListCustomerGroup: Observable<string[]>;
  listCustomerGroup = [];

  listProperties: string[] = [
    "Applicant",
    "Representative",
    "Member",
    "Author",
    "Govermment Agency",
    "Other",
  ];
  selectedOptions = [];
  selectedOption;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddNewCustomerComponent>,
    public mService: AppModuleService
  ) {
    this.myForm = this.formBuilder.group(
      {
        OldName: [""],
        FullName: ["", [Validators.required]],
        Address: ["", [Validators.required]],
        Email: [""],
        Phone: [""],
        Fax: [""],
        CustomerGroup: [""],
        National: [""],
        Note: [""],
        Properties: [""],
        Relationship: [""],
      },
      { validator: [this.checkRequire] }
    );
  }

  checkRequire(group: FormGroup) {
    let requireFullName = group.controls.FullName.value != "";
    let requireAddress = group.controls.Address.value != "";
    if (requireFullName && requireAddress) {
      return null;
    } else return { require: true };
  }

  ngOnInit(): void {
    this.mService
      .getApiService()
      .sendRequestGET_ALL_CATEGORY_COUNTRY()
      .then((data) => {
        this.listNational = data.array;
        this.filterListNational = this.myForm.controls.National.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterNational(value))
        );
      });

    this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_COMPANY()
      .then((data) => {
        this.listRelationship = data.array;
        this.filterListRelationship = this.myForm.controls.Relationship.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterRelationship(value))
        );
      });

    this.mService
      .getApiService()
      .sendRequestGET_LIST_ALL_CUSTOMER_GROUP(null, null)
      .then((data) => {
        this.listCustomerGroup = data.array;
        this.filterListCustomerGroup = this.myForm.controls.CustomerGroup.valueChanges.pipe(
          startWith(""),
          map((value) => this._filterCustomerGroup(value))
        );
      });
  }

  private _filterNational(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listNational.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterRelationship(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listRelationship.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterCustomerGroup(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listCustomerGroup.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onClickSave() {
    let obj: any = this.listNational.find((item) => {
      return (
        item.name.toLowerCase() == this.myForm.value.National.toLowerCase()
      );
    });
    let _obj: any = this.listRelationship.find((item) => {
      return (
        item.name.toLowerCase() == this.myForm.value.Relationship.toLowerCase()
      );
    });
    let __obj: any = this.listCustomerGroup.find((item) => {
      return (
        item.name.toLowerCase() == this.myForm.value.CustomerGroup.toLowerCase()
      );
    });
    this.dialogRef.close({
      OldName: this.OldNameChecked,
      FullName: this.myForm.value.FullName,
      Address: this.myForm.value.Address,
      Email: this.myForm.value.Email,
      Phone: this.myForm.value.Phone,
      Fax: this.myForm.value.Fax,
      CustomerGroup: returnIDOrNull(__obj),
      National: returnIDOrNull(obj),
      Relationship: returnIDOrNull(_obj),
      Note: this.myForm.value.Note,
      Properties: this.myForm.value.Properties,
    });
  }

  onNgModelChange($event) {
    this.selectedOption = $event;
  }
}

function returnIDOrNull(value) {
  if (value) {
    return value.id;
  }
  return null;
}
