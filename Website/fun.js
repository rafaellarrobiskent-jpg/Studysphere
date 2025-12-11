// ⭐ STAR SYSTEM
let stars = localStorage.getItem("stars") ? parseInt(localStorage.getItem("stars")) : 0;
document.getElementById("starCount").textContent = stars;

function completeChallenge() {
  stars++;
  localStorage.setItem("stars", stars);
  document.getElementById("starCount").textContent = stars;
}

// Reset stars
function resetStars() {
  stars = 0;
  localStorage.setItem("stars", stars);
  document.getElementById("starCount").textContent = stars;
}

// 🎯 DAILY CHALLENGES
const challenges = [
  "Study for 10 minutes without distractions.",
  "Clean your study desk.",
  "Write down one new thing you learned today.",
  "Review your notes for 5 minutes.",
  "Drink a glass of water.",
  "Organize one folder in your computer.",
  "Take a 2-minute stretch break.",
  "Read one page of a book."
];

function generateChallenge() {
  const random = Math.floor(Math.random() * challenges.length);
  document.getElementById("challengeText").textContent = challenges[random];
}
const quotes = [
  "Success is the sum of small efforts repeated daily.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Discipline is choosing what you want most over what you want now.",
  "Small steps every day lead to big results.",
  "Your future is created by what you do today.",
  "Stay focused. Stay determined."
  
  
];

function generateQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteText").textContent = quotes[random];
}