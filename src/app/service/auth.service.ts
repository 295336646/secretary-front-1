import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  // 检测是否已经登录
  checkLogin(url: string): boolean {
    if (this.cookieService.get('userId')) {
      return true;
    }
    // 未登录成功，则不允许直接访问主页面，直接跳转至初始界面
    this.router.navigate(['/home']);
    return false;
  }
}
