// DOM Elements
const userInput = document.getElementById("userInput");
const searchBtn = document.getElementById("searchBtn");
const speakBtn = document.getElementById("speakBtn");
const resultDiv = document.getElementById("result");

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US"; // Set language to English (modify as needed)

// Handle Speech Input
speakBtn.addEventListener("click", () => {
    recognition.start();
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Extract spoken text
        userInput.value = transcript; // Populate input with recognized speech
        displayResult(`You said: "${transcript}"`);
    };

    recognition.onerror = (event) => {
        displayResult("Speech recognition error: " + event.error);
    };
});

// Handle Search
searchBtn.addEventListener("click", () => {
    const query = userInput.value.trim(); // Get user input
    if (query) {
        performSearch(query); // Call the search function
    } else {
        displayResult("Please enter a command or ask something!");
    }
});

// Perform Search
function performSearch(query) {
    // Simulated response (replace with an API or database interaction)
    const fakeData = {
        "weather": "The weather today is sunny and warm at 28°C!",
        "time": `The current time is ${new Date().toLocaleTimeString()}.`,
        "news": "The latest news: AI is revolutionizing industries globally."
    };

    // Check if the query matches the simulated data
    const response = fakeData[query.toLowerCase()] || "Sorry, I couldn't find an answer to that.";
    displayResult(response);
}

// Display the Results Dynamically
function displayResult(message) {
    resultDiv.innerHTML = `<p class="text-gray-700">${message}</p>`;
}
