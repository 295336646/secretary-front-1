import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // 查询管道
  transform(items: Array<any>, filter: string, keyword: string): any {
    return items.filter(item => {
      return item[filter].indexOf(keyword) >= 0;
    });
  }
}
