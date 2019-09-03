import { Component, OnInit } from '@angular/core';
import { responseDefault } from '../_models/responseDefault';
import { MyServiceService } from '../_services/my-service.service';
import { CorexRegisterModel } from '../_models/CorexRegisterModel';
import { userAccountModel } from '../_models/userAccountModel';
import { CorexReserveTokensModel } from '../_models/CorexReserveTokensModel';
import { CorexReserveModel } from '../_models/CorexReserveModel';
import { CorexMoveTokensFromUserToUserModel } from '../_models/CorexMoveTokensFromUserToUserModel';
import { CorexExternalDataModel } from '../_models/CorexExternalDataModel';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe } from '@angular/common';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public show: boolean = true;
  Users: userAccountModel[];
  reserves: CorexReserveModel[];
  form: CorexRegisterModel = new CorexRegisterModel();
  reserve: CorexReserveTokensModel = new CorexReserveTokensModel();
  move: CorexMoveTokensFromUserToUserModel = new CorexMoveTokensFromUserToUserModel();
  wallets: any;
  showSpinner: boolean = false;
  reserveCurrency: any = 0;
  plus: any = "../assets/images/navigate_plus.png";
  cryptoListImage = [
    'dollar.png',
    'philippine-peso.png'
  ]
  cryptoListText = [
    'USD',
    'PHP'
  ]

  selectCurrency(currency: any, index: any) {
    this.wallets[index].currency = currency;
  }

  selectCurrencyReserve(currencyy: any) {
    this.reserveCurrency = currencyy;
  }

  addArr(index: any) {
    this.show = !this.show;
    if (this.wallets.length < 2) {
      this.wallets.push({
        'amount': '',
        'currency': 1,
        // 'fractionDigits': '',
      })
    }
  }

  constructor(
    private MyServiceService: MyServiceService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.hide();
    this.showSpinner = false;
    this.getUsers();
    this.getReserves();
    this.wallets = [
      {
        'amount': '',
        'currency': 0,
        // 'fractionDigits': '',
      }
    ];
  }

  getUsers() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.getUser().subscribe(res => {
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.Users = res.result;
        console.log(this.Users);
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
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

  registerEmployee() {
    this.showSpinner = true;
    this.spinner.show();
    var amount = [];
    var currency = [];
    for (let i = 0; this.wallets.length > i; i++) {
      if (this.wallets.length != 2) {
        this.spinner.hide();
        swal.fire('Oops...', 'Wallets should consist of PHP and USD; Kindly click the Plus Sign', 'error');
        return;
      } else {
        if (this.wallets[0].currency === this.wallets[1].currency) {
          this.spinner.hide();
          swal.fire('Oops...', 'Currency must not be the same!', 'error');
          console.log("Currency must not be the same!");
          return;
        } else {
          if (this.wallets[i].currency == 0) {
            currency.push("USD");
          } else {
            currency.push("PHP");
          }
          amount.push(this.wallets[i].amount);
          this.form.amount = amount;
          this.form.currency = currency;
        }
      }
    } // FOR LOOP
    this.MyServiceService.registerUser(this.form).subscribe(res => {
      if (res.status === 'CREATED') {
        this.spinner.hide();
        this.getUsers(); //override  list of registers
        swal.fire('Successfully Created a User!', res.message, 'success');
      } else if (res.status === 'Error') {
        this.spinner.hide();
        swal.fire('Failed to Create a User', res.message, 'error');
      } else {
        this.spinner.hide();
        swal.fire('Unkown Error', res.message, 'error');
      }
    } //this.MyServiceService.registerUser(this.form).subscribe
    ) //res    
  } //registerEmployee()


  reserveToken() {
    this.showSpinner = true;
    this.spinner.show();
    console.log(this.reserveCurrency);
    if (this.reserveCurrency = 1) {
      this.reserve.currency = 'PHP';
    } else {
      this.reserve.currency = 'USD';
    }
    this.MyServiceService.reserveToken(this.reserve).subscribe(res => {
      if (res.status === 'CREATED') {
        this.spinner.hide();
        swal.fire('Successfully Reserved Tokens!', res.message, 'success');
      } else if (res.status === 'Error') {
        this.spinner.hide();
        swal.fire('Failed to Move Tokens', res.message, 'error');
      } else {
        this.spinner.hide();
        swal.fire('Unkown Error', res.message, 'error');
      }
    })
  }

  moveTokenUser() {
    this.showSpinner = true;
    this.spinner.show();
    this.MyServiceService.moveTokenUser(this.move).subscribe(res => {
      console.log(res)
      if (res.status === 'CREATED') {
        this.spinner.hide();
        swal.fire('Successfully Moved Tokens!', res.message, 'success');
      } else if (res.status === 'Error') {
        this.spinner.hide();
        swal.fire('Failed to move a token', res.message, 'error');
      } else {
        this.spinner.hide();
        swal.fire('Unkown Error', res.message, 'error');
      }
    })
  }


}












