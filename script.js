document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loader = document.getElementById('loader');
  let userData = JSON.parse(localStorage.getItem('userLogindata'));
  function showLoader() {
    loader.style.display = 'block';
    setTimeout(() => {
      hideLoader();
    }, 2000); 
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  function clearFormInputs(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
  }

  signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('signupRole').value; 

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


   

    if (!userData) {
 
      userData = [];
    }

   
    const existingUser = userData.find(user => user.username === username);
    if (existingUser) {
      alert("Username already exists! Please choose another username.");
      return;
    }

    
    const newUser = {
      username: username,
      email: email,
      password: password,
      role: role, 
      status: 'inactive',
      generalknowledge1: {
        score: 0
      },
      generalknowledge2: {
        score: 0
      }
    };

    
    userData.push(newUser);

   
    localStorage.setItem('userLogindata', JSON.stringify(userData));

    alert("Signup successful! Status is inactive.");
    clearFormInputs(signupForm);
  });

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const loginUsername = loginForm.querySelector('input[type="text"]').value;
    const loginPassword = loginForm.querySelector('input[type="password"]').value;
    const loginRole = loginForm.querySelector('select').value;

    showLoader(); 

   
    
      const user = userData.find(user => user.username === loginUsername && user.password === loginPassword && user.role === loginRole);
      
      if (user) {
        user.status = 'active'; 
        localStorage.setItem('userLogindata', JSON.stringify(userData));

        setTimeout(() => {
          clearFormInputs(loginForm);
          hideLoader(); 
          window.location.href = 'homepage.html';
        }, 2000); 
        return;
      }
   

    setTimeout(() => {
      alert("Login failed. Please check your username, password, and role.");
      clearFormInputs(loginForm);
      hideLoader();
    }, 2000); 
  });
});
