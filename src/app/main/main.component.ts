import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../home/user';
import {CookieService} from 'ngx-cookie-service';
import {HttpService} from '../service/http.service';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user: User = new User();
  today: Date;
  config: any = {
    animated: true,
    backdrop: 'static',
    keyboard: false
  };
  role = '';

  constructor(private router: Router, private route: ActivatedRoute,
              private cookieService: CookieService,
              private httpService: HttpService,
              private _toastrService: ToastrService) {
    this.user.userName = this.cookieService.get('userName');
    this.user.uid = this.cookieService.get('userId');
    setInterval(() => {
      this.today = new Date();
    }, 50);
  }

  ngOnInit() {
    $('#toggle').bootstrapSwitch({
      onText: '管理秘书',
      offText: '答辩秘书',
      onColor: 'success',
      offColor: 'info',
      labelText: '秘书',
      onInit: (event, state) => {
        this.reply();
      }, onSwitchChange: (event, state) => {
        if (state === true) {
          this.manage();
        } else {
          this.reply();
        }
      }
    });
    // 接收路由参数
    this.route.params.subscribe((params: Params) => {
      this.user.uid = params['uid'];
    });
    // 去除所有class属性，并为选中添加class属性，标记选中状态
    $('.menu-item').click(function () {
      $('.menu-item').removeClass('menu-item-active');
      $(this).addClass('menu-item-active');
      $('#report').hide();
      $('#role').hide();
    });
    $('.manage').hide();
  }

  reply() {
    this.role = '答辩秘书';
    $('.reply').show();
    $('.manage').hide();
  }

  manage() {
    this.role = '管理秘书';
    $('.manage').show();
    $('.reply').hide();
  }

  report() {
    this.reply();
    $('#group').click();
    $('#report').hide();
  }

  decline() {
    $('#report').hide();
  }

  // 登出，清除信息并跳转至初始页面
  logout() {
    this.httpService.logOut().subscribe((res: any) => {
      if (res === true) {
        this.cookieService.deleteAll();
      }
    }, error => {
      this._toastrService.error(error, '异常', {
        closeButton: false,
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });
    }, () => {
      this.router.navigate(['/home']);
    });
  }
}

