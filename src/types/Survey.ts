import { Question } from "./Question";

export interface Survey {
    id: string;
    surveyTypeId: string;
    surveyName: string;
    maxScore: number;
    questionList: Question[];
  }
