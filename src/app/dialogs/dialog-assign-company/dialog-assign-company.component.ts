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

  mTitle: any;

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
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.dialog;
    });
    this.mService.getApiService().sendRequestGET_LIST_USER(


      
      
      1
    ).then(data => {
      setTimeout(() => {
        let rmAssign = this.mTitle.remove_assign;
        if (data.status == STATUS.SUCCESS) {
          this.listUser = data.array;

          this.listUser.unshift({ id: -1, name: rmAssign })
        }
      }, 300);
    })
  }

}
