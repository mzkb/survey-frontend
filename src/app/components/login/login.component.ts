import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginRequest} from "../../models/login-request";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
    this.loginRequest = new LoginRequest();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginService.login(this.loginRequest).subscribe(
      resp => {
        this.loginService.setSession(resp);
        this.goToSurveyList();
      });
  }

  goToSurveyList() {
    this.router.navigate(['publisher/survey']);
  }

}
