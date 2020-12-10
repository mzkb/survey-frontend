import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../survey.service";
import {SurveyResponse} from "../survey-response";
import {Question} from "../question";
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent implements OnInit {

  survey: SurveyResponse;
  questions: Question[];

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) {
    this.route.params.subscribe( params => this.load(params['uuid']));
  }

  ngOnInit(): void {
  }

  load(uuid: String) {
    console.log("Loading: " + uuid)
    this.surveyService.get(uuid).subscribe(data => {
      this.survey = data;
    })
  }

  onSubmit() {

  }
}
