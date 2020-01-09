import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  @Input('mID') mID = -1;
  @Output('createAction') createAction = new EventEmitter();

  mConpany: any;

  mData: any;

  mObj: any;

  mDataSv = {
    name: "Nam An Phu JSC.",
    shortName: "NAP",
    address: "Linh Đàm, Hà Nội",
    phone: "0234 234 234",
    email: "info.namanphu@gmail.com",
    country: "Vietnam"
  }

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_info;
    });

    this.mService.getApiService().sendRequestGET_DETAIL_COMPANY("163.44.192.123", "loapao", this.mID).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.mObj = data.obj;
      }
    });
  }

  onClickItem(index: number) {
    this.createAction.emit(index);
  }

}
