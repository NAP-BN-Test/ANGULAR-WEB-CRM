import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimeFull'
})
export class DatetimeFullPipe implements PipeTransform {

  transform(value: any): any {

    if (value) {
      let date = moment.utc(value).format("YYYY-MM-DD");
      let time = moment.utc(value).format("LT")
      return date + " at " + time;
    }
    else {
      return "N/A"
    }
  }

}
