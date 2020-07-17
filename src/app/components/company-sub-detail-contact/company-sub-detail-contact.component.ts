import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-company-sub-detail-contact',
  templateUrl: './company-sub-detail-contact.component.html',
  styleUrls: ['./company-sub-detail-contact.component.scss']
})
export class CompanySubDetailContactComponent implements OnInit {

  @Input('mObj') mObj: any;

  @Output('deleteFromCompany') deleteFromCompany = new EventEmitter();

  mTitle: any;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.mService.LoadTitles(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_sub_detail;
    });

  }

  onClickDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.mService.getApiService().sendRequestDELETE_CONTACT_FROM_COMPANY(this.mObj.id).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.deleteFromCompany.emit(this.mObj);
          }
        })
      }
    });
  }

  onClickDetail() {
    this.mService.publishPageRoute('contact-detail', { contactID: this.mObj.id });
  }

}
