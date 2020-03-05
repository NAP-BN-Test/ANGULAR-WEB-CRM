import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact-detail-other',
  templateUrl: './contact-detail-other.component.html',
  styleUrls: ['./contact-detail-other.component.scss']
})
export class ContactDetailOtherComponent implements OnInit {
  @Output('addSubDetail') addSubDetail = new EventEmitter();

  @Input("listDealStage") listDealStage = [];

  mData: any;

  listDeal = [];

  contactDetail = "keyboard_arrow_right";
  showContact = false;

  companyDetail = "keyboard_arrow_right";
  showCompany = false;

  dealDetail = "keyboard_arrow_right";
  showDeal = false;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) {

  }

  ngOnInit() {
    this.mService.LoadTitles(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.company_sub_detail;
    });

    this.mService.getApiService().sendRequestGET_LIST_QUICK_DEAL_FOR_CONTACT(
       
      
      this.mService.getUser().username,
      this.cookieService.get('contact-id') ? this.cookieService.get('contact-id') : null,
      ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listDeal = data.array;
      }
    })

  }

  onClickAddSubDetail(index: number) {
    this.addSubDetail.emit(index);
  }

  onClickDeal() {
    this.showDeal = !this.showDeal;
  }

  onDeleteDealFromCompany(event) {
    let index = this.listDeal.findIndex(item => {
      return item.id == event.id;
    });
    if (index > -1) {
      this.listDeal.splice(index, 1);
    }
  }

}
