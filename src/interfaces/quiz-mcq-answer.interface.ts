import {IQuizMcq} from './quiz-mcq.interface';
import {IQuizMcqOption} from './quiz-mcqption.interface';

export interface IQuizMCQAnswer {
  quizMcq: IQuizMcq;
  answerOption: IQuizMcqOption;
  isAnswerCorrect: boolean;
}
