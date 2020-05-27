import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'follow'
})
export class FollowPipe implements PipeTransform {

  constructor() { }

  transform(value: any): any {

    let data = localStorage.getItem('data-local') != null ? JSON.parse(localStorage.getItem('data-local')) : null;
    if (data) {
      let mData = data.company_info;
      if (value) {
        return mData.unfollow
      }
      else {
        return mData.follow
      }
    }
    else return "";

  }

}
