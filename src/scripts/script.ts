const questionContainer = document.querySelector(
  '.quiz__question'
) as HTMLDivElement;
const answersContainer = document.querySelector(
  '.quiz__list'
) as HTMLDivElement;
const resultsContainer = document.querySelector(
  '.quiz__header'
) as HTMLDivElement;
const submitButton = document.querySelector('#submit') as HTMLButtonElement;

interface IQuestions {
  question: string;
  answers: Array<string>;
  correct: number;
}

const questions: IQuestions[] = [
  {
    question: 'Сколько на данный момент существует языков программирования?',
    answers: ['50', '1500', '8000', '900'],
    correct: 3,
  },
  {
    question: 'В каком году появился JavaScript?',
    answers: ['В 1987', 'В 1995', 'В 2001', 'В 1989'],
    correct: 2,
  },
  {
    question: 'Какой компанией был создан JavaScript?',
    answers: ['Sun', 'Microsoft', 'Netscape', 'Oracle'],
    correct: 3,
  },
  {
    question: 'Каким было первое названия языка JavaScript?',
    answers: ['Java', 'LiveScript', 'Mocha', 'CoffeScript'],
    correct: 4,
  },
  {
    question: 'Что такое ECMAScript?',
    answers: [
      'Язык программирования',
      'Язык разметки',
      'Спецификация',
      'Язык стилей',
    ],
    correct: 3,
  },
  {
    question: 'Кто является создателем языка JavaScript?',
    answers: [
      'Тим Бернерс-Ли',
      'Брендан Эйх',
      'Джеймс Гослинг',
      'Тимоти Бернс',
    ],
    correct: 2,
  },
  {
    question:
      'Как называется язык программирования от компании Microsoft, который во многом аналогичен языку JavaScript?',
    answers: ['JS', 'JScript', 'ActionScript', 'CoffeScript'],
    correct: 2,
  },
  {
    question:
      'Может ли JavaScript на данный момент времени быть использован на стороне сервера?',
    answers: ['Да', 'Нет', 'Нет ответа', 'Что такое сервер'],
    correct: 1,
  },
  {
    question: 'Как называется первый в истории движок JavaScript?',
    answers: ['SpiderMonkey', 'Rhino', 'Drosera', 'V1'],
    correct: 1,
  },
  {
    question:
      'Какая из популярных JavaScript-библиотека предназначена для разработки пользовательских интерфейсов?',
    answers: ['Node.js', 'React.js', 'Prototype', 'jQuery'],
    correct: 2,
  },
];

let questionIndex: number = 0;
let score: number = 0;

cleanQuiz();
showQuestion();
showAnswers();

submitButton.addEventListener('click', function () {
  checkUserAnswer();
  checkQuestionNumber();
});

/**
 * cleaning quiz fields
 */
function cleanQuiz(): void {
  questionContainer.innerHTML = '';
  answersContainer.innerHTML = '';
}

/**
 * display current question
 */
function showQuestion(): void {
  questionContainer.innerHTML = questions[questionIndex]['question'];
}

/**
 * display current answers
 */
function showAnswers(): void {
  let answerIndex: number = 1;

  for (let answerText of questions[questionIndex]['answers']) {
    const answerTemp = `
    <li>
    <label class="answer">
      <input value="${answerIndex}" type="radio" class="quiz__answer" name="answer" />
      <span>${answerText}</span>
    </label>
  </li>`;

    answersContainer.innerHTML += answerTemp;
    answerIndex++;
  }
}

/**
 * checking the correctness of the user answer
 */
function checkUserAnswer(): void {
  const checkedAnswer = answersContainer.querySelector(
    'input:checked'
  ) as HTMLInputElement;
  const userAnswer = Number(checkedAnswer.value);

  if (userAnswer === questions[questionIndex]['correct']) {
    score++;
  }
}

/**
 * checking if the current question is the last one
 */
function checkQuestionNumber(): void {
  if (questionIndex === questions.length - 1) {
    cleanQuiz();
    showResults();
  } else {
    questionIndex++;
    cleanQuiz();
    showQuestion();
    showAnswers();
  }
}

/**
 * result display
 */
function showResults(): void {
  let titleResult: string;
  let messageResult: string;

  switch (true) {
    case score == 10:
      titleResult = 'Отличный результат!';
      messageResult = 'Вы правильно ответили на все вопросы!';
      break;
    case score >= 6:
      titleResult = 'Неплохой результат!';
      messageResult = 'Вы правильно ответили на более половины вопросов!';
      break;
    default:
      titleResult = 'Стоит подтянуть свои знания!';
      messageResult = 'Вы ответили менее чем на половину вопросов :(';
      break;
  }

  const resultsTemp: string = `
    <h2 class="result__title">${titleResult}</h2>
    <h3 class="result__message">${messageResult}</h3>
    <p class="result__summary">Ваш результат: ${score} из ${questions.length}</p>
  `;

  resultsContainer.innerHTML += resultsTemp;
  submitButton.innerHTML = 'Играть снова';
  submitButton.addEventListener('click', reloadQuiz);
}

/**
 * quiz restart
 */
function reloadQuiz(): void {
  location.reload();
}
