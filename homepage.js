document.addEventListener("DOMContentLoaded", function() {
    const initialLetter = document.getElementById('initialLetter');
    const dropdown = document.getElementById('dropdown');
    const signOut = document.getElementById('signOut');
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const scoreText1 = document.getElementById('score');
    const scoreText2 = document.getElementById('score2');
    const userData = JSON.parse(localStorage.getItem('userLogindata'));
    const activeUser = userData.find(user => user.status === 'active');
    
    function signOutUser() {
        activeUser.status = 'inactive';
        localStorage.setItem('userLogindata', JSON.stringify(userData));
        window.location.href = 'login.html';
    }

    signOut.addEventListener('click', function(event) {
        event.preventDefault();
        signOutUser();
    });

    card1.addEventListener('click', function() {
        window.location.href = 'quiz-questions.html?set=1';
    });

    card2.addEventListener('click', function() {
        window.location.href = 'quiz-questions.html?set=2';
    });

    document.addEventListener('click', function(event) {
        const isClickInsideProfile = event.target.closest('.profile');
        const isClickInsideDropdown = event.target.closest('.dropdown-content');
        if (!isClickInsideProfile && !isClickInsideDropdown) {
            dropdown.style.display = 'none';
        }
    });

    
    if (userData && activeUser.role === 'teacher') {
        card1.style.display = 'none';
        card2.style.display = 'none';
        document.querySelector('h1').style.display = 'none';
       document.getElementById('questionForm').style.display = 'none';
          document.getElementById('addQuestionBtn').style.display = 'block';
    } else {
        card1.style.display = 'inline-block';
        card2.style.display = 'inline-block';
        document.querySelector('h1').style.display = 'block';
        document.getElementById('questionForm').style.display = 'none'; 
        document.getElementById('addQuestionBtn').style.display = 'none';
    }

    if (userData && userData.find(user => user.status === 'active')) {
        initialLetter.textContent = activeUser.username.charAt(0).toUpperCase();
    }

    initialLetter.addEventListener('mouseover', function() {
        dropdown.style.display = 'block';
    });

    if (userData && activeUser.generalknowledge1 && activeUser.generalknowledge1.score > 0) {
        scoreText1.textContent = `Score: ${activeUser.generalknowledge1.score}`;
    }

    if (userData && activeUser.generalknowledge2 && activeUser.generalknowledge2.score > 0) {
        scoreText2.textContent = `Score: ${activeUser.generalknowledge2.score}`;
    }

    document.getElementById("addQuestionBtn").addEventListener("click", function() {
        document.getElementById("questionForm").style.display = "block";
    });

    let questions2 = JSON.parse(localStorage.getItem('question1')) || [];
    document.getElementById("newQuestionForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const question = document.getElementById("question").value;
        const option1 = document.getElementById("option1").value;
        const option2 = document.getElementById("option2").value;
        const option3 = document.getElementById("option3").value;
        const option4 = document.getElementById("option4").value;
        const correctAnswer = document.getElementById("correctAnswer").value;
        
        const newQuestion = {
            question: question,
            options: [option1, option2, option3, option4],
            correctAnswer: correctAnswer
        };
        
      
        questions2.push(newQuestion);

        
        localStorage.setItem('question1', JSON.stringify(questions2));

        console.log("New question added:", newQuestion);

       
        document.getElementById("newQuestionForm").reset();
        

      
       
    });
});
