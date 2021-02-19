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

  ngOnInit(): void {}
  
}
