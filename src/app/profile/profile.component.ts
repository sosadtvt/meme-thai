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
  editEmail:any;
  editName:any;
  id;
  storage: any;
  display: boolean = false;
  position: any;
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
  
  ProfileDisplay(position: string){
    console.log(position);
    this.editName= this.name;
    this.editEmail= this.email;
    this.position = position;
    this.display = true;
  }
  
  editProfile(){

      console.log(this.editEmail);
      console.log(this.editName);
      this.name=this.editName ;
     this.email=this.editEmail ;
      this.display = false;
  };
  

}
