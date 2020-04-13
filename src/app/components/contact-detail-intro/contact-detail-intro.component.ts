import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, LIST_SELECT } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contact-detail-intro',
  templateUrl: './contact-detail-intro.component.html',
  styleUrls: ['./contact-detail-intro.component.scss']
})
export class ContactDetailIntroComponent implements OnInit {
  @Output('createAction') createAction = new EventEmitter();
  @Output('updateCompany') updateCompany = new EventEmitter();

  mConpany: any;

  mData: any;

  mObj: any;

  listJobTile = LIST_SELECT.LIST_JOB_TILE;

  showToast = false;
  toasMessage = "";

  constructor(
    public mService: AppModuleService,
    public router: Router,
    private cookieService: CookieService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.company_info;
    });

    this.mService.getApiService().sendRequestGET_DETAIL_CONTACT(
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('contact-id') ? this.cookieService.get('contact-id') : null,
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mObj = data.obj;
      }
    });
  }

  onClickItem(index: number) {
    this.createAction.emit(index);
  }

  onInputChange(event, type) {
    let value = event.target.value;

    let contactName: string;
    let contactAddress: string;
    let contactPhone: string;
    let contactEmail: string;
    let contactJobTile: string;

    if (type == 1) contactName = value;
    else if (type == 3) contactAddress = value;
    else if (type == 4) contactPhone = value;
    else if (type == 5) contactEmail = value;
    else if (type == 6) contactJobTile = value;

    this.mService.getApiService().sendRequestUPDATE_CONTACT(
      this.mService.getUser().username,
      this.cookieService.get('contact-id') ? this.cookieService.get('contact-id') : null,
      contactName,
      contactAddress,
      contactPhone,
      contactEmail,
      contactJobTile
    )
  }

  onClickBack() {
    this.location.back();
  }

  onClickFollow() {
    this.mService.getApiService().sendRequestFOLLOW_CONTACT(
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.mObj.id, !this.mObj.follow ? true : null
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.mObj.follow = Boolean(data.follow);
        this.toasMessage = data.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
    })
  }

  onClickDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let listID = [];
        listID.push(this.mObj.id);

        this.mService.getApiService().sendRequestDELETE_CONTACT(
          
          
          this.mService.getUser().username,
          this.mService.getUser().id,
          JSON.stringify(listID)
        ).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.location.back();
          }
        })
      }
    });
  }

}
