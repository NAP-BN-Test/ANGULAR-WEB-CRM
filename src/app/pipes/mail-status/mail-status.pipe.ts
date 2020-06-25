import { Pipe, PipeTransform } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { MAIL_STATUS } from 'src/app/services/constant/app-constant';

@Pipe({
  name: 'mailStatus'
})
export class MailStatusPipe implements PipeTransform {

  mTitle: any;

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.mail_status;
    })
  }
  transform(value: any): any {
    if (value == MAIL_STATUS.SENT) {
      return this.mTitle.sent
    }
    else if (value == MAIL_STATUS.RECEIVED) {
      return this.mTitle.received
    }
    else if (value == MAIL_STATUS.ANSWERED) {
      return this.mTitle.answered
    }
    else if (value == MAIL_STATUS.WRONG_EMAIL) {
      return this.mTitle.wrong_email
    }
    else {
      return " "
    }
  }

}
