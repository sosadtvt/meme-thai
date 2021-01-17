import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
//import {InputTextModule} from 'primeng/inputtext';
import {Routes,RouterModule} from "@angular/router";
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {MegaMenuItem} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
//import {CaptchaModule} from 'primeng/captcha';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
 

////////////////Router///////////
import{HeaderComponent} from'./header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { from } from 'rxjs';

const appRutes:Routes=[
{path: '',component:LoginComponent},
{path: 'login',component:LoginComponent},
{path: 'register',component:RegisterComponent},
{path: 'home',component:HomeComponent},
{path: 'profile',component:ProfileComponent},

];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    MenubarModule,
    MenuModule,
    TabViewModule,
    InputTextModule,
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    DialogModule,
    RouterModule.forRoot(appRutes),
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule
    //CaptchaModule
    
    //InputTextModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
