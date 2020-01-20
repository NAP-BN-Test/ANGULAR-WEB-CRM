import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

import * as moment from 'moment';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss']
})
export class AddDealComponent implements OnInit {
  @Input("listCompany") listCompany = [];
  @Input("listContact") listContact = [];
  @Input("listDealStage") listDealStage = [];

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  mData: any;

  btnCanClicked = true;

  showRemindDate = false;

  name = "";
  stageID = 0;
  amount = 0;
  dateClose = moment.utc().format("YYYY-MM-DD");
  companyID = -1;
  contactID = -1;
  dateRemind = moment.utc().format("YYYY-MM-DD");

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.add_sub_detail;
    });
  }

  onClickClose() {
    this.closeAddSub.emit()
  }


  onClickSave() {
    let obj = {
      name: this.name,
      companyID: this.companyID,
      contactID: this.contactID,
      stageID: this.stageID,
      timeClose: this.dateClose,
      timeRemind: this.dateRemind,
      amount: this.amount,
    }

    this.mService.getApiService().sendRequestADD_DEAL(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      obj
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeAddSub.emit(data.obj);
      }
    })
  }

  onPickDateRemind(event) {
    this.dateRemind = event;
  }

  onPickDateClose(event) {
    this.dateClose = event;
  }


  onInputChange(event) {
    this.showRemindDate = event.target.checked;
  }


}
