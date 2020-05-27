import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimeDefault'
})
export class DatetimeDefaultPipe implements PipeTransform {

  transform(value: any): any {

    if (value) {
      let date = moment.utc(value).format("YYYY-MM-DD HH:mm");
      return date;
    }
    else {
      return " "
    }
  }

}
