import { Component, OnInit } from "@angular/core";
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: "app-dialog-email-error",
  templateUrl: "./dialog-email-error.component.html",
  styleUrls: ["./dialog-email-error.component.scss"],
})
export class DialogEmailErrorComponent implements OnInit {
  constructor(
    public mService: AppModuleService,
    public dialogRef: MatDialogRef<DialogEmailErrorComponent>
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
