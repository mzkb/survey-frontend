import { Component, OnInit } from '@angular/core';
import {UserQuestionResponse, UserSurveyResponse} from "../../models/user-survey-response";
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";
import {ResponseService} from "../../services/response.service";

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html'
})
export class SurveyResponseComponent implements OnInit {

  response: UserSurveyResponse;

  constructor(private route: ActivatedRoute, private router: Router, private responseService: ResponseService) {
    this.route.params.subscribe(params => this.load(params['uuid']));
  }

  ngOnInit(): void {
  }

  private load(uuid: string) {
    this.responseService.get(uuid).subscribe(data => {
      console.log(data);
      this.response = data;
    });
  }
}
