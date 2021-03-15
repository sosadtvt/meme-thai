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

  checkerrorRegister:any;
  checkerrorcaptcha:any;

  check1 = 0;
  check2 = 0;
  check3 = 0;
  constructor(private http: HttpClient,private router: Router) {
    this.siteKey = "6LfiHTAaAAAAACPFlQ06s0dQ6H1NRp9qeKtNbGAx";
    this.checkerrorRegister=0;
    this.checkerrorcaptcha=0;
   }

  ngOnInit(): void {
  }

  register(){
    if(this.cap!==undefined){

      var Cemail = this.email;
      var rex = /(\s)/;
      if(Cemail.match(rex)){  this.check1=1;  }else{}
      var Cname = this.name;
      var rex = /(\s)/;
      if(Cname.match(rex)){  this.check2=1;  }else{}
      var Cpassword =  this.password;
      var rex = /(\s)/;
      if(Cpassword.match(rex)){  this.check3=1;  }else{}

        if(this.check1==0 && this.check2==0 && this.check3==0){
          let json = {email : this.email,name :this.name,password : this.password,status :this.status};
          this.http.post('http://memthainode.comsciproject.com/login/register', json)
                    .subscribe(response =>{
                      console.log("Register success");
                      this.router.navigateByUrl('/login');
                    }, error=>{
                      this.checkerrorRegister=1;
                      console.log("Register fail");
                    });
        }
        
      }
      else{
        this.checkerrorcaptcha=1;
      }
   }
    KeyCode(event:any){
      console.log(event.key);
        
        if(event.key=='a' || event.key=='b' || event.key=='c' || event.key=='d' || event.key=='e' || event.key=='f'
        || event.key=='g' || event.key=='h' || event.key=='i' || event.key=='j' || event.key=='k' || event.key=='l'
        || event.key=='m' || event.key=='n' || event.key=='o' || event.key=='p' || event.key=='q' || event.key=='r'
        || event.key=='s' || event.key=='t' || event.key=='u' || event.key=='v' || event.key=='w' || event.key=='x'
        || event.key=='y' || event.key=='z' ||
           event.key=='A' || event.key=='B' || event.key=='C' || event.key=='D' || event.key=='E' || event.key=='F'
        || event.key=='G' || event.key=='H' || event.key=='I' || event.key=='J' || event.key=='K' || event.key=='L'
        || event.key=='M' || event.key=='N' || event.key=='O' || event.key=='P' || event.key=='Q' || event.key=='R'
        || event.key=='S' || event.key=='T' || event.key=='U' || event.key=='V' || event.key=='W' || event.key=='X'
        || event.key=='Y' || event.key=='Z' ||
           event.key==0 || event.key==1 || event.key==2 || event.key==3 || event.key==4 || event.key==5
        || event.key==6 || event.key==7 || event.key==8 || event.key==9 || event.key=='_' || event.key=='@' 
        || event.key=='Shift' || event.key=='Backspace' || event.key=='.'){

          console.log("OK");
        }else{
          alert("กรอกได้เฉพาะ a-z,A-Z,0-9, และ '_' ");
          location.reload();
        }
    }
    noRightClick(event:any){
      if(event.button==2){
        alert("หน้านี้ไม่อนุญาติให้คลิกขวา");
        location.reload();
      }
    }
    ondragstart(){
      console.log("mousemove");
    }
    ondrop(event:any){
      console.log(event);
    }
  

}
