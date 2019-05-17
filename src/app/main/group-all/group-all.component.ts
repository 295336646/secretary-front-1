import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {HttpParams} from '@angular/common/http';
import {PageInfo} from '../secretary/PageInfo';
import {Teacher} from '../group/Teacher';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-group-all',
  templateUrl: './group-all.component.html',
  styleUrls: ['./group-all.component.scss']
})
export class GroupAllComponent implements OnInit {
  pageInfo: PageInfo = new PageInfo(); // 分页信息
  down = 'javascript:void(0);';

  constructor(private httpService: HttpService, private _toastrService: ToastrService) {
    this.pageInfo.firstPage = '1'; // 初始页为第一页
  }

  ngOnInit() {
    const params = new HttpParams().set('pn', this.pageInfo.firstPage);
    this.getGroup(params);
  }

  getGroup(params: HttpParams) {
    this.httpService.groupAll(params).subscribe((result: any) => {
      this.pageInfo.groups = result.extend.pageInfo.list;
      this.pageInfo.pageNum = result.extend.pageInfo.pageNum;
      this.pageInfo.pages = result.extend.pageInfo.pages;
      this.pageInfo.total = result.extend.pageInfo.total;
      this.pageInfo.lastPage = result.extend.pageInfo.total;
      this.pageInfo.hasPreviousPage = result.extend.pageInfo.hasPreviousPage;
      this.pageInfo.hasNextPage = result.extend.pageInfo.hasNextPage;
      this.pageInfo.navigatepageNums = result.extend.pageInfo.navigatepageNums;
    });
  }

  // 跳转某页
  getPage(page_Num: string) {
    const params = new HttpParams().set('pn', page_Num);
    this.getGroup(params);
    return false;
  }

  // 跳转首页
  getFirstPage() {
    const params = new HttpParams().set('pn', this.pageInfo.firstPage);
    this.getGroup(params);
    return false;
  }

// 跳转前页
  getPreviousPage() {
    const params = new HttpParams().set('pn', (this.pageInfo.pageNum - 1).toString());
    this.getGroup(params);
    return false;
  }

// 跳转后页
  getNextPage() {
    const params = new HttpParams().set('pn', (this.pageInfo.pageNum + 1).toString());
    this.getGroup(params);
    return false;
  }

// 跳转末页
  getLastPage() {
    const params = new HttpParams().set('pn', this.pageInfo.lastPage);
    this.getGroup(params);
    return false;
  }

  checkUnallocated() {
    if (this.httpService.unAllocatedTeachers.length !== 0) {
      this._toastrService.error('请先分配好老师，再导出', '', {
        closeButton: false,
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else {
      this.down = 'http://localhost:8081/graduation/cl/downExcelSheet';
    }
  }
}
