import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";
import {SurveyResponse} from "../../models/survey-response";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionOptionRadio, QuestionOptionText} from "../../models/question";
import {UserQuestionResponse, UserSurveyResponse} from "../../models/user-survey-response";
import {ResponseService} from "../../services/response.service";

@Component({
  selector: 'app-survey-take',
  templateUrl: './survey-take.component.html'
})
export class SurveyTakeComponent implements OnInit {

  surveyResponse: SurveyResponse;
  formGroup: FormGroup;
  formData: Array<any> = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private surveyService: SurveyService,
              private responseService: ResponseService) {
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

    group["name"] = new FormControl('', Validators.required)
    group["email"] = new FormControl('', Validators.required)

    let i = 0;
    for (const question of questions) {
      let validatorsToUse: Array<any> = [];

      if (question.required) {
        validatorsToUse.push(Validators.required);
      }

      let type = question.options.type;
      switch (type) {
        case "text": {
          let textOptions = question.options as QuestionOptionText;
          let minLength = textOptions.minLength;
          if (minLength != null && minLength > 0) {
            validatorsToUse.push(Validators.minLength(minLength));
          } else {
            minLength = 0;
          }

          let maxLength = textOptions.maxLength;
          if (maxLength != null && maxLength > minLength) {
            validatorsToUse.push(Validators.maxLength(maxLength));
          }

          let element = {};
          element["type"] = type;
          element["name"] = 'question' + i;
          element["label"] = question.question;
          this.formData.push(element)
        }
          break;
        case "radio": {
          let radioOptions = question.options as QuestionOptionRadio;

          let element = {};
          element["type"] = type;
          element["name"] = 'question' + i;
          element["label"] = question.question;

          let choicesInOptions = radioOptions.choices;
          if (!radioOptions.randomize) {
            choicesInOptions.sort((c1, c2) => {
              if (c1.position > c2.position) {
                return 1;
              }

              if (c1.position < c2.position) {
                return -1;
              }

              return 0;
            })
          }

          let options = Array<string>();
          for (const choicesInOption of choicesInOptions) {
            options.push(choicesInOption.value)
          }
          element["options"] = options;
          this.formData.push(element)
        }
          break;
      }

      // 'question' + i
      group[question.question] = new FormControl('', validatorsToUse);
      i++;
    }

    this.formGroup = new FormGroup(group);
  }

  onSubmit() {
    let userSurveyResponse: UserSurveyResponse = new UserSurveyResponse();
    let fromData = this.formGroup.value;

    userSurveyResponse.uuid = this.surveyResponse.uuid;
    userSurveyResponse.title = this.surveyResponse.title;
    userSurveyResponse.description = this.surveyResponse.description;
    userSurveyResponse.name = fromData["name"];
    userSurveyResponse.email = fromData["email"];

    let userQuestionResponses: Array<UserQuestionResponse> = [];
    let questions = this.surveyResponse.questions;
    for (const question of questions) {
      let userQuestionResponse: UserQuestionResponse = new UserQuestionResponse();
      userQuestionResponse.uuid = question.uuid;
      userQuestionResponse.question = question.question;
      userQuestionResponse.response = fromData[question.question];
      userQuestionResponses.push(userQuestionResponse);
    }

    userSurveyResponse.responses = userQuestionResponses;

    this.responseService.create(userSurveyResponse).subscribe(result=> {
      this.router.navigate(['/response/' + result["uuid"]])
    })
  }
}
