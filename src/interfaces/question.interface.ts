import {IBase} from './base.interface';
import {QuestionType} from './enum';
import {IExercise} from './exercise.interface';

export interface IQuestion extends IBase {
  text: string;

  answer: string;

  isShort: boolean;

  exerciseId: number;

  exercise: IExercise;

  type: QuestionType;
}
