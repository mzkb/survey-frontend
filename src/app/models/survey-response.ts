import {Question} from "./question";
import {UserSurveyResponse} from "./user-survey-response";

export class SurveyResponse {
  uuid: string;
  created: string;
  updated: string;
  title: string;
  description: string;
  questions: Question[];
  responses: UserSurveyResponse[];
}
