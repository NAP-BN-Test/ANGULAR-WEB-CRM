import { Component, OnInit } from "@angular/core";
import { AppModuleService } from "src/app/services/app-module.service";
import { MatDialogRef } from "@angular/material";
import { STATUS } from "src/app/services/constant/app-constant";

@Component({
  selector: "app-dialog-add-mail-list",
  templateUrl: "./dialog-add-mail-list.component.html",
  styleUrls: ["./dialog-add-mail-list.component.scss"],
})
export class DialogAddMailListComponent implements OnInit {
  mTitle: any;

  listUser = [];

  userID = -1;

  constructor(
    public mService: AppModuleService,
    public dialogRef: MatDialogRef<DialogAddMailListComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mService
      .LoadTitle(
        localStorage.getItem("language-key") != null
          ? localStorage.getItem("language-key")
          : "VI"
      )
      .then((data: any) => {
        this.mTitle = data.dialog;
      });
    this.mService
      .getApiService()
      .sendRequestGET_MAIL_LIST_OPTION()
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.listUser = data.array;
        }
      });
  }
}
