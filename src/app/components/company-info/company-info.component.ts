import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  @Output('createAction') createAction = new EventEmitter();
  @Output('updateCompany') updateCompany = new EventEmitter();

  mConpany: any;

  mTitle: any;

  mObj: any;

  listCity = [];
  listStep = [];

  menuSelected = -1;

  

  constructor(
    public mService: AppModuleService,
    public router: Router,
    private cookieService: CookieService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_info;
    });

    this.mService.getApiService().sendRequestGET_DETAIL_COMPANY(
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mObj = data.obj;
      }
    });

    this.mService.getApiService().sendRequestGET_LIST_CITY(
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      this.listCity = data.array;
    })

    this.mService.getApiService().sendRequestGET_DEAL_STAGE(
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      this.listStep = data.array;
    })
  }

  onClickItem(index: number) {
    this.createAction.emit(index);
  }

  onInputChange(event, type) {

    let companyName: string;
    let companyShortName: string;
    let companyAddress: string;
    let companyPhone: string;
    let companyEmail: string;
    let companyCity: string;
    let website: string;
    let stageID: string;
    let timeActive: string;

    if (type == 1) companyName = event.target.value;
    else if (type == 2) companyShortName = event.target.value;
    else if (type == 3) companyAddress = event.target.value;
    else if (type == 4) companyPhone = event.target.value;
    else if (type == 5) companyEmail = event.target.value;
    else if (type == 6) companyCity = event.target.value.split(': ')[1];
    else if (type == 7) website = event.target.value;
    else if (type == 8) stageID = event.target.value.split(': ')[1];
    else if (type == 9) timeActive = event;
    
    this.mService.getApiService().sendRequestUPDATE_COMPANY(
      this.mService.getUser().username,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
      companyName,
      companyShortName,
      companyAddress,
      companyPhone,
      companyEmail,
      companyCity,
      website,
      stageID,
      timeActive
    )
  }

  onClickBack() {
    this.location.back();
  }

  onClickFollow() {
    this.mService.getApiService().sendRequestFOLLOW_COMPANY(


      this.mService.getUser().username,
      this.mService.getUser().id,
      this.mObj.id, !this.mObj.follow ? true : null
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.mObj.follow = Boolean(data.follow);
        this.mService.showSnackBar(data.message)
        
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

        this.mService.getApiService().sendRequestDELETE_COMPANY(


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
