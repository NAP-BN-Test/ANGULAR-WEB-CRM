import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppModuleService } from "src/app/services/app-module.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-add-update-mailmerge-campaign",
  templateUrl: "./add-update-mailmerge-campaign.component.html",
  styleUrls: ["./add-update-mailmerge-campaign.component.scss"],
})
export class AddUpdateMailmergeCampaignComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateMailmergeCampaignComponent>
  ) {
    this.myForm = this.formBuilder.group(
      {
        name: [mData ? mData.name : "", [Validators.required]],
        template:[mData ? mData.name : ""],
      },
      { validator: [this.checkRequire] }
    );
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";

    if (requireName)
      return null;
    else return { require: true };
  }

  ngOnInit(): void {}
}
