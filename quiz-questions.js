document.addEventListener("DOMContentLoaded", function() {
  const quizCard1 = document.getElementById('quizCard1');
  const quizCard2 = document.getElementById('quizCard2');
  const submitButton = document.getElementById('submitQuiz');
  var score = 0; 

  const questions2 = [
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
      correctAnswer: "Nitrogen"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
      correctAnswer: "Mitochondria"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au"
    },
    {
      question: "Which scientist proposed the theory of relativity?",
      options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
      correctAnswer: "Albert Einstein"
    },
    {
      question: "What is the boiling point of water in Celsius?",
      options: ["100°C", "0°C", "50°C", "150°C"],
      correctAnswer: "100°C"
    }
  ];
  
  const questions1 = JSON.parse(localStorage.getItem('question1')) || []; // Retrieve questions1 from local storage

  function generateQuestions(questions, formId) {
    const form = document.getElementById(formId);
    questions.forEach((questionObj, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');

      const questionLabel = document.createElement('p');
      questionLabel.textContent = `${index + 1}. ${questionObj.question}`;
      questionDiv.appendChild(questionLabel);

      questionObj.options.forEach((option, optionIndex) => {
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `q${index + 1}`;
        optionInput.value = option;
        questionDiv.appendChild(optionInput);

        const optionLabel = document.createElement('label');
        optionLabel.textContent = option;
        questionDiv.appendChild(optionLabel);

        const br = document.createElement('br');
        questionDiv.appendChild(br);
      });

      form.appendChild(questionDiv);
    });
  }

  function validateQuiz(set) {
    const form = document.getElementById(`quizForm${set}`);
    const radioButtons = form.querySelectorAll('input[type="radio"]:checked');
    const totalChecked = radioButtons.length;
    const questionslength = set === '1' ? questions1.length : questions2.length;
    const totalQuestions = questionslength; 
  
    return totalChecked === totalQuestions;
  }
  
  function calculateScore(set) {
    score = 0;
    const form = document.getElementById(`quizForm${set}`);
    const questions = set === '1' ? questions1 : questions2;
  
    questions.forEach((questionObj, index) => {
      /*const selectedOption = form.querySelector(`input[name="q${index + 1}"]:checked`);
    if (selectedOption) {
      const selectedAnswer = selectedOption.value;
      if (selectedAnswer === questionObj.correctAnswer) {
        score++;
      }
    } */
      const selectedAnswer = form.elements[`q${index + 1}`].value;
      if (selectedAnswer === questionObj.correctAnswer) {
        score++;
      }
    });
  }
  
  function updateUserData(set) {
    let userData = JSON.parse(localStorage.getItem('userLogindata')) || {};

    const activeUser = userData.find(user => user.status === 'active');
    if (activeUser) {
      if (!activeUser[`generalknowledge${set}`]) {
        activeUser[`generalknowledge${set}`] = { score: 0 };
      }
      activeUser[`generalknowledge${set}`].score = score;
      localStorage.setItem('userLogindata', JSON.stringify(userData));
    }
  }

  function clearQuestions() {
    const forms = document.querySelectorAll('.quiz-form');
    forms.forEach(form => {
      form.innerHTML = '';
    });
  }

  function loadQuestions(questions, quizCard) {
    clearQuestions();
    generateQuestions(questions, quizCard.querySelector('.quiz-form').id);
  }

  function switchQuiz(set) {
    if (set === '1') {
      loadQuestions(questions1, quizCard1);
      quizCard2.style.display = 'none';
      quizCard1.style.display = 'block';
    } else if (set === '2') {
      loadQuestions(questions2, quizCard2);
      quizCard1.style.display = 'none';
      quizCard2.style.display = 'block';
    }
  }

  const params = new URLSearchParams(window.location.search);
  const set = params.get('set');
  switchQuiz(set);

  submitButton.addEventListener('click', function() {
    if (!validateQuiz(set)) {
      alert('Please answer all questions before submitting.');
      return;
    }
  
    calculateScore(set);
    updateUserData(set);
    window.location.href = 'homepage.html';
  });
});
