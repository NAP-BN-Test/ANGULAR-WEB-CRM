import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-dialog-assign-company',
  templateUrl: './dialog-assign-company.component.html',
  styleUrls: ['./dialog-assign-company.component.scss']
})
export class DialogAssignCompanyComponent implements OnInit {

  mData: any;

  listUser = [];

  userID = -1;

  constructor(
    public mService: AppModuleService,
    public dialogRef: MatDialogRef<DialogAssignCompanyComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.dialog;
    });
    this.mService.getApiService().sendRequestGET_LIST_USER(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
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
