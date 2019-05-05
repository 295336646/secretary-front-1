import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {User} from '../../home/user';
import {ToastrService} from 'ngx-toastr';
import {HttpParams} from '@angular/common/http';
import {Group} from './Group';
import {Teacher} from './Teacher';

declare var $: any;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() user: User; // 当前用户
  loading = false; // 加载条
  groups = new Array<Group>(); // 当前组员
  teachers = new Array<Teacher>();  // 所有老师
  groupNum = 1; // 初始组
  unAllocatedTeachers = new Array<Teacher>(); // 存放未分配的老师
  allocatedTeachers = new Array<Teacher>(); // 存放已分配的老师
  currentLeaderId: string;  // 记录当前组长id
  currentLeaderName: string; // 记录当前组长姓名
  interval: any;
  time = 0;

  constructor(private httpService: HttpService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    const params = new HttpParams().set('groupNum', '' + this.groupNum);
    this.showGroup(params);
    this.getGroup(params);
    this.getUnAllocatedTeachers();
    this.interval = setInterval(() => {
      this.refresh();
      this.time++;
      if (this.time === 2) {
        this.cleInterval();
      }
    }, 500);
  }

  getGroup(params: HttpParams) {
    this.httpService.getGroupTeacher(params).subscribe((res: any) => {
      this.allocatedTeachers = res;
    }, (error: any) => {
      this._toastrService.error(error, '异常', {
        closeButton: false,
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });
    }, () => {
      this.allocatedTeachers.forEach((item: any) => {
        if (item['leader'] === 1) {
          this.currentLeaderId = item.tid;
          this.currentLeaderName = item.tname;
          this.refresh();
        }
      });
    });
  }

  getUnAllocatedTeachers() {
    this.httpService.showTeachers().subscribe((result: any) => {
      this.teachers = result;
      this.unAllocatedTeachers = this.teachers.filter(function (item) {
        return item.tgroup === 0;
      });
    });
  }

  refresh() {
    $('.selectpicker').selectpicker({
      style: 'btn-primary',
      // 设置下拉方向始终向下
      dropupAuto: false,
      size: 4,
    });
    $('#leader').selectpicker('val', this.currentLeaderId);
    $('.selectpicker').selectpicker('refresh');
    $('.selectpicker').selectpicker('render');
  }

  showGroup(params: HttpParams) {
    this.httpService.showGroup(params).subscribe((result: any) => {
        this.groups = result;
      }
    );
  }

  getSelected(op: any) {
    this.groupNum = op[0].value;
    const params = new HttpParams().set('groupNum', '' + this.groupNum);
    this.showGroup(params);
    this.getGroup(params);
  }

  cleInterval() {
    clearInterval(this.interval);
  }

  deleteTeacher(i: number, state: number) {
    if (state === 0) {
      this.unAllocatedTeachers.push(this.allocatedTeachers[i]);
      this.allocatedTeachers.splice(i, 1);
    }
    if (state === 1) {
      this.allocatedTeachers.push(this.unAllocatedTeachers[i]);
      this.unAllocatedTeachers.splice(i, 1);
    }
  }

  tSubmit(op: any, leaderOp: any) {
    this.loading = true;
    this.groupNum = op[0].value;
    const NewLeader = leaderOp[0].value;
    const teachers = {allocated: this.allocatedTeachers, unallocated: this.unAllocatedTeachers};
    this.httpService.dividedTeacher(this.groupNum, this.currentLeaderId, NewLeader, teachers).subscribe((res: any) => {
      if (res === true) {
        this._toastrService.success('分组成功', '', {
          closeButton: false,
          timeOut: 1000,
          positionClass: 'toast-top-center',
        });
      } else {
        this.getUnAllocatedTeachers();
        this._toastrService.error('分组失败', '', {
          closeButton: false,
          timeOut: 1000,
          positionClass: 'toast-top-center',
        });
      }
    }, (error: any) => {
      this._toastrService.error(error, '异常', {
        closeButton: false,
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });
    }, () => {
      this.loading = false;
      const params = new HttpParams().set('groupNum', '' + this.groupNum);
      this.getGroup(params);
    });
  }

  sSubmit() {
    this.loading = true;
    this.httpService.dividedGroup().subscribe((res: any) => {
      if (res === true) {
        this._toastrService.success('分组成功', '', {
          closeButton: false,
          timeOut: 1000,
          positionClass: 'toast-top-center',
        });
      } else {
        this._toastrService.error('分组失败', '', {
          closeButton: false,
          timeOut: 1000,
          positionClass: 'toast-top-center',
        });
      }
    }, (error: any) => {
      this._toastrService.error(error, '异常', {
        closeButton: false,
        timeOut: 1000,
        positionClass: 'toast-top-center',
      });
    }, () => {
      this.loading = false;
      const params = new HttpParams().set('groupNum', '' + this.groupNum);
      this.showGroup(params);
    });
  }

}
