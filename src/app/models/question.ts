export class Question {
  uuid: string;
  question: string;
  options: QuestionOption;
  required: boolean;
  order: number;
}

export class QuestionOption {
  type: string;
}

export class QuestionOptionNumber extends QuestionOption {
  minValue: number;
  maxValue: number;
}

export class QuestionOptionText extends QuestionOption {
  minLength: number;
  maxLength: number;
}

export class QuestionOptionRadio extends QuestionOption {
  choices: QuestionMultiChoice[];
  randomize: boolean;
}

export class QuestionMultiChoice {
  value: string;
  position: number;
}
