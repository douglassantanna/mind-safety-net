export interface Question {
  id: number;
  description: string;
  answers: Answer[];
  enable: boolean;
}

export interface Answer {
  id: number;
  description: string;
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
    description: "What is the capital of France?",
    enable: true,
    answers: [
      { id: 1, description: "Paris", value: 5 },
      { id: 2, description: "London", value: 1 },
      { id: 3, description: "Berlin", value: 2 }
    ]
  },
  {
    id: 2,
    description: "Which chemical element has the atomic number 7?",
    enable: true,
    answers: [
      { id: 1, description: "Nitrogen", value: 5 },
      { id: 2, description: "Oxygen", value: 2 },
      { id: 3, description: "Carbon", value: 3 }
    ]
  },
  {
    id: 3,
    description: "What is the longest river in the world?",
    enable: false,
    answers: [
      { id: 1, description: "Nile", value: 5 },
      { id: 2, description: "Amazon", value: 4 },
      { id: 3, description: "Yangtze", value: 3 }
    ]
  },
  {
    id: 4,
    description: "What is the scientific name for a human?",
    enable: true,
    answers: [
      { id: 1, description: "Homo sapiens", value: 5 },
      { id: 2, description: "Pan troglodytes", value: 2 },
      { id: 3, description: "Ursus arctos", value: 1 }
    ]
  },
  {
    id: 5,
    description: "What is the current year?",
    enable: false,
    answers: [
      { id: 1, description: "2024", value: 5 },
      { id: 2, description: "2023", value: 3 },
      { id: 3, description: "2025", value: 1 }
    ]
  },
  {
    id: 6,
    description: "Which artist painted the Mona Lisa?",
    enable: true,
    answers: [
      { id: 1, description: "Leonardo da Vinci", value: 5 },
      { id: 2, description: "Michelangelo", value: 3 },
      { id: 3, description: "Raphael", value: 2 }
    ]
  },
  {
    id: 7,
    description: "What is the meaning of the word 'palindrome'?",
    enable: true,
    answers: [
      { id: 1, description: "A word that reads the same backward and forward", value: 5 },
      { id: 2, description: "A type of flower", value: 2 },
      { id: 3, description: "A musical instrument", value: 1 }
    ]
  },
  {
    id: 8,
    description: "How many sides does a stop sign have?",
    enable: false,
    answers: [
      { id: 1, description: "8", value: 5 },
      { id: 2, description: "6", value: 3 },
      { id: 3, description: "4", value: 2 }
    ]
  },
  {
    id: 9,
    description: "What is the capital of Australia?",
    enable: true,
    answers: [
      { id: 1, description: "Sydney", value: 2 },
      { id: 2, description: "Melbourne", value: 3 },
      { id: 3, description: "Canberra", value: 5 }
    ]
  },
  {
    id: 10,
    description: "What is the square root of 25?",
    enable: true,
    answers: [
      { id: 1, description: "5", value: 5 },
      { id: 2, description: "10", value: 3 },
      { id: 3, description: "15", value: 1 }
    ]
  }
];
