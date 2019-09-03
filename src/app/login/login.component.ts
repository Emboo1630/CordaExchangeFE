import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../_services/my-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  constructor(private myService: MyServiceService) { }

  ngOnInit() {
   
  }

}
