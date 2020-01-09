import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimeTime'
})
export class DatetimeTimePipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      let time = moment.utc(value).format("LT")
      return time;
    }
    else {
      return "N/A"
    }
  }

}
