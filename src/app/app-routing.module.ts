import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {SurveyListComponent} from "./components/survey-list/survey-list.component";
import {SurveyCreateComponent} from "./components/survey-create/survey-create.component";
import {SurveyQuestionComponent} from "./components/survey-question/survey-question.component";
import {SurveySendComponent} from "./components/survey-send/survey-send.component";
import {SurveyTakeComponent} from "./components/survey-take/survey-take.component";
import {SurveyResponseListComponent} from "./components/survey-response-list/survey-response-list.component";
import {SurveyResponseComponent} from "./components/survey-response/survey-response.component";
import {AuthGuardService as AuthGuard} from "./services/auth-guard.service";
import {LogoutComponent} from "./components/logout/logout.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'publisher/login',
    component: LoginComponent
  },
  {
    path: 'publisher/logout',
    component: LogoutComponent
  },
  {
    path: 'publisher/register',
    component: RegisterComponent
  },
  {
    path: 'publisher/survey',
    component: SurveyListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'publisher/survey/create',
    component: SurveyCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'publisher/survey/:uuid',
    component: SurveyQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'publisher/survey/send/:uuid',
    component: SurveySendComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'publisher/survey/response/:uuid',
    component: SurveyResponseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'survey/:uuid',
    component: SurveyTakeComponent
  },
  {
    path: 'response/:uuid',
    component: SurveyResponseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
