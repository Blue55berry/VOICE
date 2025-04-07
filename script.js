// script.js

// DOM Elements
const toggleAssistantBtn = document.getElementById("toggleAssistantBtn");
const closeAssistantBtn = document.getElementById("closeAssistantBtn");
const assistantUI = document.getElementById("assistantUI");
const userInput = document.getElementById("userInput");
const resultDiv = document.getElementById("result");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US"; // Language setting

// Toggle Assistant UI
toggleAssistantBtn.addEventListener("click", () => {
    assistantUI.classList.remove("hidden"); // Show assistant UI
    assistantUI.classList.add("flex"); // Add flex display
});

closeAssistantBtn.addEventListener("click", () => {
    assistantUI.classList.add("hidden"); // Hide assistant UI
});

// Handle Speech Input
toggleAssistantBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript; // Get speech text
    userInput.value = transcript; // Populate input field
    performSearch(transcript); // Automatically perform search
};

// Simulated Search Function
function performSearch(query) {
    const fakeData = {
        "health insurance schemes": "The Chief Minister Comprehensive Health Insurance Scheme",
        "time": `The current time is ${new Date().toLocaleTimeString()}.`,
        "news": "The latest news: AI is revolutionizing industries globally."
    };

    const response = fakeData[query.toLowerCase()] || "Sorry, I couldn't find an answer to that.";
    displayResult(response);
}

// Display the Results
function displayResult(message) {
    resultDiv.innerHTML = `<p class="text-gray-700">${message}</p>`;
}
