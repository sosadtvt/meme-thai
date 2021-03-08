import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  item:any;
  img: any;
  id;
  name: any;
  header: any;
  option: any;
  responseNew: any;
  iduser: any;
  ponse:any;

  displayBasic2: any;

  constructor(private router:ActivatedRoute,private http: HttpClient) {
    this.id = router.snapshot.params['id'];
   }

  ngOnInit(): void {
    let token = localStorage.getItem('TOKEN');
    this.iduser = localStorage.getItem('TOKENIDUSER'); 
////////////////////////////<<Selectข้อมูลตัวเองมาเก็บไว้ในstorage>>////////////////////////////////////////////////////////////////////////////////////// 
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
                              //this.name = localStorage.getItem('TOKENNAME'); 
                              //this.img = response[0].image; 
                            }, error=>{
                              console.log("fail");
                            }); 
////////////////////////////<<Selectขอมูลผู้ใช้ที่เข้ามาหน้าprofile>>/////////////////////////////////////////////////////////////////////////////////////////////////
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    });
    this.option = {
      headers: this.header
    }
    this.http.get('http://memthainode.comsciproject.com/user/Users/'+this.id,this.option)
                            .subscribe(response =>{
                              this.name = response[0].name; 
                              this.img = response[0].image; 
                            }, error=>{
                              console.log("fail");
                            });                            
////////////////////////////<<Selectโพสต์>>//////////////////////////////////////////////////////////////////////////////////////
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    });
    this.option = {
      headers: this.header
    }
    this.http.get('http://memthainode.comsciproject.com/post/selectpostid/'+this.id,this.option)
                            .subscribe(response =>{
                              this.responseNew = response;
                            }, error=>{
                              console.log("fail");
                            });
////////////////////////////<<>>//////////////////////////////////////////////////////////////////////////////////////
  }
  showBasicDialog2(){
    this.displayBasic2 = true;
  }
}
