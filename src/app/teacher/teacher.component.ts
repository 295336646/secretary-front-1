import {Component, OnInit} from '@angular/core';
import {User} from '../home/user';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpService} from '../service/http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  user: User = new User();
  today: Date;

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
  }

// 登出，清除信息并跳转至初始页面
  logout() {
    this.httpService.logOut(this.user.uid).subscribe((res: any) => {
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
