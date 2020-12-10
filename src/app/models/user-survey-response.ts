export class UserSurveyResponse {
  uuid: string;
  name: string;
  email: string;
  title: string;
  description: string;
  responses: UserQuestionResponse[];
}

export class UserQuestionResponse {
  uuid: string;
  question: string;
  response: string;
}
