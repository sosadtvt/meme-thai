import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  
  email: any;
  password: any;
  storage: any;

  constructor(private http: HttpClient,private router: Router) {
  }
  
  ngOnInit(): void {}

  login(){
    // console.log(this.email);
    // console.log(this.password);
    let json = {email : this.email,password : this.password};
    this.http.post('http://memthainode.comsciproject.com/login/loginUser', json)
              .subscribe(response =>{
                console.log("Login success");
                
                // this.storage = {
                //   nameStor: response["name"],
                //   emailStor: response["email"]
                // }
                //localStorage.setItem('storage',JSON.stringify(this.storage));

                //localStorage.setItem("email",response['name']);

                //console.log(response["name"]);
                this.router.navigateByUrl('/profile');
              }, error=>{
                console.log("Login fail");
              });
             
  }
}


