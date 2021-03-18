import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  providers: [MessageService],
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  item:any;
  img: any;
  name: any;
  header: any;
  option: any;
  responseNew: any;
  iduser: any;
  ponse:any;
  uploadedFiles: any[] = [];
  displayBasic2: any;

  checkerrorUploadimage:any;
  constructor(private messageService: MessageService,private router:ActivatedRoute,private http: HttpClient,private routers: Router) {
    this.checkerrorUploadimage = 0;
   }

  ngOnInit(): void {
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    
  }
  
  selectedfile: any;
   selectFile(event: any){
     console.log("E1"+event);
    this.selectedfile = event.target.files[0];
    console.log("Se1"+this.selectedfile);
   }

  upload(){
    const fd = new FormData();
    fd.append('avatar',this.selectedfile);
    fd.append('id',this.iduser);
    this.http.post('http://memthainode.comsciproject.com/upload/profile', fd)
              .subscribe(response =>{
                this.checkerrorUploadimage = 0;
                console.log("Upload success");
           
                    let token =  localStorage.getItem('TOKEN');
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
                                }, error=>{
                                  console.log("fail");
                                }); 
              }, error=>{
                this.checkerrorUploadimage = 1;
                console.log("Upload fail");
              }); 
  }
  myUploader(event:any) {
    this.selectedfile = event.target.files[0];
}
  onUpload(event:any) {
    for(let file of event.files) {
     this.uploadedFiles.push(file);
      // this.selectedfile = file;
  }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
