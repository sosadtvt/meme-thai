import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MegaMenuItem} from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
 
  
})
export class HeaderComponent implements OnInit {
  name:any;
  img:any;
  iduser:any;
  constructor (){
    
  }
   ngOnInit(){
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
   }
   clicklogout(){
     localStorage.removeItem('TOKENNAME');
     localStorage.removeItem('TOKENIMAGE');
     localStorage.removeItem('TOKENIDUSER');
     localStorage.removeItem('TOKEN');
   }
}

