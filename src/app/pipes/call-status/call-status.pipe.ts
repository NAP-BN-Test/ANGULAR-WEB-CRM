import { Pipe, PipeTransform } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { CALL_STATUS } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'callStatus'
})
export class CallStatusPipe implements PipeTransform {

  mTitle: any;

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.call_status;
    })
  }
  transform(value: any): any {
    if (value == CALL_STATUS.NO_ANSWER) {
      return this.mTitle.no_answer
    }
    else if (value == CALL_STATUS.BUSY) {
      return this.mTitle.busy
    }
    else if (value == CALL_STATUS.WRONG_NUMBER) {
      return this.mTitle.wrong_number
    }
    else if (value == CALL_STATUS.LEFT_MESSAGE) {
      return this.mTitle.left_message
    }
    else if (value == CALL_STATUS.LEFT_VOID) {
      return this.mTitle.left_void
    }
    else if (value == CALL_STATUS.CONNECTED) {
      return this.mTitle.connected
    }
    else {
      return " "
    }
  }

}
