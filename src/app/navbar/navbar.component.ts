import { Component, OnInit } from '@angular/core';
import { CorexExternalDataModel } from '../_models/CorexExternalDataModel';
import { MyServiceService } from '../_services/my-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showSpinner: Boolean = false;
  
  exchangeRate: CorexExternalDataModel[];
  php: any;
  date: any;


  


  constructor(
    private MyServiceService: MyServiceService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.showSpinner = false;
    this.getExchangeRate();
    
  }

  getExchangeRate() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getCurrentExchangeRate().subscribe(res => {
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.exchangeRate = res.result;
        this.php = this.exchangeRate.php;
        this.date = this.exchangeRate.date;
        // console.log(this.php);
        // console.log(this.exchangeRate);
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

}
