import {IBase} from './base.interface';
import {IQuiz} from './quiz.interface';
import {IUserQuizAnswer} from './user-quiz-answer.interface';
import {IUser} from './user.interface';

export interface IUserQuiz extends IBase {
  isCompleted: boolean;

  passingScore: number;

  totalScore: number;

  correctAnswers: number;

  inCorrectAnswers: number;

  userId: number;

  quizId: number;

  user?: IUser;

  quiz?: IQuiz;

  answers?: IUserQuizAnswer[];
}
