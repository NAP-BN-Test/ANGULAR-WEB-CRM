import { Pipe, PipeTransform } from '@angular/core';
import { COMPANY_ROLE } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'companyRole'
})
export class CompanyRolePipe implements PipeTransform {

  transform(value: any): any {
    if (value == COMPANY_ROLE.PARENT)
      return "Parent";
    else if (value == COMPANY_ROLE.CHILD) {
      return "Child"
    }
    else {
      return "Child"
    }
  }

}
