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
  checkerrorUploadimage2:any;

  value1:any;
  value2:any;
  value3:any;

  displayPosition:any;
  displayPosition2:any;
  position:any;

  value = 0;
  constructor(private messageService: MessageService,private router:ActivatedRoute,private http: HttpClient,private routers: Router) {
    this.checkerrorUploadimage = 0;
   }

  ngOnInit(): void {
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    let token =  localStorage.getItem('TOKEN');
////////////////////////////<<Selectข้อมูลเรา>>//////////////////////////////////////////////////////////////////////////////////////
  this.header = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': 'Bearer ' + token
  });
  this.option = {
    headers: this.header
  }
  this.http.get('http://memthainode.comsciproject.com/user/users/'+this.iduser,this.option)
                          .subscribe(response =>{
                            this.value1 = response[0].email;
                            this.value2 = response[0].name;
                            this.value3 = response[0].caption;
                          }, error=>{
                            console.log("selectข้อมูลเรา ไม่ได้");
                          });
  }

  edituser(){
      let json = {id:this.iduser,name:this.value2,caption:this.value3}
      this.http.post('http://memthainode.comsciproject.com/user/edituser',json)
      .subscribe(response =>{
        console.log("Update Success");
        localStorage.removeItem('TOKENNAME');
        localStorage.setItem('TOKENNAME',this.value2.toString());
        this.position = "bottom-left";
        this.displayPosition = true;
      }, error=>{
        console.log("Update Failed");
      });
  }
  
  selectedfile: any;
   selectFile(event: any){
    this.selectedfile = event.target.files[0];
    this.checkerrorUploadimage2 = 1;
    //console.log("sss"+this.checkerrorUploadimage2);
   }

  upload(){
    const fd = new FormData();
    fd.append('avatar',this.selectedfile);
    fd.append('id',this.iduser);
    this.http.post('http://memthainode.comsciproject.com/upload/profile', fd)
              .subscribe(response =>{
                this.checkerrorUploadimage = 0;
                
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
                                  
                                  this.displayPosition2 = true;

                                    let inter = setInterval(()=>{
                                      this.value+=6;
                                        if(this.value>=100){
                                          clearInterval(inter);
                                          setTimeout(()=>{
                                            this.checkerrorUploadimage2 == 1;
                                            location.reload();
                                          },1000);
                                        }
                                    },100); 

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
