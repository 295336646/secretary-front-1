import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from './config.service';
import {catchError} from 'rxjs/operators';
import {Grade} from '../main/secretary/grade';

const headers = new HttpHeaders().set(
  'Content-type',
  'application/json; charset=UTF-8'
);

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  Url = '/cl'; // 服务器访问地址

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  // 登录
  login(data: any): Observable<any> {
    return this.http.post(`${this.Url}/login`, data, {headers}).pipe(catchError(this.config.handleError));
  }

  // 注册
  register(data: any): Observable<any> {
    return this.http.post(`${this.Url}/register`, data, {headers}).pipe(catchError(this.config.handleError));
  }

  // 获取答辩表
  reply(params: HttpParams): Observable<any> {
    return this.http.get(`${this.Url}/reply`, {params}).pipe(catchError(this.config.handleError));
  }

  // 修改答辩表
  updateReply(id: string, data: any): Observable<any> {
    return this.http.put(`${this.Url}/updateReply/${id}`, data, {headers}).pipe(catchError(this.config.handleError));
  }

  //  修改密码
  updatePass(uid: string, data: any): Observable<any> {
    const params = new HttpParams().set('rawPass', data.rawPass).set('newPass', data.newPass);
    return this.http.put(`${this.Url}/updatePass/${uid}`, null, {params}).pipe(catchError(this.config.handleError));
  }

  // 分组
  groupAll(): Observable<any> {
    return this.http.get(`${this.Url}/showGroups`).pipe(catchError(this.config.handleError));
  }

  // 老师
  showTeachers(): Observable<any> {
    return this.http.get(`${this.Url}/showTeachers`).pipe(catchError(this.config.handleError));
  }

  // 学生
  showStudents(): Observable<any> {
    return this.http.get(`${this.Url}/showStudents`).pipe(catchError(this.config.handleError));
  }

  // 分组
  dividedGroup(id: string, sgroup: string, tjudge: string): Observable<any> {
    const params = new HttpParams().set('sgroup', sgroup).set('tjudge', tjudge);
    return this.http.put(`${this.Url}/dividedGroup/${id}`, null, {params}).pipe(catchError(this.config.handleError));
  }

  // 更新成绩
  updateGrade(grade: Grade, sid: String): Observable<any> {
    return this.http.put(`${this.Url}/updateGrade/${sid}`, grade, {headers}).pipe(catchError(this.config.handleError));
  }

  // 查看成绩
  getGrade(params: HttpParams): Observable<any> {
    return this.http.get(`${this.Url}/getGrade`, {params}).pipe(catchError(this.config.handleError));
  }
}
