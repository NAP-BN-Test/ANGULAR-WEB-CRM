//author: GiHug 24/08/2020
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppModuleService } from "src/app/services/app-module.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Observable } from "rxjs";
import { AddressBookDetailComponent } from "src/app/components/address-book-detail/address-book-detail.component";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-add-update-contact-to-address-book",
  templateUrl: "./add-update-contact-to-address-book.component.html",
  styleUrls: ["./add-update-contact-to-address-book.component.scss"],
})
export class AddUpdateContactToAddressBookComponent implements OnInit {
  myForm: FormGroup;
  filterPosition: Observable<string[]>;
  listPosition = [];
  Status = "Active";

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddressBookDetailComponent>
  ) {
    this.myForm = this.formBuilder.group({
      FullName: [mData ? mData.FullName : ""],
      Position: [mData ? mData.Position : ""],
      Email: [mData ? mData.Email : ""],
      Phone: [mData ? mData.Phone : ""],
      Fax: [mData ? mData.Fax : ""],
      Activity: [mData ? mData.Status : this.Status],
      Note: [mData ? mData.Note : ""],
    });
  }

  ngOnInit(): void {
    this.mService
      .getApiService()
      .sendRequestGET_CATEGORY_JOB_TILE("")
      .then((data) => {
        this.listPosition = data.array;
        this.filterPosition = this.myForm.controls.Position.valueChanges.pipe(
          startWith(""),
          map((value) => this._filter(value))
        );
      });
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listPosition.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onClickOk(event) {
    let obj = this.listPosition.find((item) => {
      return (
        item.name.toLowerCase() == this.myForm.value.Position.toLowerCase()
      );
    });

    this.dialogRef.close({
      FullName: this.myForm.value.FullName,
      Position: returnIDOrNull(obj),
      Email: this.myForm.value.Email,
      Phone: this.myForm.value.Phone,
      Fax: this.myForm.value.Fax,
      Activity: this.myForm.value.Activity,
      Note: this.myForm.value.Note,
    });
  }
}

function returnIDOrNull(value) {
  if (value) {
    return value.id;
  }
  return null;
}
