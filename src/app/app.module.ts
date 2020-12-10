import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PublisherService} from "./services/publisher.service";
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {SurveyService} from "./services/survey.service";
import {LoginService} from "./services/login.service";
import {SurveyListComponent} from './components/survey-list/survey-list.component';
import {SurveyCreateComponent} from './components/survey-create/survey-create.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {SurveyQuestionComponent} from './components/survey-question/survey-question.component';
import { SurveySendComponent } from './components/survey-send/survey-send.component';
import { SurveyTakeComponent } from './components/survey-take/survey-take.component';
import { SurveyResponseListComponent } from './components/survey-response-list/survey-response-list.component';
import { SurveyResponseComponent } from './components/survey-response/survey-response.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SurveyListComponent,
    SurveyCreateComponent,
    SurveyQuestionComponent,
    SurveySendComponent,
    SurveyTakeComponent,
    SurveyResponseListComponent,
    SurveyResponseComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    LoginService,
    PublisherService,
    SurveyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
