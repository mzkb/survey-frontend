import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";
import {SurveyResponse} from "../../models/survey-response";
import {Question, QuestionMultiChoice, QuestionOptionRadio, QuestionOptionText} from "../../models/question";
import {SurveyUpdate} from "../../models/survey-updatee";

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html'
})
export class SurveyQuestionComponent implements OnInit {

  survey: SurveyUpdate;
  surveyResponse: SurveyResponse;
  questionsData: Array<QuestionOptionFlat> = [];
  highestQuestionOrder: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private surveyService: SurveyService) {
    this.survey = new SurveyUpdate();
    this.route.params.subscribe(params => this.load(params['uuid']));
  }

  ngOnInit(): void {
  }

  load(uuid: String) {
    console.log("Loading: " + uuid)
    this.surveyService.get(uuid).subscribe(data => {
      console.log(data);
      this.surveyResponse = data;
      this.survey.uuid = this.surveyResponse.uuid;
      this.survey.title = this.surveyResponse.title;
      this.survey.description = this.surveyResponse.description;
      this.addExistingQuestionOptions(this.surveyResponse.questions);
      console.log(this.questionsData);
    })
  }

  onSubmit() {
    let newQuestions: Question[] = [];
    for (const questionsDatum of this.questionsData) {
      let q = new Question();

      if (questionsDatum.existing) {
        q.uuid = questionsDatum.uuid;
      }

      q.question = questionsDatum.question;
      q.required = questionsDatum.required;
      q.order = questionsDatum.order;

      if (questionsDatum instanceof QuestionOptionTextFlat) {
        let qot = questionsDatum as QuestionOptionTextFlat;

        let newQot = new QuestionOptionText();
        newQot.type = "text";
        newQot.minLength = qot.minLength;
        newQot.maxLength = qot.maxLength;
        q.options = newQot
      }

      if (questionsDatum instanceof QuestionOptionRadioFlat) {
        let qor = questionsDatum as QuestionOptionRadioFlat;

        let newChoices: QuestionMultiChoice[] = [];

        let newQor = new QuestionOptionRadio();
        newQor.type = "radio";
        newQor.randomize = questionsDatum.randomize;
        for (const choice of qor.choices) {
          let newChoice = new QuestionMultiChoice();
          newChoice.position = choice.position;
          newChoice.value = choice.value;
          newChoices.push(newChoice);
        }
        newQor.choices = newChoices;

        q.options = newQor
      }

      newQuestions.push(q);
    }

    this.survey.questions = newQuestions;
    console.log(this.survey);

    this.surveyService.update(this.survey).subscribe(result => {
      this.survey = result;
      this.router.navigate(['/publisher/survey']);
    });
  }

  addExistingQuestionOptions(questions: Question[]) {
    for (const question of questions) {
      let type = question.options.type;

      if (this.highestQuestionOrder < question.order) {
        this.highestQuestionOrder = question.order;
      }

      switch (type) {
        case "text": {
          let textFlat = new QuestionOptionTextFlat();
          textFlat.type = 'text';
          textFlat.uuid = question.uuid;
          textFlat.question = question.question;
          textFlat.required = question.required;
          textFlat.order = question.order;
          textFlat.existing = true;

          let textFlatOptions = question.options as QuestionOptionText;
          textFlat.minLength = textFlatOptions.minLength;
          textFlat.maxLength = textFlatOptions.maxLength;
          this.questionsData.push(textFlat);
        }
          break;
        case "radio": {
          let radioFlat = new QuestionOptionRadioFlat();
          radioFlat.type = 'radio';
          radioFlat.uuid = question.uuid;
          radioFlat.question = question.question;
          radioFlat.required = question.required;
          radioFlat.order = question.order;
          radioFlat.existing = true;

          let radioFlatOptions = question.options as QuestionOptionRadio;
          radioFlat.randomize = radioFlatOptions.randomize;

          let choicesFLat: QuestionOptionMulti[] = [];
          let choices = radioFlatOptions.choices
          for (const choice of choices) {
            let c = new QuestionOptionMulti();
            c.value = choice.value;
            c.position = choice.position;
            choicesFLat.push(c);
          }

          radioFlat.choices = choicesFLat;
          this.questionsData.push(radioFlat);
        }
          break;
      }
    }
  }

  addQuestionOption(type: string) {
    switch (type) {
      case "text":
        this.addQuestionText();
        break;
      case "radio":
        this.addQuestionRadio();
        break;
    }
  }

  private addQuestionText() {
    let questionOptionTextFlat = new QuestionOptionTextFlat();
    questionOptionTextFlat.uuid = this.randomString(36);
    questionOptionTextFlat.type = 'text';
    questionOptionTextFlat.order = ++this.highestQuestionOrder;
    questionOptionTextFlat.existing = false;
    this.questionsData.push(questionOptionTextFlat);
  }

  private addQuestionRadio() {
    let questionOptionRadioFlat = new QuestionOptionRadioFlat();
    questionOptionRadioFlat.uuid = this.randomString(36);
    questionOptionRadioFlat.type = 'radio';
    questionOptionRadioFlat.order = ++this.highestQuestionOrder;
    questionOptionRadioFlat.existing = false;
    questionOptionRadioFlat.choices = [];
    this.questionsData.push(questionOptionRadioFlat);
  }

  removeQuestionOption(uuid: string) {
    this.questionsData = this.questionsData.filter(item => item.uuid !== uuid);
  }

  onChange(value: string) {
    this.addQuestionOption(value);
  }

  addChoice(index: number) {
    console.log(index);
    let questionOptionFlat = this.questionsData[index];
    if (questionOptionFlat instanceof QuestionOptionRadioFlat) {
      let qof = questionOptionFlat as QuestionOptionRadioFlat;
      qof.choices.push(new QuestionOptionMulti())
    }
  }

  private randomString(length) {
    let chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result: string = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
}

export class QuestionOptionFlat {
  uuid: string;
  existing: boolean;
  question: string;
  required: boolean;
  order: number;
  type: string;
}

export class QuestionOptionTextFlat extends QuestionOptionFlat {
  minLength: number;
  maxLength: number;
}

export class QuestionOptionRadioFlat extends QuestionOptionFlat {
  randomize: boolean;
  choices: QuestionOptionMulti[];
}

export class QuestionOptionMulti {
  value: string;
  position: number;
}
