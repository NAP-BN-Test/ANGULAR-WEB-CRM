import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialogRef } from '@angular/material';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-dialog-assign-contact',
  templateUrl: './dialog-assign-contact.component.html',
  styleUrls: ['./dialog-assign-contact.component.scss']
})
export class DialogAssignContactComponent implements OnInit {
  
  mData: any;

  listUser = [];

  userID = -1;

  constructor(
    public mService: AppModuleService,
    public dialogRef: MatDialogRef<DialogAssignContactComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.dialog;
    });
    this.mService.getApiService().sendRequestGET_LIST_USER(
      
      
      this.mService.getUser().username,
      this.mService.getUser().id,
      1
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listUser = data.array;
      }
    })
  }

}
