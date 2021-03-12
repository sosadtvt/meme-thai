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
  
  constructor(private router:ActivatedRoute,private http: HttpClient,private messageService: MessageService) {
    
   }

  ngOnInit(): void {
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
    this.http.get('http://memthainode.comsciproject.com/post/selectPostversion2/'+this.iduser,this.option)
                            .subscribe(response =>{
                              this.responseNew = response;
                            }, error=>{
                              console.log("fail");
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
                console.log("post success");
                this.messageService.add({key: 'bl', severity:'success', summary: 'Success', detail: 'Success',life:3000});
                location.reload();
              }, error=>{
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
  
  showBasicDialog() {
    this.myDialog = true;
}
}
