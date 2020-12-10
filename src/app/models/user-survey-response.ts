import {QuestionResponse} from "./question-response";

export class UserSurveyResponse {
  name: string;
  email: string;
  uuid: string;
  questions: QuestionResponse[];
}
