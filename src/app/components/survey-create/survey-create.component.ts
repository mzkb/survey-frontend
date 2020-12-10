import {Component, OnInit} from '@angular/core';
import {SurveyCreate} from "../survey-create";
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../survey.service";

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {

  surveyCreate: SurveyCreate;

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) {
    this.surveyCreate = new SurveyCreate();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.surveyService.create(this.surveyCreate).subscribe(result => this.goToSurveyList());
  }

  goToSurveyList() {
    this.router.navigate(['publisher/survey']);
  }
}
