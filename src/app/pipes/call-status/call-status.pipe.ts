import { Pipe, PipeTransform } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { CALL_STATUS } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'callStatus'
})
export class CallStatusPipe implements PipeTransform {

  mData: any;

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.call_status;
    })
  }
  transform(value: any): any {
    if (value == CALL_STATUS.NO_ANSWER) {
      return this.mData.no_answer
    }
    else if (value == CALL_STATUS.BUSY) {
      return this.mData.busy
    }
    else if (value == CALL_STATUS.WRONG_NUMBER) {
      return this.mData.wrong_number
    }
    else if (value == CALL_STATUS.LEFT_MESSAGE) {
      return this.mData.left_message
    }
    else if (value == CALL_STATUS.LEFT_VOID) {
      return this.mData.left_void
    }
    else if (value == CALL_STATUS.CONNECTED) {
      return this.mData.connected
    }
    else {
      return "N/A"
    }
  }

}
