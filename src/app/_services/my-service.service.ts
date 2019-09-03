import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { responseDefault } from '../_models/responseDefault';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getOwnerNode(): Observable<responseDefault> {
    return this.http.get<responseDefault>('/corex/me');
  }

  getPeers(): Observable<responseDefault> {
    return this.http.get<responseDefault>('/corex/peers');
  }

  getUser(): Observable<responseDefault>{
    return this.http.get<responseDefault>('/corex/get/users');
  }

  registerUser(object): Observable<responseDefault> {
    return this.http.post<responseDefault>('/corex/user/registration', object);
  }

  moveTokenUser(object): Observable<responseDefault> {
    return this.http.post<responseDefault>('/corex/user/move', object)
  }

  reserveToken(object): Observable<responseDefault> {
    return this.http.post<responseDefault>('/corexorder/order/reserve', object);
  }

  getReserves(): Observable<responseDefault>{
    return this.http.get<responseDefault>('/corexorder/get/reserve');
  }

  getOrders(): Observable<responseDefault>{
    return this.http.get<responseDefault>('/corexorder/get/order');
  }

  orderToken(object): Observable<responseDefault> {
    return this.http.post<responseDefault>('/corexorder/order/fungible', object);
  }

  issuerVerifyOrder(object): Observable<responseDefault> {
    return this.http.post<responseDefault>('/corexorder/verify/order', object);
  }

  selfIssueToken(object): Observable<responseDefault>{
    return this.http.post<responseDefault>('/corextoken/selfissue/fungible', object);
  }

  getTokens(): Observable<responseDefault>{
    return this.http.get<responseDefault>('/corextoken/get/fungible');
  }

  moveTokenIssuer2Platform(object): Observable<responseDefault> {
    return this.http.post<responseDefault>('/corextoken/move/fungible', object);
  }

  transferTokens(object): Observable<responseDefault>{
    return this.http.post<responseDefault>('/corex/platform/transfer', object);
  }

  getCurrentExchangeRate():Observable<responseDefault>{
    return this.http.get<responseDefault>('/externaldata/get');
  }










}
