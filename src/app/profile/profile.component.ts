import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  img: any;
  id;
  
  email: any;
  name: any;
  editEmail:any;
  editName:any;
  //id: any;
  storage: any;
  display: boolean = false;
  position: any;
  constructor(private router:ActivatedRoute,private http: HttpClient) {
    this.id = router.snapshot.params['id'];
    this.http.get('http://memthainode.comsciproject.com/user/Users/'+this.id)
                            .subscribe(response =>{
                              console.log("Select = "+JSON.stringify(response));

                              console.log("Select img = "+response[0].image);
                              this.img = response[0].image;
                            }, error=>{
                              console.log("fail");
                            }); 

    // this.storage = JSON.parse(localStorage.getItem("storage") || '{}');
    // this.name = this.storage.nameStor;
    // this.email = this.storage.emailStor;
    // this.id = this.storage.idStor;
    // console.log("new "+this.name);
    // console.log("new "+this.email);
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

  ngOnInit(): void {

  }
  
  ProfileDisplay(position: string){
    // console.log(position);
    // this.editName= this.name;
    // this.editEmail= this.email;
    // this.position = position;
    // this.display = true;
  }
  
  editProfile(){

    //   console.log(this.editEmail);
    //   console.log(this.editName);
    //   this.name=this.editName ;
    //  this.email=this.editEmail ;
    //   this.display = false;
  };
  
}
