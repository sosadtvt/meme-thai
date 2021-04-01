import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  itemEdit: any;
  name: any;
  img: any;
  option: any;
  header: any;
  iduser: any;
  caption: any;
  responseNew: any;
  
  displayEditPost:any;
  myDialog:Boolean=false;
  
  checklike = new Array();
  checkerrorPost:any;
  checkerrorUploadimage2:any;

  displayDeletePost:any;
  displayPosition: any;
  displayPosition2: any;
  displayPosition3: any;
  position: any;
  constructor(private router:ActivatedRoute,private http: HttpClient,private messageService: MessageService) {
   
   }

  async ngOnInit() {
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    let token = localStorage.getItem('TOKEN');
////////////////////////////<<ดึงโพสต์มาแสดงหน้าฟีด>>//////////////////////////////////////////////////////////////////////////////////////
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    });
    this.option = {
      headers: this.header
    }
    await this.http.get('http://memthainode.comsciproject.com/post/selectPostversion2/'+this.iduser,this.option)
                            .toPromise().then(response =>{
                          
                              for(var i=0;i<Object.keys(response).length;i++){
                                  let json = {IDmy:this.iduser, IDpost:response[i].idpost}
                                  this.http.post('http://memthainode.comsciproject.com/like/checklike',json)//ดึงแต่ละโพสต์มาเช็คดูว่าเรากดไลค์หรือยัง
                                  .toPromise().then(response1 =>{
                                      if(response1 == 1){ //1 = เคยไลค์แล้ว
                                        this.checklike.push(1);
                                      }else{
                                        this.checklike.push(2);
                                      }
                                    
                                  }, error=>{
                                    console.log("เช็คไม่สำเร็จ");
                                  });
                              }
                              this.responseNew = response;
                            }); 

  }
////////////////////////////<<เลือกไฟล์ภาพและโพสต์รูปภาพ>>//////////////////////////////////////////////////////////////////////////////////////
  selectedfile: any;
  selectFile(event: any){
  this.checkerrorUploadimage2 = 1;
  this.checkerrorPost = 0;
  this.selectedfile = event.target.files[0];
  }
  upload(){
    const fd = new FormData();
    fd.append('IDuser_post',this.iduser);   
    if(this.caption === undefined){
      this.caption = " ";
      fd.append('caption',this.caption);
    }else{
      fd.append('caption',this.caption);
    }  
    fd.append('avatar',this.selectedfile);
    this.http.post('http://memthainode.comsciproject.com/post/createpost', fd)
              .subscribe(response =>{
                this.checkerrorPost = 0;
                this.myDialog = false;
                this.displayPosition3 = true;
                this.messageService.add({key: 'bl', severity:'success', summary: 'Success', detail: 'Success',life:3000});
              }, error=>{
                this.checkerrorUploadimage2 = 0;
                this.checkerrorPost = 1;
                console.log("post fail");
              }); 
  }
////////////////////////////<<แก้ไขโพสต์ตัวเอง>>//////////////////////////////////////////////////////////////////////////////////////
  EditMyPost(item: any){
    this.itemEdit = item;
    this.caption = item.caption;
    this.displayEditPost = true;
  }
  Editcaption(){
    this.displayEditPost = false;
    let json = {id : this.itemEdit.idpost,caption :this.caption};
    this.http.post('http://memthainode.comsciproject.com/post/editcaption',json)
              .subscribe(response =>{
                console.log("editcaption success");
                this.position = "bottom-left";
                this.displayPosition2 = true;
              }, error=>{
                console.log("editcaption fail");
              }); 
  }
////////////////////////////<<ลบโพสต์ตัวเอง>>//////////////////////////////////////////////////////////////////////////////////////
  DeletePost(){
      let json = {IDpost : this.itemEdit.idpost,IDmy:this.iduser};
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
                  console.log("delete success");
                  this.messageService.add({key: 'bl', severity:'success', summary: 'Success', detail: '',life:3000});
                  this.displayDeletePost = false;
                  this.displayEditPost = false;
                  this.position = "bottom-left";
                  this.displayPosition = true;
                }, error=>{
                  console.log("delete fail");
                }); 
  
  }
  showdeletepost(){
    this.displayDeletePost = true;
  }
  ////////////////////////////<<กดไลค์>>//////////////////////////////////////////////////////////////////////////////////////
  like(index:any,idpost:any){
    if(this.checklike[index]==2){//กดไลค์
      this.checklike[index]=1;
      let json = {IDmy:this.iduser,IDpost:idpost}
      this.http.post('http://memthainode.comsciproject.com/like/like',json)
      .subscribe(response =>{
      
      }, error=>{
        console.log("ไลค์ไม่สำเร็จ");
      });

    }else{//ยกเลิกไลค์
      this.checklike[index]=2;
      let json = {IDmy:this.iduser,IDpost:idpost}
      this.http.post('http://memthainode.comsciproject.com/like/unlike',json)
      .subscribe(response =>{
      
      }, error=>{
        console.log("ยกเลิกไลค์ไม่สำเร็จ");
      });
    }

    
  }
  showBasicDialog() {
    this.myDialog = true;
  }
}
