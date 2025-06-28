const roles = ["Frontend Developer", "UI Designer", "Coder"];
let currentIndex = 0;
let currentChar = 0;
let isDeleting = false;
const typedText = document.getElementById("typed-text");
const typingSpeed = 100;
const deletingSpeed = 60;
const delayBetween = 1500;

function typeEffect() {
  const currentRole = roles[currentIndex];
  if (isDeleting) {
    currentChar--;
    typedText.textContent = currentRole.substring(0, currentChar);
  } else {
    currentChar++;
    typedText.textContent = currentRole.substring(0, currentChar);
  }

  if (!isDeleting && currentChar === currentRole.length) {
    setTimeout(() => (isDeleting = true), delayBetween);
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

typeEffect();

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scroll-progress");
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// Back to Top button visibility
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Smooth scroll to top on click
backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initialize AOS scroll animations
AOS.init({
  duration: 800,
  once: true,
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});

// FORM VALIDATION
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // stop form from submitting

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // If valid:
  alert("Your message has been sent successfully!");

  // Optionally, reset form
  document.getElementById("contact-form").reset();
});

const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_bm20g78", "template_60ql5lf", this)
    .then(function(response) {
      alert("✅ Message sent successfully!");
    }, function(error) {
      alert("❌ Failed to send message: " + error.text);
    });

  this.reset();
});
