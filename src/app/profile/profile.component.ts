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
  checkCoutnmyfollow:any;
  countfollowing:any;
  imageshowclick = new Array();
  index:any;
  constructor(private router:ActivatedRoute,private http: HttpClient) {
    this.id = router.snapshot.params['id']; //ส่ง id มาหน้า profile
   }

  ngOnInit(): void {
    let token = localStorage.getItem('TOKEN');
    this.iduser = localStorage.getItem('TOKENIDUSER'); 
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
                              for(var i=0;i<Object.keys(response).length;i++){
                                this.imageshowclick[i] = response[i].image;
                              }
                            }, error=>{
                              console.log("fail");
                            });
////////////////////////////<<เช็คติดตาม>>//////////////////////////////////////////////////////////////////////////////////////  
    let json = {IDmy:this.iduser,IDfollowing:this.id}
    this.http.post('http://memthainode.comsciproject.com/follow/checkfollow',json)
    .subscribe(response =>{
      this.checkF = response;
    }, error=>{
      console.log("CheckFollow Error");
    });
////////////////////////////<<เช็คจำนวนคนที่เราติดตาม>>//////////////////////////////////////////////////////////////////////////////////////
    let json2 = {IDmy:this.id}
    this.http.post('http://memthainode.comsciproject.com/follow/countmyfollow',json2)
    .subscribe(response =>{
      this.checkCoutnmyfollow = response;
    }, error=>{
      console.log("countmyfollow Error");
    });
////////////////////////////<<เช็คคนที่มาติดตามเรา>>//////////////////////////////////////////////////////////////////////////////////////
    let json3 = {IDmy:this.id}
    this.http.post('http://memthainode.comsciproject.com/follow/countfollowing',json3)
    .subscribe(response =>{
      this.countfollowing = response;
    }, error=>{
      console.log("countfollowing Error");
    });
}
////////////////////////////<<กดติดตาม>>//////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////<<กดยกเลิกติดตาม>>//////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////<<โชว์ Dialog กดดูรูปภาพ>>//////////////////////////////////////////////////////////////////////////////////////
  showBasicDialog2(index:any){
    this.index = index;
    this.displayBasic2 = true;
  }
}
