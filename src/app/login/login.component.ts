import { Component, OnInit, OnDestroy,ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor( @Inject(DOCUMENT) private document: Document,private http: HttpClient,private router: Router,) {
  }
  
  ngOnInit() {
    this.document.body.classList.add('bodybg-color');
    // let response = await this.login();
    // console.log(response);
  }
  ngOnDestroy() {
    // remove the class form body tag
   // this.document.body.classList.add('bodybg-color');
  }
  login(){
    console.log(this.email);
    console.log(this.password);
    let json = {email : this.email,password : this.password};
    this.http.post('http://memthainode.comsciproject.com/login/loginUser', json)
              .subscribe(response =>{
                console.log("Login success");
                
                this.storage = {
                  idStor: response["id"],
                  nameStor: response["name"],
                  emailStor: response["email"]
                }
                localStorage.setItem('storage',JSON.stringify(this.storage));
                this.router.navigateByUrl('/profile');
              }, error=>{
                console.log("Login fail");
              }); 

    // let json = {email : this.email,password : this.password};  
    // let response = await this.http.post('http://memthainode.comsciproject.com/login/loginUser', json).toPromise();
    // return response;
  }
  
}


