import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "./services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      console.error("NOT LOGGED IN !!!");
      return next.handle(request);
    }

    const jwt = this.loginService.getJwt();
    if (!jwt) {
      console.error("NO JWT !!!");
      return next.handle(request);
    }

    console.log("JWT: " + jwt)
    const cloned = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + jwt)
    });

    return next.handle(cloned);
  }
}
