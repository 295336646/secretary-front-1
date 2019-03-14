import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
import {User} from '../../home/user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() user: User;

  constructor(private http: HttpService, private router: Router) {
  }

  ngOnInit() {
  }

  update(form: any) {
    if (form.rawPass === '' || form.newPass === '' || form.conPass === '') {
      alert('密码不能为空');
      return;
    }
    if (form.newPass !== form.conPass) {
      alert('密码不一致');
      return;
    }
    this.http.updatePass(this.user.uid, form).subscribe((res: any) => {
      if (res.extend.update === true) {
        alert('修改密码成功!');
        this.router.navigate(['/home']);
      } else {
        alert('原密码错误');
      }
    });
  }
}
