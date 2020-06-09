import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-verify-email',
  templateUrl: './dialog-verify-email.component.html',
  styleUrls: ['./dialog-verify-email.component.scss']
})
export class DialogVerifyEmailComponent implements OnInit {

  mData: any;

  email = "";

  constructor(
    public mService: AppModuleService,
    public dialogRef: MatDialogRef<DialogVerifyEmailComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.dialog;
    });

    this.email = this.mService.getUser().email; 
  }

}
