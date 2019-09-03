import { Component, OnInit } from '@angular/core';
import { MyServiceService } from './_services/my-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cordex';


  constructor(private myService: MyServiceService) {

  }
  ngOnInit() {  
  }
}
