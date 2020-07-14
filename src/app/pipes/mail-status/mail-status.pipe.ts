import { Pipe, PipeTransform } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'mailStatus'
})
export class MailStatusPipe implements PipeTransform {

  mTitle: any;

  listStatus = [];

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.mail_status;
    });
    this.mService.getApiService().sendRequestGET_CATEGORY_MAIL_OUTCOME("").then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listStatus = data.array;
    })
  }
  transform(value: any): any {
    let obj = this.listStatus.find(item => {
      return item.id == value;
    })
    if (obj) return obj.name;
    else return " "
  }

}
