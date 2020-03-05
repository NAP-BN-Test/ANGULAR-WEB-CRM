import { Pipe, PipeTransform } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { TASK_TYPE } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'taskType'
})
export class TaskTypePipe implements PipeTransform {

  mData: any;

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.task_type;
    })
  }
  transform(value: any): any {
    if (value == TASK_TYPE.CALL) {
      return this.mData.call
    }
    else if (value == TASK_TYPE.EMAIL) {
      return this.mData.email
    }
    else if (value == TASK_TYPE.MEET) {
      return this.mData.meet
    }
    else {
      return "N/A"
    }
  }

}
