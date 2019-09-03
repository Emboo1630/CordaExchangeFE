import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
// import {environment} from '../../../environments/environment';
// import {WebStorageService} from '../services/web-storage.service';
import { catchError, map, tap } from 'rxjs/operators';
// import { WebStorageService } from '../_services/web-storage.service';
import { environment } from 'src/environments/environment';
// import {TblUsers} from '../_table_user/tbl-users';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  // api request that are not affected by interceptor
  excludedRequests: any = [
    '/*',
    '/*/*',
    '/*/*/*',
  ];

  constructor(
    // private webStorage: WebStorageService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('http')) {
      request = request.clone({
        url: environment.URL1 + request.url
      });
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json;charset=UTF-8') });
    }
    // if (!this.excludedRequests.includes(request.url)) {
    //   request = request.clone({
    //     headers: request.headers.set('Authorization', `Bearer ${this.webStorage.get(TblUsers.USER_TOKEN)}`)
    //   });
    // }

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            // console.log(' all looks good');
            // // http response status code
            // console.log(event.status);
          }
        }, error => {
          // http response status code
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              // redirect to the Login route
              //   this.router.navigate(['/Login']);
            }
          }
          return of(error);
        })
      );
  }
}
