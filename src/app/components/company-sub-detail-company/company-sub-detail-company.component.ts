import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-sub-detail-company',
  templateUrl: './company-sub-detail-company.component.html',
  styleUrls: ['./company-sub-detail-company.component.scss']
})
export class CompanySubDetailCompanyComponent implements OnInit {

  @Input('mObj') mObj: any;

  @Output('deleteFromCompany') deleteFromCompany = new EventEmitter();

  mData: any;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_sub_detail;
    });

  }

  onClickDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.mService.getApiService().sendRequestDELETE_COMPANY_FROM_COMPANY(
          
          
          this.mService.getUser().username,
          this.mService.getUser().id,
          this.mObj.role,
          this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
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
      this.router.navigate(['company-detail'], { state: { params: this.mObj } });
    })
  }

}
