import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  email;
  name;
  id;
  storage: any;
  constructor(private router:ActivatedRoute) {

    this.storage = JSON.parse(localStorage.getItem("storage") || '{}');
    this.name = this.storage.nameStor;
    this.email = this.storage.emailStor;
    this.id = this.storage.idStor;
    console.log("new "+this.name);
    console.log("new "+this.email);
   }

  ngOnInit(): void {
  }

  // getstorage(){
  //   if(localStorage.getItem("storage") === null ){
  //     this.storage = [];
  //   }
  //   else{
  //     this.storage = JSON.parse(localStorage.getItem("storage"));
  //   }
  // }

}
