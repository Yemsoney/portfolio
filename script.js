let sections = document.querySelectorAll('section');
let navlike = document.querySelector('header nav a');
const typingEffect = document.querySelector('.typing-effect');
const words = ['Web Developer', 'Designer', 'Freelancer']; // Add more words if needed
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingEffect.textContent = currentWord.substring(0, charIndex--);
    } else {
        typingEffect.textContent = currentWord.substring(0, charIndex++);
    }

    let typingSpeed = isDeleting ? 100 : 200; // Adjust speed

    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 1500; // Wait 1.5s at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Go to next word
        typingSpeed = 500; // Small pause before typing next
    }

    setTimeout(type, typingSpeed);
}


document.addEventListener("DOMContentLoaded", type);
const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggleBtn.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
  });
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      form.style.display = 'none';
      successMessage.style.display = 'block';
    } else {
      alert('Something went wrong 😢');
    }
  });


let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling Down
    navbar.style.top = "-100px"; // Hide Navbar
  } else {
    // Scrolling Up
    navbar.style.top = "0";
  }
  lastScrollY = window.scrollY;
});
AOS.init({
    duration: 1000,
    once: true
  });
  

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navlike.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    });
});
// File: script.js (Add this to your existing script.js file)

// Function to fetch projects from API and display them
async function loadProjects() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/projects');
    const data = await response.json();
    
    if (data.success) {
      displayProjects(data.data);
    } else {
      console.error('Failed to load projects');
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

// Function to display projects in the DOM
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  try {
      const response = await fetch('http://127.0.0.1:8000/api/projects', { // Updated API endpoint
          method: 'POST',
          body: formData
      });

      const result = await response.json();
      if (result.success) {
          alert('Project uploaded successfully!');
          loadProjects(); // Refresh project display
      } else {
          alert('Upload failed.');
      }
  } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload.');
  }
});
