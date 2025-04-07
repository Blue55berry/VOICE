// script.js

// DOM Elements
const toggleAssistantBtn = document.getElementById("toggleAssistantBtn");
const closeAssistantBtn = document.getElementById("closeAssistantBtn");
const assistantUI = document.getElementById("assistantUI");
const userInput = document.getElementById("userInput");
const resultDiv = document.getElementById("result");
const schemesList = document.getElementById("schemesList");
const searchAgainBtn = document.getElementById("searchAgainBtn");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-IN"; // Set language to English (India)

let isRecognitionActive = false; // Flag to track recognition state

// Sample data for Tamil Nadu schemes
const schemes = [
  {
    name: "Amma Unavakam",
    description: "Low-cost canteens providing affordable meals.",
  },
  {
    name: "Amma Pharmacy",
    description: "Affordable medicines for the public.",
  },
  { name: "Amma Water", description: "Low-cost drinking water for all." },
  { name: "Amma Cement", description: "Subsidized cement for construction." },
  {
    name: "Amma Baby Care Kit",
    description: "Free baby care kits for new mothers.",
  },
  // Add more schemes here (total 25+)
];

// Function to filter and display schemes based on the search query
function filterSchemes(query) {
  schemesList.innerHTML = ""; // Clear existing content
  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(query.toLowerCase()) ||
      scheme.description.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredSchemes.length > 0) {
    filteredSchemes.forEach((scheme) => {
      const listItem = document.createElement("li");
      listItem.className = "p-4 bg-gray-100 border rounded-md shadow-sm";
      listItem.innerHTML = `
                <h3 class="text-lg font-bold text-green-700">${scheme.name}</h3>
                <p class="text-sm text-gray-600">${scheme.description}</p>
            `;
      schemesList.appendChild(listItem);
    });
  } else {
    schemesList.innerHTML = '<p class="text-gray-500">No schemes found.</p>';
  }
}

// Event listener for text input search
userInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query) {
    filterSchemes(query);
  } else {
    schemesList.innerHTML = ""; // Clear results if input is empty
  }
});

// Toggle Assistant UI
toggleAssistantBtn.addEventListener("click", () => {
  assistantUI.classList.remove("hidden"); // Show assistant UI
  assistantUI.classList.add("flex"); // Add flex display
  if (!isRecognitionActive) {
    recognition.start(); // Start voice recognition
    isRecognitionActive = true;
  }
});

closeAssistantBtn.addEventListener("click", () => {
  assistantUI.classList.add("hidden"); // Hide assistant UI
  if (isRecognitionActive) {
    recognition.stop(); // Stop voice recognition
    isRecognitionActive = false;
  }
});

// Voice recognition setup
recognition.onresult = (event) => {
  const voiceQuery = event.results[0][0].transcript;
  userInput.value = voiceQuery; // Populate the input field with the voice query
  filterSchemes(voiceQuery); // Perform search with the voice query
};

recognition.onend = () => {
  isRecognitionActive = false; // Reset flag when recognition ends
};

recognition.onerror = (event) => {
  console.error("Voice recognition error:", event.error);
  isRecognitionActive = false; // Reset flag on error
};

// Event listener for "Search Again" button
searchAgainBtn.addEventListener("click", () => {
  userInput.value = ""; // Clear the input field
  schemesList.innerHTML = ""; // Clear the results
  if (!isRecognitionActive) {
    recognition.start(); // Restart voice recognition
    isRecognitionActive = true;
  }
});
