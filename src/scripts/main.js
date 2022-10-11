const questionContainer = document.querySelector('.quiz__question');
const answersContainer = document.querySelector('.quiz__list');
const submitButton = document.querySelector('#submit');

const questions = [
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

let questionIndex = 0;
let score = 0;

function cleanQuiz() {
  questionContainer.innerHTML = '';
  answersContainer.innerHTML = '';
}

cleanQuiz();

function showQuestion() {
  questionContainer.innerHTML = questions[questionIndex]['question'];
}

showQuestion();

function showAnswers() {
  for (let answerText of questions[questionIndex]['answers']) {
    const answerTemp = `
    <li>
    <label class="answer">
      <input type="radio" class="quiz__answer" name="answer" />
      <span>${answerText}</span>
    </label>
  </li>`;

    answersContainer.innerHTML += answerTemp;
  }
}

showAnswers();
