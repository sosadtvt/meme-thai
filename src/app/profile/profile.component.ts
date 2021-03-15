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

  checkF:any;

  constructor(private router:ActivatedRoute,private http: HttpClient) {
    this.id = router.snapshot.params['id'];
   }

  ngOnInit(): void {
    let token = localStorage.getItem('TOKEN');
    this.iduser = localStorage.getItem('TOKENIDUSER'); 
////////////////////////////<<Selectข้อมูลตัวเองมาเก็บไว้ในstorage>>////////////////////////////////////////////////////////////////////////////////////// 
    ///ย้ายไปหน้า login แล้ว
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
    this.http.get('http://memthainode.comsciproject.com/post/selectPostId/'+this.id,this.option)
                            .subscribe(response =>{
                              this.responseNew = response;
                            }, error=>{
                              console.log("fail");
                            });
////////////////////////////<<เช็คติดตาม>>//////////////////////////////////////////////////////////////////////////////////////  
    let json = {IDmy:this.iduser,IDfollowing:this.id}
    this.http.post('http://memthainode.comsciproject.com/follow/checkfollow',json)
    .subscribe(response =>{
      console.log("Check = "+response);
      console.log("IDmy = "+this.iduser);
      console.log("IDfollowing = "+this.id);
      this.checkF = response;
    }, error=>{
      console.log("CheckFollow Error");
    });
}

  follow(){
    let json = {IDmy:this.iduser,IDfollowing:this.id}
    this.http.post('http://memthainode.comsciproject.com/follow/follow',json)
    .subscribe(response =>{
      console.log("ติดตามแล้ว");
      location.reload();
    }, error=>{
      console.log("ติดตามไม่สำเร็จ");
    });
  }
  unfollow(){
    let json = {IDmy:this.iduser,IDfollowing:this.id}
    this.http.post('http://memthainode.comsciproject.com/follow/unfollow',json)
    .subscribe(response =>{
      console.log("ยกเลิกติดตามแล้ว");
      location.reload();
    }, error=>{
      console.log("ยกเลิกติดตามไม่สำเร็จ");
    });
  }

  showBasicDialog2(){
    this.displayBasic2 = true;
  }
}
