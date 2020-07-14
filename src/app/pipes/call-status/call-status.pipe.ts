import { Pipe, PipeTransform } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'callStatus'
})
export class CallStatusPipe implements PipeTransform {

  mTitle: any;

  listCallStatus = [];

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.call_status;
    })
    this.mService.getApiService().sendRequestGET_CATEGORY_CALL_OUTCOME("").then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listCallStatus = data.array;
    })
  }
  transform(value: any): any {
    let obj = this.listCallStatus.find(item => {
      return item.id == value;
    })
    if (obj) return obj.name;
    else return " "

  }

}
