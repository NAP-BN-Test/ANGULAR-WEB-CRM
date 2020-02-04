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
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_info;
    })
  }
  transform(value: any): any {
    if (value) {
      return this.mData.follow
    }
    else {
      return this.mData.unfollow
    }
  }

}
