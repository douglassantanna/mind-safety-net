export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  answer: string;
  value: number;
}

export interface Scores { scores: Score[] }
export interface Score { id: number, value: number, description: string }

export const myScores: Score[] = [
  { id: 1, value: 10, description: "Low Score" },
  { id: 2, value: 15, description: "Medium Score" },
  { id: 3, value: 20, description: "High Score" }
];

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: [
      { id: 1, answer: "Paris", value: 5 },
      { id: 2, answer: "London", value: 1 },
      { id: 3, answer: "Berlin", value: 2 }
    ]
  },
  {
    id: 2,
    question: "Which chemical element has the atomic number 7?",
    answers: [
      { id: 1, answer: "Nitrogen", value: 5 },
      { id: 2, answer: "Oxygen", value: 2 },
      { id: 3, answer: "Carbon", value: 3 }
    ]
  },
  {
    id: 3,
    question: "What is the longest river in the world?",
    answers: [
      { id: 1, answer: "Nile", value: 5 },
      { id: 2, answer: "Amazon", value: 4 },
      { id: 3, answer: "Yangtze", value: 3 }
    ]
  },
  {
    id: 4,
    question: "What is the scientific name for a human?",
    answers: [
      { id: 1, answer: "Homo sapiens", value: 5 },
      { id: 2, answer: "Pan troglodytes", value: 2 },
      { id: 3, answer: "Ursus arctos", value: 1 }
    ]
  },
  {
    id: 5,
    question: "What is the current year?",
    answers: [
      { id: 1, answer: "2024", value: 5 },
      { id: 2, answer: "2023", value: 3 },
      { id: 3, answer: "2025", value: 1 }
    ]
  },
  {
    id: 6,
    question: "Which artist painted the Mona Lisa?",
    answers: [
      { id: 1, answer: "Leonardo da Vinci", value: 5 },
      { id: 2, answer: "Michelangelo", value: 3 },
      { id: 3, answer: "Raphael", value: 2 }
    ]
  },
  {
    id: 7,
    question: "What is the meaning of the word 'palindrome'?",
    answers: [
      { id: 1, answer: "A word that reads the same backward and forward", value: 5 },
      { id: 2, answer: "A type of flower", value: 2 },
      { id: 3, answer: "A musical instrument", value: 1 }
    ]
  },
  {
    id: 8,
    question: "How many sides does a stop sign have?",
    answers: [
      { id: 1, answer: "8", value: 5 },
      { id: 2, answer: "6", value: 3 },
      { id: 3, answer: "4", value: 2 }
    ]
  },
  {
    id: 9,
    question: "What is the capital of Australia?",
    answers: [
      { id: 1, answer: "Sydney", value: 2 },
      { id: 2, answer: "Melbourne", value: 3 },
      { id: 3, answer: "Canberra", value: 5 }
    ]
  },
  {
    id: 10,
    question: "What is the square root of 25?",
    answers: [
      { id: 1, answer: "5", value: 5 },
      { id: 2, answer: "10", value: 3 },
      { id: 3, answer: "15", value: 1 }
    ]
  }
];
