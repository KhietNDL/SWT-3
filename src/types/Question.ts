import { Answer } from './Answer';

export interface Question {
    id: string;
    contentQ: string;
    options: string;
    validity: boolean;
    answersList: Answer[];
  }