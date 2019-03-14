import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  // 检测是否已经登录
  checkLogin(url: string): boolean {
    if (sessionStorage.getItem('name')) {
      return true;
    }
    // 未登录成功，则不允许直接访问主页面，直接跳转至初始界面
    this.router.navigate(['/home']);
    return false;
  }

  // 登出，清除信息并跳转至初始页面
  logout() {
    sessionStorage.removeItem('name');
    this.router.navigate(['/home']);
  }
}
