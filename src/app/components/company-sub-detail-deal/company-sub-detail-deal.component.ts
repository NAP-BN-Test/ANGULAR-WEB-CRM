import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-company-sub-detail-deal',
  templateUrl: './company-sub-detail-deal.component.html',
  styleUrls: ['./company-sub-detail-deal.component.scss']
})
export class CompanySubDetailDealComponent implements OnInit {

  @Input('mObj') mObj: any;
  @Input("listDealStage") listDealStage = [];

  @Output('deleteFromCompany') deleteFromCompany = new EventEmitter();


  mData: any;

  listWeek = [
    { index: 0, hasValue: false },
    { index: 1, hasValue: false },
    { index: 2, hasValue: false },
    { index: 3, hasValue: false },
    { index: 4, hasValue: false },
    { index: 5, hasValue: false },
    { index: 6, hasValue: false }
  ]

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_sub_detail;
    });
    this.onLoadStage();
  }

  onChangeStage() {
    this.mService.getApiService().sendRequestUPDATE_DEAL(
      
      
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.mObj.id,
      this.mObj.stageID
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.onLoadStage();
      }
    })
  }

  onLoadStage() {
    this.listWeek.forEach((item, i) => {
      if (i < Number(this.mObj.stageID)) {
        item.hasValue = true;
      } else {
        item.hasValue = false;
      }
    })
  }

  onClickDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.mService.getApiService().sendRequestDELETE_DEAL_FROM_COMPANY(
          
          
          this.mService.getUser().username,
          this.mService.getUser().id,
          this.mObj.id
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.deleteFromCompany.emit(this.mObj);
          }
        })
      }
    });
  }

}
