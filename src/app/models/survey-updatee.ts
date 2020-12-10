import {Question} from "./question";
import {UserSurveyResponse} from "./user-survey-response";

export class SurveyUpdate {
  uuid: string;
  title: string;
  description: string;
  questions: Question[];
}
