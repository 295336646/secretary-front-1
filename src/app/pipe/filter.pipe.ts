import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // 查询管道
  transform(products: any[], filter: string, keyword: string): any {
    return products.filter(product => {
      return product[filter].indexOf(keyword) >= 0;
    });
  }

}
