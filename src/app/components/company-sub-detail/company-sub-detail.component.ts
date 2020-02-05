import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-company-sub-detail',
  templateUrl: './company-sub-detail.component.html',
  styleUrls: ['./company-sub-detail.component.scss']
})
export class CompanySubDetailComponent implements OnInit {
  @Output('addSubDetail') addSubDetail = new EventEmitter();

  @Input("listDealStage") listDealStage = [];

  mData: any;

  listContact = [];
  listCompany = [];
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
    this.mService.LoadTitles(1).then((data: any) => {
      this.mData = data.company_sub_detail;
    });

    this.mService.getApiService().sendRequestGET_LIST_QUICK_CONTACT(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    })

    this.mService.getApiService().sendRequestGET_LIST_QUICK_COMPANY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listCompany = data.array;
      }
    })

    this.mService.getApiService().sendRequestGET_LIST_QUICK_DEAL(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listDeal = data.array;
      }
    })

  }

  onClickAddSubDetail(index: number) {
    this.addSubDetail.emit(index);
  }

  onClickContact() {
    // let task = document.getElementById('contact-detail');


    // if (this.showContact) {
    //   this.contactDetail = "keyboard_arrow_right";

    //   task.classList.remove('detail-show');
    //   task.classList.add('detail-hide');
    // }
    // else {
    //   this.contactDetail = "keyboard_arrow_down";

    //   task.classList.remove('detail-hide');
    //   task.classList.add('detail-show');
    // }

    this.showContact = !this.showContact;
  }

  onClickCompany() {
    // let task = document.getElementById('company-detail');


    // if (this.showCompany) {
    //   this.companyDetail = "keyboard_arrow_right";

    //   task.classList.remove('detail-show');
    //   task.classList.add('detail-hide');
    // }
    // else {
    //   this.companyDetail = "keyboard_arrow_down";

    //   task.classList.remove('detail-hide');
    //   task.classList.add('detail-show');
    // }

    this.showCompany = !this.showCompany;
  }

  onClickDeal() {
    // let task = document.getElementById('deal-detail');


    // if (this.showDeal) {
    //   this.dealDetail = "keyboard_arrow_right";

    //   task.classList.remove('detail-show');
    //   task.classList.add('detail-hide');
    // }
    // else {
    //   this.dealDetail = "keyboard_arrow_down";

    //   task.classList.remove('detail-hide');
    //   task.classList.add('detail-show');
    // }

    this.showDeal = !this.showDeal;
  }

  onDeleteContactFromCompany(event) {
    let index = this.listContact.findIndex(item => {
      return item.id == event.id;
    });
    if (index > -1) {
      this.listContact.splice(index, 1);
    }
  }

  onDeleteCompanyFromCompany(event) {
    let index = this.listCompany.findIndex(item => {
      return item.id == event.id;
    });
    if (index > -1) {
      this.listCompany.splice(index, 1);
    }
  }

}
