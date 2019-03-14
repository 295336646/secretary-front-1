import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  // 空串匹配初始界面
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  // 注入路由守卫
  {path: 'home', component: HomeComponent},
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard]
  },
  // 任意匹配,目前没有写error界面，这里默认跳转初始界面
  // {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // 注入路由守卫
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
