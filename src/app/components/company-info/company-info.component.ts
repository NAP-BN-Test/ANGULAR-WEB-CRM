import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

import * as moment from 'moment';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  @Output('createAction') createAction = new EventEmitter();
  @Output('updateCompany') updateCompany = new EventEmitter();

  mID = -1;

  mConpany: any;

  mTitle: any;

  mObj: any;

  listCity = [];
  listStep = [];

  menuSelected = -1;



  constructor(
    public mService: AppModuleService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_info;
    });

    let params: any = this.mService.handleActivatedRoute();
    this.mID = params.companyID;

    this.mService.getApiService().sendRequestGET_DETAIL_COMPANY(this.mID + "").then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mObj = data.obj;
      }
    });

    this.mService.getApiService().sendRequestGET_LIST_CITY().then(data => {
      this.listCity = data.array;
    })

    this.mService.getApiService().sendRequestGET_DEAL_STAGE().then(data => {
      this.listStep = data.array;
    })
  }

  onClickItem(index: number) {
    this.createAction.emit(index);
  }

  onInputChange(event, type) {

    let value;
    if (type != 6 && type != 8)
      value = event.target.value;
    else
      value = event.value

    let companyName: string;
    let companyShortName: string;
    let companyAddress: string;
    let companyPhone: string;
    let companyEmail: string;
    let companyCity: string;
    let website: string;
    let stageID: string;
    let timeActive: string;


    if (type == 1) companyName = value;
    else if (type == 2) companyShortName = value;
    else if (type == 3) companyAddress = value;
    else if (type == 4) companyPhone = value;
    else if (type == 5) companyEmail = value;
    else if (type == 6) companyCity = value;
    else if (type == 7) website = value;
    else if (type == 8) stageID = value;
    else if (type == 9) timeActive = moment(value).format("YYYY-MM-DD") ;


    this.mService.getApiService().sendRequestUPDATE_COMPANY(
      this.mID + "",
      companyName,
      companyShortName,
      companyAddress,
      companyPhone,
      companyEmail,
      companyCity,
      website,
      stageID,
      timeActive
    ).then(data => {
      this.mService.showSnackBar(data.message);
    })
  }

  onClickBack() {
    this.location.back();
  }

  onClickFollow() {
    this.mService.getApiService().sendRequestFOLLOW_COMPANY(
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
