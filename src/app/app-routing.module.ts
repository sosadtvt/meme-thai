import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {MenubarDemo} from './menubardemo';
import{HeaderComponent} from'./header/header.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
