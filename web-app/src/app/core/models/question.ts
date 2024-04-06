export interface Question {
  id: number;
  description: string;
  answers: Answer[];
  enabled: boolean;
}

export interface Answer {
  id: number;
  description: string;
  value: number;
}

export interface CreateQuestion {
  description: string;
  answers: CreateAnswer[];
}

export interface CreateAnswer {
  description: string;
  value: number;
}

export interface SetQuestionEnableStatus {
  questionId: number;
  enableStatus: boolean;
}
