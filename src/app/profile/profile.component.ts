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
  caption:any;
  indexidpost:any;
  displayBasic2: any;

  checkF:any;
  checkCoutnmyfollow:any;
  countfollowing:any;
  imageshowclick = new Array();
  captionshowclick = new Array();
  idpostshowclick = new Array();
  index:any;

  displayEditPost:any;
  displayDeletePost:any;

  displayPosition: any;
  displayPosition2: any;
  position: any;
  value = 0;
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
////////////////////////////<<Selectโพสต์ของผู้ใช้คนนั้น>>//////////////////////////////////////////////////////////////////////////////////////
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
                                this.captionshowclick[i] = response[i].caption;
                                this.idpostshowclick[i] = response[i].idpost;
                                //console.log("caption = "+this.captionshowclick[i]);
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
////////////////////////////<<แก้ไขโพสต์ตัวเองหน้าโปรไฟล>>//////////////////////////////////////////////////////////////////////////////////////
  EditMyPost(caption:any,index:any){
    this.indexidpost = index;
    this.displayEditPost = true;
    this.caption = caption;
  }
  Editcaption(){
    this.displayEditPost = false;
    let json = {id : this.idpostshowclick[this.indexidpost],caption :this.caption};
    this.http.post('http://memthainode.comsciproject.com/post/editcaption',json)
              .subscribe(response =>{
                this.position = "bottom-left";
                this.displayPosition = true;
                console.log("editcaption success");
              }, error=>{
                console.log("editcaption fail");
              }); 
  }
////////////////////////////<<โชว์ Dialog กดดูรูปภาพ>>//////////////////////////////////////////////////////////////////////////////////////
  showBasicDialog2(index:any){
    this.index = index;
    this.displayBasic2 = true;
  }
////////////////////////////<<ลบรูปโพสต์หน้าโปรไฟล>>//////////////////////////////////////////////////////////////////////////////////////
  DeletePost(){
    let json = {IDpost : this.idpostshowclick[this.indexidpost],IDmy:this.iduser};
    let token2 = localStorage.getItem('TOKEN');
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token2
    });
    this.option = {
      headers: this.header
    }
    this.http.post('http://memthainode.comsciproject.com/post/delete',json,this.option)
              .subscribe(response =>{
                this.displayDeletePost = false;
                this.displayBasic2 = false;
                this.displayEditPost = false;
                this.position = "bottom-left";
                this.displayPosition = true;

                  let inter = setInterval(()=>{
                    this.value+=20;
                      if(this.value>=100){
                        clearInterval(inter);
                        setTimeout(()=>{
                          location.reload();
                        },1000);
                      }
                  },100);

                console.log("delete success");
              }, error=>{
                console.log("delete Fail");
              }); 
  }
  showdeletepost(){
    this.displayDeletePost = true;
  }
////////////////////////////<<>>//////////////////////////////////////////////////////////////////////////////////////

}
