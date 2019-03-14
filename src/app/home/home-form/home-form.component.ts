import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
import {User} from '../user';

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
  // 子组件接收父组件传递的参数
  @Input() state: string; // 区分登录、注册状态
  @Input() key: number; // 区分相同id属性
  Form: FormGroup;
  loading = false;
  user: User = new User();
  checkUser = false;
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
  input = '';
  inputCode = '';

  constructor(private httpService: HttpService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.change();
    this.reset();
  }

  // 重置表单
  reset() {
    this.Form = this.fb.group({
      'uid': ['', Validators.compose([
        Validators.required, userIdValidator])],
      'userName': ['', Validators.required],
      'password': ['', Validators.required],
      'role': ['0']
    });

    // 输入框获得焦点时
    $('input').focus(function (event) {
      // label动态上升，升至顶部
      $(this).siblings('label').stop().animate({'bottom': '30px'}, 500);
      // div模拟的下边框伸出，其width动态改变至input的width
      $(this).next('.bottom-line').stop().animate({'width': '200px'}, 500);
    });

    // 输入框失去焦点时
    $('input').blur(function (event) {
      if ($(this).val() === '') {
        // label动态下降，恢复原位
        $(this).siblings('label').stop().animate({'bottom': '10px'}, 500);
        // 用div模拟的下边框缩回，其width动态恢复为默认宽度0
        $(this).next('.bottom-line').stop().animate({'width': '0'}, 500);
      }
    });
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

  // 验证验证码
  check() {
    this.inputCode = this.input.toUpperCase();
    if (this.inputCode.length === 0) {
      alert('请输入验证码！');
      return false;
    } else if (this.inputCode !== this.codes.toUpperCase()) {
      alert('验证码输入错误!请重新输入');
      this.change();
      this.input = '';
      return false;
    } else {
      return true;
    }
  }

  // 登录主界面
  login(data: any) {
    // 验证码校验错误,则禁止提交
    if (this.check() === false) {
      this.reset();
      return false;
    }
    this.loading = true;
    this.httpService.login(data).subscribe((res: any) => {
        if (res.extend.login === false) {
          alert('用户名或密码错误');
          this.reset();
          this.change();
          this.input = '';
          return false;
        }
        this.user.uid = data.uid;
        this.user.userName = res.extend.userName;
        this.user.role = Number.parseInt(data.role, 10);
        // 存储用户名并带用户id路由跳转
        if (this.user.role === 2) {
          sessionStorage.setItem('name', this.user.userName);
          this.router.navigate(['/main', {uid: this.user.uid}]);
        }
        // this.router.navigate(['/main']);
        // skipLocationChange设为true路由跳转时浏览器中的url会保持不变，但是传入的参数依然有效
        // this.router.navigate(['/main', {uid: this.user.uid}], {replaceUrl: true, skipLocationChange: true});
      }, (error) => {
        localStorage.removeItem('name');
        this.loading = false;
        alert(error);
      }, () => {
        this.reset();
        this.loading = false;
      }
    );
  }

// 注册
  register(data: any) {
    this.loading = true;
    this.httpService.register(data).subscribe((res: any) => {
        if (res.extend.register === false) {
          this.loading = false;
          this.checkUser = true; // 标记用户已注册
          return;
        }
        alert('注册成功');
      }, (error: any) => {
        this.loading = false;
        alert(error);
      }, () => {
        $('#登录').click();
        this.loading = false;
      }
    );
  }

// getter方法用于页面验证表单
  get uid() {
    return this.Form.get('uid');
  }

  get userName() {
    return this.Form.get('userName');
  }

  get password() {
    return this.Form.get('password');
  }
}
