import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginPageComponent,
    LoginRoutingModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginModule { }
