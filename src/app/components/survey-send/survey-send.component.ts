import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";
import {SurveySend} from "../../models/survey-send";

@Component({
  selector: 'app-survey-send',
  templateUrl: './survey-send.component.html',
  styleUrls: ['./survey-send.component.css']
})
export class SurveySendComponent implements OnInit {

  surveySend: SurveySend;
  uuid: string;

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) {
    this.surveySend = new SurveySend();
    this.route.params.subscribe( params => this.uuid = params['uuid']);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.surveyService.send(this.uuid, this.surveySend).subscribe(
      result => this.goToSurveyList()
      // todo handle the errors
    )
  }

  goToSurveyList() {
    this.router.navigate(['publisher/survey']);
  }
}
