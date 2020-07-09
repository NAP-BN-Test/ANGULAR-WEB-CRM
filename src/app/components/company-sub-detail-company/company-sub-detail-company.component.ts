import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { STATUS } from 'src/app/services/constant/app-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-sub-detail-company',
  templateUrl: './company-sub-detail-company.component.html',
  styleUrls: ['./company-sub-detail-company.component.scss']
})
export class CompanySubDetailCompanyComponent implements OnInit {

  @Input('mObj') mObj: any;

  @Output('deleteFromCompany') deleteFromCompany = new EventEmitter();

  mTitle: any;

  mID = -1;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_sub_detail;
    });

    let params: any = this.mService.handleActivatedRoute();
    this.mID = params.companyID;
  }

  onClickDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.mService.getApiService().sendRequestDELETE_COMPANY_FROM_COMPANY(
          this.mObj.role,
          this.mID + "",
          this.mObj.id
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.deleteFromCompany.emit(this.mObj);
          }
        })
      }
    });
  }

  onClickDetail() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.mService.publishPageRoute('company-detail', { companyID: this.mObj.id });
    })
  }

}
