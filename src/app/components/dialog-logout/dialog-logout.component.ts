import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.scss']
})
export class DialogLogoutComponent implements OnInit {

  mData: any;

  constructor(
    public mService: AppModuleService,
    public dialogRef: MatDialogRef<DialogLogoutComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.dialog;
    });
  }

}
