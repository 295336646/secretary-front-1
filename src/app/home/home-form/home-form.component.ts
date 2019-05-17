import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
import {User} from '../user';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';

declare var $: any;

// 正则表达式验证用户ID是否是3-13位数字
function userIdValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^\d{3,13}$/)) {
    return {invalidUserId: true};
  }
}

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss']
})
export class HomeFormComponent implements OnInit {
  Form: FormGroup;
  loading = false;
  user: User = new User();
  // 验证码
  arrays: Array<any> = new Array(
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  );
  random: number;
  code = '';
  codes = '';
  input = ''; // 验证码输入框
  time: number = 0.5 * 60 * 60 * 1000; // cookie过期时间两个小时

  constructor(private httpService: HttpService, private _toastrService: ToastrService,
              private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
  }

  ngOnInit() {
    $(() => {
      $('#login #login-password').focus(() => {
        $('.login-owl').addClass('password');
      }).blur(() => {
        $('.login-owl').removeClass('password');
      });
    });
    this.change();
    this.Form = this.fb.group({
      'uid': ['', Validators.required],
      'password': ['', Validators.required],
      'role': ['0']
    });
  }

  // 重置表单
  reset() {
    // this.Form.reset({role: '2'});
    this.password.setValue('');
  }

  // 点击改变验证码
  change() {
    this.codes = '';
    for (let i = 0; i < 4; i++) {
      // 随机获取一个数组的下标
      this.random = Number.parseInt(String(Math.random() * this.arrays.length), 10);
      this.codes += this.arrays[this.random];
    }
    this.code = this.codes;
  }

  // 验证验证码和身份
  check() {
    const inputCode = this.input.toUpperCase();
    if (this.uid.invalid || this.password.invalid) {
      this._toastrService.error('用户名或密码不能为空', '', {
        closeButton: false,
        // disableTimeOut: true,
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });
      this.change();
      return false;
    }
    if (inputCode.length === 0) {
      this._toastrService.error('请输入验证码', '', {
        closeButton: false,
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });
      this.change();
      return false;
    } else if (inputCode !== this.codes.toUpperCase()) {
      this._toastrService.error('验证码输入错误！！！请重新输入！！！', '', {
        closeButton: false,
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });
      this.change();
      this.input = '';
      return false;
    }
    return true;
  }

  // 登录主界面
  login() {
    const data = this.Form.getRawValue();
    // 验证码校验错误,则禁止提交
    if (this.check() === false) {
      this.reset();
      return false;
    }
    this.loading = true;
    this.httpService.login(data).subscribe((res: any) => {
        if (res.extend.login === false) {
          this._toastrService.error('用户名或密码错误', '', {
            closeButton: false,
            timeOut: 1000,
            positionClass: 'toast-top-center',
          });
          this.reset();
          this.change();
          this.input = '';
          return false;
        }
        this.user.uid = data.uid;
        // this.user.userName = res.extend.userName;
        this.user.role = Number.parseInt(data.role, 10);
        // 存储用户名并带用户id路由跳转
        if (this.user.role === 0) {
          this.cookieService.set('userName', res.extend.userName, new Date(new Date().getTime() + this.time));
          this.cookieService.set('userId', data.uid, new Date(new Date().getTime() + this.time));
          this.router.navigate(['/student', {uid: this.user.uid}]);
        }
        if (this.user.role === 1) {
          this.cookieService.set('userName', res.extend.userName, new Date(new Date().getTime() + this.time));
          this.cookieService.set('userId', data.uid, new Date(new Date().getTime() + this.time));
          this.router.navigate(['/teacher', {uid: this.user.uid}]);
        }
        // 存储用户名并带用户id路由跳转
        if (this.user.role === 2) {
          this.cookieService.set('userName', res.extend.userName, new Date(new Date().getTime() + this.time));
          this.cookieService.set('userId', data.uid, new Date(new Date().getTime() + this.time));
          this.router.navigate(['/main', {uid: this.user.uid}]);
        }
        // this.router.navigate(['/main']);
        // skipLocationChange设为true路由跳转时浏览器中的url会保持不变，但是传入的参数依然有效
        // this.router.navigate(['/main', {uid: this.user.uid}], {replaceUrl: true, skipLocationChange: true});
      }, (error) => {
        this.loading = false;
        alert(error);
      }, () => {
        this.reset();
        this.loading = false;
      }
    );
  }

  get uid() {
    return this.Form.get('uid');
  }

  get password() {
    return this.Form.get('password');
  }

  get role() {
    return this.Form.get('role');
  }
}
