import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../survey.service";
import {SurveyResponse} from "../survey-response";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
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

  update(index: number, uuid: string) {
    this.router.navigate(['publisher/survey/' + uuid]);
  }

  remove(index: number, uuid: string) {
    this.surveyService.delete(uuid).subscribe(
      result => {
        this.surveys = this.surveys.filter(item => item.uuid !== uuid);
        this.goToSurveyList();
      })
  }
}
