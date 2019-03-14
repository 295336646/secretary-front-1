import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {File} from 'src/app/main/file/file';
import {User} from '../../home/user';
import {FileService} from '../../service/file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input() user: User;
  @Input() users: Array<User>;
  uploader: FileUploader; // 上传文件工具
  file: File = new File();
  down = 'http://localhost:8080/cl/down?fileId='; // 下载文件地址
  disable = false; // false为设置选择文件可用
  progressbarValue: number; // 进度条值
  striped: boolean; // 进度条条纹
  type: string; // 进度条类型

  constructor(private fileService: FileService) {
    this.progressbarValue = 0;
    this.striped = true;
    this.type = 'danger';
  }

  ngOnInit() {
    // 配置路径，请求方法，以及上传参数
    this.uploader = new FileUploader({
      url: `/cl/upload/${this.user.uid}`,
      method: 'POST',
      itemAlias: 'file'
    });
  }

  // 选择文件时，进行某些操作
  selectedFileOnChanged(e: any) {
    // 判断是否选中文件，选中则更改文件名，否则置为空
    if (e.target.files[0]) {
      this.file.fileName = e.target.files[0].name;
    } else {
      this.file.fileName = '';
    }
    // 进度条初始状态
    this.progressbarValue = 0;
    this.type = 'danger';
    this.striped = true;
  }

  // 上传文件
  upload() {
    // 条纹状进度条
    this.striped = true;
    this.disable = true; // 上传时候禁用选择文件
    // 判断是否有文件
    if (!this.uploader.queue[0]) {
      alert('请先选择文件上传');
      return;
    } else { // 存在文件
      this.uploader.queue[0].upload(); // 开始上传
      this.uploader.queue[0].onProgress = (progress) => {// 记录进度
        this.progressbarValue = progress;
        if (this.progressbarValue >= 30 && this.progressbarValue < 60) {
          this.type = 'warning';
        } else if (this.progressbarValue > 60 && this.progressbarValue <= 90) {
          this.type = 'info';
        } else {
          this.type = 'success';
        }
      };
      this.uploader.queue[0].onSuccess = (response, status, headers) => {// 上传成功
        // 上传文件成功
        if (status === 200) {
          // 无条纹进度条
          this.striped = false;
          this.disable = false;
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
          this.file.fileName = '';
          this.uploader.clearQueue();
        } else {
          // 上传文件后获取服务器返回的数据错误
          alert('上传失败');
        }
      };
    }
  }

}
