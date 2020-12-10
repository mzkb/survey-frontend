import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";
import {SurveyResponse} from "../../models/survey-response";
import {UserSurveyResponse} from "../../models/user-survey-response";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-survey-take',
  templateUrl: './survey-take.component.html',
  styleUrls: ['./survey-take.component.css']
})
export class SurveyTakeComponent implements OnInit {

  surveyResponse: SurveyResponse;
  surveyTake: UserSurveyResponse;
  formGroup: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) {
    this.surveyTake = new UserSurveyResponse();
    this.route.params.subscribe(params => this.load(params['uuid']));
  }

  ngOnInit(): void {
  }

  private load(uuid: String) {
    this.surveyService.get(uuid).subscribe(data => {
      console.log(data);
      this.surveyResponse = data;
      this.populateFormGroup();
    });
  }

  private populateFormGroup() {
    let group = {}
    let questions = this.surveyResponse.questions;
    for (const question of questions) {
      group[question.question] = new FormControl('');
    }
    this.formGroup = new FormGroup(group);
  }

  onSubmit() {
  }
}
