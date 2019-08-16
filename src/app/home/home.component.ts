import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  cryptoListImage = [
    '',
    'coin-btc.png',
    'coin-eth.png',
    'coin-bnb.png',
    'coin-pax.png'
  ]
  cryptoListText = [
    '',
    'BTC',
    'ETH',
    'BNB',
    'PAX'
  ]
  ngOnInit() {
  } 

  cryptoImage : any = 1;
  selectCrypto(number: any){
    this.cryptoImage = number;
  }

}
