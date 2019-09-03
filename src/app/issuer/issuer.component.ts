import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../_services/my-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IssuerVerifyOrderModel } from '../_models/IssuerVerifyOrderModel';
import { CorexSelfIssueModel } from '../_models/CorexSelfIssueModel';
import swal from 'sweetalert2';
import { CorexFungibleTokenModel } from '../_models/CorexFungibleTokenModel';
import { CorexMoveFungibleTokensModel } from '../_models/CorexMoveFungibleTokensModel';
import { CorexOrderModel } from '../_models/CorexOrderModel';

@Component({
  selector: 'app-issuer',
  templateUrl: './issuer.component.html',
  styleUrls: ['./issuer.component.scss']
})
export class IssuerComponent implements OnInit {
  toBeVerified: IssuerVerifyOrderModel = new IssuerVerifyOrderModel();
  selfIssue: CorexSelfIssueModel = new CorexSelfIssueModel();
  getTokens: CorexFungibleTokenModel[];
  moveTokens: CorexMoveFungibleTokensModel = new CorexMoveFungibleTokensModel();
  showSpinner: boolean = false;
  Orders: CorexOrderModel[];
  currencyabc: any = 0;

  cryptoListImage = [
    'dollar.png',
    'philippine-peso.png'
  ]

  cryptoListText = [
    'USD',
    'PHP'
  ]

  selectCurrency(currency: any) {
    this.currencyabc = currency;
    console.log(this.currencyabc);
  }

  constructor(
    private MyServiceService: MyServiceService,
    private spinner: NgxSpinnerService
  ) { }

  

  ngOnInit() {
    this.spinner.hide();
    this.showSpinner = false;
    this.getToken();
    this.getOrders();
    this.selectCurrency(0);

  }

  getOrders() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getOrders().subscribe(res => {
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.Orders = res.result;
        // console.log(this.Orders)
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
      // console.log(this.getTokens);
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.getTokens = res.result;
        // console.log(this.getTokens)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  verifyToken() {
    this.showSpinner = true;
    this.spinner.show();
    for (let i = 0; this.Orders.length > i; i++){
      if (this.toBeVerified.linearId == this.Orders[i].linearId){
          if (this.Orders[i].status == 'verified'){
            swal.fire('Oops..','That Order is already verified.', 'warning');
            this.spinner.hide();
            console.log(this.Orders[i].status);
            return;
          }
          else {
            console.log(this.toBeVerified);
          }
      }
      else {
        console.log(this.Orders[i].linearId);
      }
    }
    this.MyServiceService.issuerVerifyOrder(this.toBeVerified).subscribe(res => {
      if (res.status === 'CREATED') {
        console.log(this.toBeVerified.linearId);
        this.spinner.hide();
        this.getOrders();
        swal.fire('Successfully verified an Order!', res.message, 'success');

      } else if (res.status === 'Error') {
        this.spinner.hide();
        swal.fire('Failed to verify an Order',
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

  selfIssueToken() {
    this.showSpinner = true;
    this.spinner.show();
    if (this.currencyabc = 1) {
      console.log(this.selfIssue.currency);
      this.selfIssue.currency = 'PHP';
    }
    else if (this.currencyabc = 0){
      console.log(this.selfIssue.currency);
      this.selfIssue.currency = 'USD';
    }
    else {
      console.log("otherssss");
      this.selfIssue.currency = 'USD';
    }
    this.MyServiceService.selfIssueToken(this.selfIssue).subscribe(res => {
      console.log(this.selfIssue);
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.getToken();
        swal.fire('Successfully Self-Issued tokens!', res.message, 'success');
      }
      else if (res.status === 'Error') {
        this.spinner.hide();
        swal.fire('Failed to verify an Order', res.message, 'error');
      }
      else {
        this.spinner.hide();
        swal.fire('Unkown Error', res.message, 'error');
      }
    })
  }

  moveToken2Platform() {
    this.showSpinner = true;
    this.spinner.show();
    for (let i = 0; this.Orders.length > i; i++){
      if (this.moveTokens.orderId == this.Orders[i].linearId){
        console.log("sameeeee");
        if (this.Orders[i].status == "processing"){
          this.spinner.hide();
          swal.fire('Oops..','That Order is not yet verified.', 'error');
          return;
        }
        else{
          console.log(this.Orders[i].status);
        }       
      }
      else {
        console.log(this.Orders[i].linearId,"not same");
      }
    }
    
    this.MyServiceService.moveTokenIssuer2Platform(this.moveTokens).subscribe(res => {
      console.log(this.moveTokens);
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.getOrders();
        swal.fire('Successfully Moved tokens!', res.message, 'success');
      }
      else if (res.status === 'Error') {
        this.spinner.hide();
        swal.fire('Failed to move tokens', res.message, 'error');
      }
      else {
        this.spinner.hide();
        swal.fire('Unkown Error', res.message, 'error');
      }
    }
    )
  }

}
