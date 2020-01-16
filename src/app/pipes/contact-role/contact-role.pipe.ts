import { Pipe, PipeTransform } from '@angular/core';
import { CONTACT_ROLE } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'contactRole'
})
export class ContactRolePipe implements PipeTransform {

  transform(value: any): any {
    if (value == CONTACT_ROLE.MANAGE)
      return "Quản lý";
    else if (value == CONTACT_ROLE.STAFF) {
      return "Nhân viên"
    }
    else {
      return "Chưa cập nhật"
    }
  }

}
