import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppModuleService } from "src/app/services/app-module.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-add-update-mailmerge-campaign",
  templateUrl: "./add-update-mailmerge-campaign.component.html",
  styleUrls: ["./add-update-mailmerge-campaign.component.scss"],
})
export class AddUpdateMailmergeCampaignComponent implements OnInit {
  myForm: FormGroup;
  filterListTemplate: Observable<string[]>;
  listTemplate = [];

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateMailmergeCampaignComponent>
  ) {
    this.myForm = this.formBuilder.group(
      {
        Name: [mData ? mData.Name : "", [Validators.required]],
        Template_ID: [mData ? mData.Template_ID : ""],
        Number_Address: [mData ? mData.Number_Address : ""],
        Description: [mData ? mData.Description : ""],
      },
      { validator: [this.checkRequire] }
    );
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.Name.value != "";

    if (requireName) return null;
    else return { require: true };
  }

  ngOnInit(): void {
    this.mService
      .getApiService()
      .sendRequestGET_ALL_MAILMERGE_TEMPLATE()
      .then((data) => {
        this.listTemplate = data.array;
        this.filterListTemplate = this.myForm.controls.Template_ID.valueChanges.pipe(
          startWith(""),
          map((value) => this._filter(value))
        );
      });
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listTemplate.filter(
      (option: any) => option.name.toLowerCase().includes(filterValue)
    );
  }

  onClickOk(event) {
    console.log(event.target.textContent.trim())
    let obj = this.listTemplate.find((item) => {
      return (
        item.name.toLowerCase() == this.myForm.value.Template_ID.toLowerCase()
      );
    });
    this.dialogRef.close({
      Name: this.myForm.value.Name,
      Template_ID: obj.id,
      Number_Address: this.myForm.value.Number_Address,
      Description: this.myForm.value.Description,
      textContent: event.target.textContent.trim()
    });
  }
}
