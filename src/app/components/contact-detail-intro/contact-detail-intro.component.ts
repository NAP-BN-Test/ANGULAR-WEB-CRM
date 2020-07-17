import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS, LIST_SELECT } from 'src/app/services/constant/app-constant';
import { Location } from '@angular/common';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contact-detail-intro',
  templateUrl: './contact-detail-intro.component.html',
  styleUrls: ['./contact-detail-intro.component.scss']
})
export class ContactDetailIntroComponent implements OnInit {
  @Output('createAction') createAction = new EventEmitter();
  @Output('updateCompany') updateCompany = new EventEmitter();

  @Input('mID') mID;

  mConpany: any;

  mTitle: any;

  mObj: any;

  listJobTile = [];


  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private location: Location,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_info;
    });

    this.mService.getApiService().sendRequestGET_CATEGORY_JOB_TILE("").then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listJobTile = data.array;
        // data.array.forEach(item => {
        //   this.listJobTile.push({
        //     id: Number(item.id),
        //     name: item.name
        //   })
        // })
        // console.log(this.listJobTile);
      }


    })

    this.mService.getApiService().sendRequestGET_DETAIL_CONTACT(this.mID).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mObj = data.obj;
      }
    });
  }

  onClickItem(index: number) {
    this.createAction.emit(index);
  }

  onInputChange(event, type) {

    let value;
    if (type != 6)
      value = event.target.value;
    else
      value = event.value;

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
      this.mID,
      contactName,
      contactAddress,
      contactPhone,
      contactEmail,
      contactJobTile
    ).then(data => {
      this.mService.showSnackBar(data.message);
    })
  }

  onClickFollow() {
    this.mService.getApiService().sendRequestFOLLOW_CONTACT(this.mObj.id, !this.mObj.follow ? true : null).then(data => {
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

        this.mService.getApiService().sendRequestDELETE_CONTACT(JSON.stringify(listID)).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.location.back();
          }
        })
      }
    });
  }

}
