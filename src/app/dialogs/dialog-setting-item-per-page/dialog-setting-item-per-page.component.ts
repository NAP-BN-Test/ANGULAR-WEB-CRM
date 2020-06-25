import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-setting-item-per-page',
  templateUrl: './dialog-setting-item-per-page.component.html',
  styleUrls: ['./dialog-setting-item-per-page.component.scss']
})
export class DialogSettingItemPerPageComponent implements OnInit {
  mTitle: any;

  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;

  constructor(
    public mService: AppModuleService,
    public dialogRef: MatDialogRef<DialogSettingItemPerPageComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.dialog;
    });
  }

}
