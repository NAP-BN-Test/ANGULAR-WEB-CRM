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
  labelPosition:
    | "Applicant"
    | "Representative"
    | "Member"
    | "Author"
    | "Govermment Agency"
    | "Other" = "Applicant";

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
        National: [""],
        Note: [""],
        Properties: ["", [Validators.required]],
      },
      { validator: [this.checkRequire] }
    );
  }

  checkRequire(group: FormGroup) {
    let requireFullName = group.controls.FullName.value != "";
    let requireAddress = group.controls.Address.value != "";
    if (
      requireFullName &&
      requireAddress
    ) {
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
  }

  private _filterNational(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listNational.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onClickSave(){
    let obj = this.listNational.find((item) => {
      return (
        item.name.toLowerCase() == this.myForm.value.National.toLowerCase()
      );
    });
    this.dialogRef.close({
      OldName: this.OldNameChecked,
      FullName: this.myForm.value.FullName,
      Address: this.myForm.value.Address,
      Email:this.myForm.value.Email,
      Phone:this.myForm.value.Phone,
      Fax:this.myForm.value.Fax,
      National: obj.id,
      Note: this.myForm.value.Note,
      Properties: this.myForm.value.Properties,
    });
  }
}
