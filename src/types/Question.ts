import { Answer } from './Answer';

export interface Question {
    id: string;
    contentQ: string;
    answersList: Answer[];
    isDelete: boolean;
  }