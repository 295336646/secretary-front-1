import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpService} from '../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss']
})
export class HomeFormComponent implements OnInit {
  // 子组件接收父组件传递的参数
  @Input() username: any;
  @Input() password: any;
  @Input() Form: FormGroup;
  @Input() state: string;
  loading = false;

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
  }

  login(data: any) {
    this.loading = true;
    this.httpService.login(data).subscribe((res: any) => {
        if (res.extend.userMsg === 'false') {
          alert('登录失败');
          return;
        }
        localStorage.setItem('name', data.username);
        this.router.navigate(['/main']);
        // skipLocationChange设为true路由跳转时浏览器中的url会保持不变，但是传入的参数依然有效
        // this.router.navigate(['/main', {name: data.username}], {replaceUrl: true, skipLocationChange: true});
      }, (error) => {
        localStorage.removeItem('name');
        this.loading = false;
        alert(error);
      }, () => {
        this.loading = false;
      }
    );
  }

  register(data: any) {
    console.log('你好');
  }

}
