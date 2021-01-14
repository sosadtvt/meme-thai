import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor() {}
  // displayBasic: boolean;
  // showBasicDialog() {
  //   this.displayBasic = true;
  // }
//   showResponse(event) {
//     this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
// }
  ngOnInit(): void {
  }

}


