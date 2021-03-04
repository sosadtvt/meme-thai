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
    // this.iduser = localStorage.getItem('TOKENIDUSER'); 

    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    });
    this.option = {
      headers: this.header
    }
     
    this.http.get('http://memthainode.comsciproject.com/user/Users/'+this.id,this.option)
                            .subscribe(response =>{
                              //console.log("Select = "+JSON.stringify(response));
                              //console.log("Select img = "+response[0].image);
                              //console.log("NamLocalStorage = "+response[0].name);
                              localStorage.setItem('TOKENNAME',response[0].name.toString());
                              localStorage.setItem('TOKENIMAGE',response[0].image.toString());
                              localStorage.setItem('TOKENIDUSER',response[0].id.toString());
                              this.name = localStorage.getItem('TOKENNAME'); 
                              this.img = response[0].image; 
                              
                              // console.log("Response[0]");
                              // console.log(response[0]);
                            }, error=>{
                              console.log("fail");
                            }); 

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
                            console.log("responseNew");
                            console.log(this.responseNew);
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
    fd.append('avatar',this.selectedfile);
    fd.append('id',this.id);
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
