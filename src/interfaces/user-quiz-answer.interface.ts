import {IBase} from './base.interface';
import {IQuizMcqOption} from './quiz-mcqption.interface';
import {IUserQuiz} from './user-quiz.interface';

export interface IUserQuizAnswer extends IBase {
  userQuizId: number;

  selectedOptionId: number;

  isCorrect: boolean;

  userQuiz?: IUserQuiz;

  selectedOption?: IQuizMcqOption;
}
