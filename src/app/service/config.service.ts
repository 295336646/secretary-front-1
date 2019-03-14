import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  constructor() {
  }

  // 处理服务器抛出的异常，前台打印出异常，方便测试
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 对客户端或网络错误进行相应地处理。
      console.error('错误发生:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `后端返回代码: ${error.status}, ` +
        `主要错误信息: ${error.error}`);
    }
    // 返回带有面向用户可观察错误消息，供前台处理
    return throwError(
      '服务器奔溃，请稍后重试!!!');
  }
}
