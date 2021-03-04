import { Component, OnChanges , OnInit } from '@angular/core';
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
    console.log("Header constructor");
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    console.log(this.name);
  }
  ngOnChanges () {
    console.log("Header OnChanges");
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    console.log(this.name);
  }
   ngOnInit(){
    console.log("Header OnInit");;
    // this.name = localStorage.getItem('TOKENNAME');
    // this.img = localStorage.getItem('TOKENIMAGE');
    // this.iduser = localStorage.getItem('TOKENIDUSER');
     console.log(this.name);
   }
   clicklogout(){
     localStorage.removeItem('TOKENNAME');
     localStorage.removeItem('TOKENIMAGE');
     localStorage.removeItem('TOKENIDUSER');
     localStorage.removeItem('TOKEN');
   }
   
}

