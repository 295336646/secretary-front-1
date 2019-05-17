import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './service/http.service';
import {HomeComponent} from './home/home.component';
import {SecretaryComponent} from './main/secretary/secretary.component';
import {MainComponent} from './main/main.component';
import {AuthService} from './service/auth.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ConfigService} from './service/config.service';
import {NgxLoadingModule} from 'ngx-loading';
import {TabsModule} from 'ngx-bootstrap';
import {HomeFormComponent} from './home/home-form/home-form.component';
import {WeekDayPipe} from './pipe/week-day.pipe';
import {FileUploadModule} from 'ng2-file-upload';
import {UpdateComponent} from './main/update/update.component';
import {SecretaryModalComponent} from './main/secretary/secretary-modal-view/secretary-modal.component';
import {ModalModule} from 'ngx-bootstrap';
import {ProgressbarModule} from 'ngx-bootstrap';
import {GroupComponent} from './main/group/group.component';
import {ReplyGradeModalComponent} from './main/secretary/reply-grade-modal/reply-grade-modal.component';
import {MarkSheetComponent} from './main/secretary/mark-sheet/mark-sheet.component';
import {MarkReviewComponent} from './main/secretary/mark-review/mark-review.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import { GroupAllComponent } from './main/group-all/group-all.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecretaryComponent,
    MainComponent,
    HomeFormComponent,
    WeekDayPipe,
    UpdateComponent,
    SecretaryModalComponent,
    GroupComponent,
    ReplyGradeModalComponent,
    MarkSheetComponent,
    MarkReviewComponent,
    GroupAllComponent,
    StudentComponent,
    TeacherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 表单模块
    FormsModule,
    ReactiveFormsModule,
    // http模块
    HttpClientModule,
    // 加载模块
    NgxLoadingModule,
    // 动态选项卡模块
    TabsModule.forRoot(),
    // 文件上传模块
    FileUploadModule,
    // 模态框模块
    ModalModule.forRoot(),
    // 进度条模块
    ProgressbarModule.forRoot(),
    // 动画模块
    BrowserAnimationsModule,
    // 提示框模块
    ToastrModule.forRoot({positionClass: 'inline'}),
    ToastContainerModule
  ],
  // 注册服务
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, HttpService, AuthService, ConfigService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
