import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../_services/my-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { CorexOrderFlowModel } from '../_models/CorexOrderFlowModel';
import { CorexOrderModel } from '../_models/CorexOrderModel';
import { CorexReserveModel } from '../_models/CorexReserveModel';
import { CorexFungibleTokenModel } from '../_models/CorexFungibleTokenModel';
import { CorexTransferTokenModel } from '../_models/CorexTransferTokenModel';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  order: CorexOrderFlowModel = new CorexOrderFlowModel();
  Orders: CorexOrderModel[];
  reserves: CorexReserveModel[];
  getTokens: CorexFungibleTokenModel[];
  transfer: CorexTransferTokenModel = new CorexTransferTokenModel();
  showSpinner: boolean = false;
  
  constructor(
    private MyServiceService: MyServiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.hide();
    this.showSpinner = false;
    this.getOrders();
    this.getReserves();
    this.getToken();
  }


  orderToken() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.orderToken(this.order).subscribe(res => {

      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.getOrders();
        swal.fire('Successfully ordered a token!', res.message, 'success');

      } else if (res.status === 'Error') {
        this.spinner.hide();
        swal.fire('Failed to Order a token',
          res.message,
          'error');
      }
      else {
        this.spinner.hide();
        swal.fire('Unkown Error',
          res.message,
          'error');
      }
    })
  }

  getReserves() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getReserves().subscribe(res => {
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.reserves = res.result;
        console.log(this.reserves)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getOrders() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getOrders().subscribe(res => {
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.Orders = res.result;
        console.log(this.Orders)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getToken() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getTokens().subscribe(res => {
      console.log(this.getTokens);
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.getTokens = res.result;
        console.log(this.getTokens)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  transferToken() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.transferTokens(this.transfer).subscribe(res => {
      if (res.status == 'CREATED') {    
        this.spinner.hide();
        swal.fire('Successfully transferred a token!', res.message, 'success');
      }
      else if (res.status == 'ERROR') {   
        this.spinner.hide();
        swal.fire('Failed to transfer a token', res.message, 'error');
      }
      else {
        this.spinner.hide();
        swal.fire('Unknown Error', res.message, 'error');
      }
    })

  }
}
