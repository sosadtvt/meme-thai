import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
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

  displayBasic2: any;
  constructor(private router:ActivatedRoute,private http: HttpClient) {
    console.log("Header constructor");
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    console.log(this.iduser);
   }

  ngOnInit(): void {
  }
  
  selectedfile: any;
  selectFile(event: any){
   this.selectedfile = event.target.files[0];
  }

  upload(){
    const fd = new FormData();
    fd.append('avatar',this.selectedfile);
    fd.append('id',this.iduser);
    this.http.post('http://memthainode.comsciproject.com/upload/profile', fd)
              .subscribe(response =>{
                console.log("Upload success");
                location.reload();
              }, error=>{
                console.log("Upload fail");
              }); 
  }

  showBasicDialog2(){
    this.displayBasic2 = true;
  }

}
