import {Component, OnInit} from '@angular/core';
import {UserSurveyResponse} from "../../models/user-survey-response";
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-survey-response-list',
  templateUrl: './survey-response-list.component.html'
})
export class SurveyResponseListComponent implements OnInit {

  uuid: string;
  responses: UserSurveyResponse[];

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
      this.surveyService.responseList(this.uuid).subscribe(data => {
        console.log(data);
        this.responses = data
      });
    });
  }

  view(index: number, uuid: string) {
    this.router.navigate(['/response/' + uuid])
  }
}
