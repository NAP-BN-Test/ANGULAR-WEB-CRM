import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na'
})
export class NaPipe implements PipeTransform {

  transform(value: any): any {
    if (value)
      return value;
    else
      return "Chưa cập nhật";
  }

}
