import { Pipe, PipeTransform } from '@angular/core';
import { COMPANY_TYPE } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'companyType'
})
export class CompanyTypePipe implements PipeTransform {

  constructor() { }

  transform(value: any): any {

    let data = localStorage.getItem('data-local') != null ? JSON.parse(localStorage.getItem('data-local')) : null;
    if (data) {
      let mData = data.contact.company;
      if (value == COMPANY_TYPE.LICENCE)
        return mData.licence;
      else {
        return mData.trial;
      }
    }
    else return "";

  }
}
