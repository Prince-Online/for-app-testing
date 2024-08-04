const fetchUrl = 'https://script.google.com/macros/s/AKfycbxKbH1mu0hAY4dv1hOqFN0NOY_hRi2VKDn5KVtLKNQI_d2gbL3BKIm-Df6svprqL_gmDQ/exec';

    document.addEventListener('DOMContentLoaded', () => {
      const storedUsername = localStorage.getItem('YopshLoc Username');
      if (storedUsername) {
        fetchUserDetails(storedUsername);
      }
    });

    function login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      showLoader();
      fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
          hideLoader();
          const user = data.find(user => user.username === username && user.password === password);
          if (user) {
            localStorage.setItem('YopshLoc Username', username);
            displayUserDetails(user);
          } else {
            showCustomAlert('Invalid username or password');
          }
        })
        .catch(error => {
          hideLoader();
          console.error('Error fetching data:', error);
        });
    }

    function fetchUserDetails(username) {
      showLoader();
      fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
          hideLoader();
          const user = data.find(user => user.username === username);
          if (user) {
            displayUserDetails(user);
          }
        })
        .catch(error => {
          hideLoader();
          console.error('Error fetching data:', error);
        });
    }

    function displayUserDetails(user) {
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('userDetails').style.display = 'block';

      document.getElementById('userImage').src = user.image;
      document.getElementById('userEmail').innerText = user.email;
      document.getElementById('userName').innerText = user.name;
      document.getElementById('userAge').innerText = user.age;
      document.getElementById('userMobile').innerText = user.mobile;
      document.getElementById('userGender').innerText = user.gender;
    }

    function showLoader() {
      document.body.classList.add('loading');
      document.getElementById('loader').style.display = 'block';
    }

    function hideLoader() {
      document.body.classList.remove('loading');
      document.getElementById('loader').style.display = 'none';
    }

    function showCustomAlert(message) {
      document.getElementById('alertMessage').innerText = message;
      document.getElementById('customAlert').style.display = 'block';
    }

    function closeCustomAlert() {
      document.getElementById('customAlert').style.display = 'none';
    }

    function logout() {
      localStorage.removeItem('YopshLoc Username');
      document.getElementById('userDetails').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
    }