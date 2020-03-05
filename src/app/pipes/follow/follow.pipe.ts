import { Pipe, PipeTransform } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';


@Pipe({
  name: 'follow'
})
export class FollowPipe implements PipeTransform {

  mData: any;

  constructor(
    public mService: AppModuleService
  ) {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.company_info;
    })
  }
  transform(value: any): any {
    if (value) {
      return this.mData.unfollow
    }
    else {
      return this.mData.follow
    }
  }

}
