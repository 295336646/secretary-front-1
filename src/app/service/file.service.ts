import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ConfigService} from './config.service';

const headers = new HttpHeaders().set(
  'Accept',
  '*/*'
);

@Injectable({
  providedIn: 'root'
})
export class FileService {
  Url = '/cl'; // 服务器访问地址
  constructor(private http: HttpClient, private config: ConfigService) {
  }

  // 显示所有文件
  showFiles(): Observable<any> {
    return this.http.get(`${this.Url}/showFiles`).pipe(catchError(this.config.handleError));
  }

  upload(uid: string, data: any): Observable<any> {
    return this.http.post(`${this.Url}/upload/${uid}`, data, {headers}).pipe(catchError(this.config.handleError));
  }
}
