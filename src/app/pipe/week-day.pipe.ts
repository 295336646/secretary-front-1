import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'weekDay'
})
export class WeekDayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const weekArray = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
      const myDate = new Date(value);
      const week = weekArray[myDate.getDay()];
      return week;
    }
    return null;
  }

}
