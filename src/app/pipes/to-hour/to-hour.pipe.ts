import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHour'
})
export class ToHourPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      if (Number(value) == 900) return "15'";
      else if (Number(value) == 1800) return "30'";
      else if (Number(value) == 3600) return "1h";
      else if (Number(value) == 7200) return "2h";
      else if (Number(value) == 10800) return "3h";
    } else {
      return " "
    }
  }

}
