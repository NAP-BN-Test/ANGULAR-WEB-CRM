import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimeTimeDefault'
})
export class DatetimeTimeDefaultPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      let time = moment.utc(value).format("HH:mm")
      return time;
    }
    else {
      return " "
    }
  }

}
