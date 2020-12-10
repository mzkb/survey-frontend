import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";
import {SurveyResponse} from "../../models/survey-response";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html'
})
export class SurveyListComponent implements OnInit {

  surveys: SurveyResponse[];

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) {
  }

  ngOnInit(): void {
    this.surveyService.list().subscribe(data => {
      this.surveys = data
    });
  }

  goToSurveyList() {
    this.router.navigate(['publisher/survey']);
  }

  send(index: number, uuid: string) {
    this.router.navigate(['publisher/survey/send/' + uuid]);
  }

  take(index: number, uuid: string) {
    this.router.navigate(['survey/' + uuid]);
  }

  update(index: number, uuid: string) {
    this.router.navigate(['publisher/survey/' + uuid]);
  }

  response(index: number, uuid: string) {
    this.router.navigate(['publisher/survey/response/' + uuid]);
  }

  remove(index: number, uuid: string) {
    this.surveyService.delete(uuid).subscribe(
      result => {
        this.surveys = this.surveys.filter(item => item.uuid !== uuid);
        this.goToSurveyList();
      })
  }
}
