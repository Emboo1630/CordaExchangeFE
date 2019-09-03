import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../_services/my-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private myService: MyServiceService) { }

  ngOnInit() {
    
  }

}
