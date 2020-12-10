import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./login-request";
import * as moment from "moment";
import {LoginResponse} from "./login-response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = 'http://localhost:8080/login';
  }

  public login(login: LoginRequest) {
    return this.http.post<LoginResponse>(this.endpoint, login).subscribe(
      resp => LoginService.setSession(resp)
    );
  }

  public logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("expiry");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem("expiry");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public getJwt() {
    return localStorage.getItem('jwt');
  }

  private static setSession(loginResponse) {
    console.log(loginResponse);
    const expiresAt = moment().add(loginResponse.expires, 'second');

    localStorage.setItem('jwt', loginResponse.jwt);
    localStorage.setItem("expiry", JSON.stringify(expiresAt.valueOf()));
  }
}
