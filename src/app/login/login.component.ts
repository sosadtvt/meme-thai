import { Component, OnInit, OnDestroy,ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {MessageService} from 'primeng/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  
  email: any;
  password: any;
  storage: any;
  decoded: any;
  header: any;
  option: any;
  item:any;
  img: any;
  name: any;
  iduser: any;

  checkerrorLogin:any;
  constructor( @Inject(DOCUMENT) private document: Document,private http: HttpClient,private router: Router,) {
    this.checkerrorLogin = 0;
  }
  
  ngOnInit() {
    // this.document.body.classList.add('bodybg-color');
    // let response = await this.login();
    // console.log(response);
  }
  ngOnDestroy() {
    // remove the class form body tag
   // this.document.body.classList.add('bodybg-color');
  }
  login(){
    
    let json = {email : this.email,password : this.password};
    this.http.post('http://memthainode.comsciproject.com/login/loginUser', json)
              .subscribe(response =>{
                console.log("Login success");
                this.checkerrorLogin = 0;
                this.decoded = jwt_decode(response.toString());
                localStorage.setItem('TOKENIDUSER',this.decoded.id);
                localStorage.setItem('TOKEN',response.toString());

                    let token =  localStorage.getItem('TOKEN');
                    this.iduser = localStorage.getItem('TOKENIDUSER');

                    this.header = new HttpHeaders({
                      'Content-Type': 'application/json',
                      'authorization': 'Bearer ' + token
                    });
                    this.option = {
                      headers: this.header
                    }
                    this.http.get('http://memthainode.comsciproject.com/user/Users/'+this.iduser,this.option)
                                            .subscribe(response =>{
                                              localStorage.setItem('TOKENNAME',response[0].name.toString());
                                              localStorage.setItem('TOKENIMAGE',response[0].image.toString());

                                              this.router.navigateByUrl('/home');
                                               // this.router.navigateByUrl('/profile/'+this.decoded.id);
                                            }, error=>{
                                              console.log("fail");
                                            }); 
               
              }, error=>{
                this.checkerrorLogin = 1;
                console.log("Login fail");
              }); 
    
  }
}


