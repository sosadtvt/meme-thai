import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import {MegaMenuItem} from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
 
  
})
export class HeaderComponent implements OnInit {
  name:any;
  img:any;
  iduser:any;
  option: any;
  header: any;
  token:any;

  selectedCountry: any;
  responseSearch: any;
  displayPositionLogOut: any;
  constructor (private http: HttpClient,private router: Router){
    this.name = localStorage.getItem('TOKENNAME');
    this.img = localStorage.getItem('TOKENIMAGE');
    this.iduser = localStorage.getItem('TOKENIDUSER');
    this.token = localStorage.getItem('TOKEN');
}

ngOnInit(){
   
}

outputfiltered: any;
filterCountry(event: any) {
    let filtered : any[] = [];
    let query = event.query;
    let data;
          this.header = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.token
          });
          this.option = {
            headers: this.header
          }
          this.http.get('http://memthainode.comsciproject.com/user/search/'+query,this.option)
                                  .subscribe(response =>{
                                    var keys = Object.keys(response);
                                    var len = keys.length;
                                    console.log("len = "+len);
                                    console.log("string = "+JSON.stringify(response));
                                    for(let i = 0 ; i < len ; i++){
                                      console.log("new = "+response[i].name);
                                      data = {
                                        "name": response[i].name,
                                        "id": response[i].id
                                      }
                                      filtered.push(data);
                                    }
                                    this.outputfiltered = filtered;
                                  }, error=>{
                                    console.log("fail");
                                  }); 
}
clickk(id:any){
  console.log("ID = "+id);
  window.location.href = "/profile/"+id;
}

clicklogout(){
  this.displayPositionLogOut=true;
}
RedirectLogin(){
  this.router.navigateByUrl('/login');
  localStorage.removeItem('TOKENNAME');
  localStorage.removeItem('TOKENIMAGE');
  localStorage.removeItem('TOKENIDUSER');
  localStorage.removeItem('TOKEN');
}
}

