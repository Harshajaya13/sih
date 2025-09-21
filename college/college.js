document.addEventListener("DOMContentLoaded", () => {
    // --- IMPORTANT: For local demo only. HIDE your API key on a server for a real app. ---
    const GEMINI_API_KEY = 'AIzaSyB1fMSq6L8QBsVxhtY3ruMb9aFJrQJ5cp8';

    const cityInput = document.getElementById('city-input');
    const streetInput = document.getElementById('street-input');
    const distanceInput = document.getElementById('distance-input');
    const userPrompt = document.getElementById('user-prompt');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const responseArea = document.getElementById('response-area');
    const loadingSpinner = document.getElementById('loading-spinner');

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    searchButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        const street = streetInput.value.trim();
        const distance = distanceInput.value.trim();
        const mainQuery = userPrompt.value.trim();

        if (mainQuery === "") {
            alert("Please tell me what you are looking for in the main search box.");
            return;
        }

        // Show loading state
        resultsContainer.style.display = 'block';
        responseArea.innerHTML = '';
        loadingSpinner.style.display = 'block';

        // STEP 1: Construct a powerful, detailed prompt
        const fullPrompt = `
            Find the following for me: "${mainQuery}".
            My location details are:
            - City: ${city || 'Not specified'}
            - Street/Area: ${street || 'Not specified'}
            - Search within a distance of: ${distance || 'Not specified'}

            Please provide a clear, helpful list based on this information.
        `;

        try {
            // STEP 2: Call the Gemini API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }]
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            let botResponse = data.candidates[0].content.parts[0].text;

            // Simple formatting for better readability
            botResponse = botResponse.replace(/\*/g, '<strong>');
            botResponse = botResponse.replace(/\n/g, '<br>');

            // STEP 3: Display the final response
            responseArea.innerHTML = botResponse;

        } catch (error) {
            console.error("Error:", error);
            responseArea.innerHTML = "Sorry, something went wrong. Please check your API key and the console for errors.";
        } finally {
            loadingSpinner.style.display = 'none'; // Hide spinner
        }
    });
});
