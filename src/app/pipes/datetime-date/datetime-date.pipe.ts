import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimeDate'
})
export class DatetimeDatePipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      let date = moment(value).format("YYYY-MM-DD");
      return date;
    }
    else {
      return "N/A"
    }
  }

}
