import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import * as $ from 'jquery';
import {AuthService} from '../service/auth.service';
import {User} from '../home/user';
import {FileService} from '../service/file.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  name: string;
  loading: boolean;
  user: User = new User();
  users: Array<User>;
  config: any = {
    animated: true,
    backdrop: 'static',
    keyboard: false
  };

  constructor(private authService: AuthService, private route: ActivatedRoute,
              private fileService: FileService) {
    this.name = sessionStorage.getItem('name');
    this.loading = true;
  }

  ngOnInit() {
    // 接收路由参数
    this.route.params.subscribe((params: Params) => {
      this.user.uid = params['uid'];
    });
    // 去除所有class属性，并为选中添加class属性，标记选中状态
    $('.menu-item').click(function () {
      $('.menu-item').removeClass('menu-item-active');
      $(this).addClass('menu-item-active');
      $('#report').hide();
      // $('.toast-warning.ngx-toastr.ng-trigger.ng-trigger-flyInOut').hide();
    });
  }

  report() {
    $('#file').click();
    $('#report').hide();
  }

  decline() {
    $('#report').hide();
  }

  // // 视图加载好后去除加载条
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  // 登出，清除信息并跳转至初始页面
  logout() {
    this.authService.logout();
  }

  showFiles() {
    // 展示所有文件
    this.fileService.showFiles().subscribe((res: any[]) => {
        // res.forEach((user) => {
        //   // 只显示自己上传的文件
        //   if (user.uid === this.user.uid) {
        //     this.user = user;
        //   }
        // });
        this.users = res;
      }
    );
  }
}

