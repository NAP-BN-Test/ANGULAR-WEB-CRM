import { Pipe, PipeTransform } from '@angular/core';
import { COMPANY_TYPE } from 'src/app/services/constant/app-constant';
import { AppModuleService } from 'src/app/services/app-module.service';

@Pipe({
  name: 'companyType'
})
export class CompanyTypePipe implements PipeTransform {

  mData: any;

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.contact.company;
    })
  }

  transform(value: any): any {
    if (value == COMPANY_TYPE.LICENCE)
      return this.mData.licence;
    else {
      return this.mData.trial;
    }
  }

}
