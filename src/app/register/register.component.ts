import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  siteKey : string ;
  cap: any;

  email: any;
  name: any;
  password: any;
  status: any = 0;
  
  constructor(private http: HttpClient,private router: Router) {
    this.siteKey = "6LfiHTAaAAAAACPFlQ06s0dQ6H1NRp9qeKtNbGAx";
   }

  ngOnInit(): void {
  }

  register(){
    if(this.cap!==undefined){
        console.log(this.email);
        console.log(this.name);
        console.log(this.password);
        console.log(this.status);
        let json = {email : this.email,name :this.name,password : this.password,status :this.status};
        this.http.post('http://memthainode.comsciproject.com/login/register', json)
                  .subscribe(response =>{
                    console.log("Register success");

                    // this.storage = {
                    //   nameStor: response["name"],
                    //   emailStor: response["email"]
                    // }

                    this.router.navigateByUrl('/login');
                  }, error=>{
                    console.log("Register fail");
                  });
      }
   }
}
