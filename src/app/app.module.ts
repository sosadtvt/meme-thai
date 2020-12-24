import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { LoginComponent } from './login/login.component';
import {PasswordModule} from 'primeng/password';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
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




const appRutes:Routes=[

{path: 'login',component:LoginComponent},
{path: 'register',component:RegisterComponent},
{path: 'home',component:HomeComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    RouterModule.forRoot(appRutes),
    MenubarModule,
    MenuModule,
    TabViewModule,
    InputTextModule,
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    
    //InputTextModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
