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
  checkerrorPost:any;//เช็คerror โพสต์ตอนไใ่ใส่รูปภาพ

  displayDeletePost:any;//เช็คการกดลบโพสต์
  constructor(private router:ActivatedRoute,private http: HttpClient,private messageService: MessageService) {
   
   }

  async ngOnInit() {
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    let token = localStorage.getItem('TOKEN');

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
                                  this.http.post('http://memthainode.comsciproject.com/like/checklike',json)
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

  selectedfile: any;
  selectFile(event: any){
   this.selectedfile = event.target.files[0];
  }

  upload(){
    const fd = new FormData();
    fd.append('IDuser_post',this.iduser);
    fd.append('caption',this.caption);
    fd.append('avatar',this.selectedfile);
    this.http.post('http://memthainode.comsciproject.com/post/createpost', fd)
              .subscribe(response =>{
                this.checkerrorPost = 0;
                console.log("post success");
                this.messageService.add({key: 'bl', severity:'success', summary: 'Success', detail: 'Success',life:3000});
                location.reload();
              }, error=>{
                this.checkerrorPost = 1;
                console.log("post fail");
              }); 
  }

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
                location.reload();
              }, error=>{
                console.log("editcaption fail");
              }); 
  }

  DeletePost(){
    
      let json = {idpost : this.itemEdit.idpost};
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
                  location.reload();
                }, error=>{
                  console.log("delete fail");
                }); 
  
  }
  
  showdeletepost(){
    this.displayDeletePost = true;
  }
  
  like(index:any,idpost:any){

    if(this.checklike[index]==2){
      this.checklike[index]=1;
      let json = {IDmy:this.iduser,IDpost:idpost}
      this.http.post('http://memthainode.comsciproject.com/like/like',json)
      .subscribe(response =>{
      
      }, error=>{
        console.log("ไลค์ไม่สำเร็จ");
      });

    }else{
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
