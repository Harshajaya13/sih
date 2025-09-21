document.addEventListener("DOMContentLoaded", () => {
    // --- STEP 1: PASTE YOUR SECRET API KEY HERE ---
    // WARNING: This key is visible to anyone viewing your page source.
    // This is acceptable ONLY for a local demo on your own machine.
    const GEMINI_API_KEY = 'AIzaSyB1fMSq6L8QBsVxhtY3ruMb9aFJrQJ5cp8';

    const userPrompt = document.getElementById('user-prompt');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const responseArea = document.getElementById('response-area');
    const loadingSpinner = document.getElementById('loading-spinner');

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    searchButton.addEventListener('click', async () => {
        const mainQuery = userPrompt.value.trim();
        if (mainQuery === "") {
            alert("Please tell me what you are looking for.");
            return;
        }

        resultsContainer.style.display = 'block';
        responseArea.innerHTML = '';
        loadingSpinner.style.display = 'block';

        try {
            // --- STEP 2: Use Gemini to convert the prompt to structured JSON ---
            const instruction = `
                From the user's request, extract the main search query and the city/location.
                Respond ONLY with a valid JSON object formatted like this: {"query": "search term", "location": "city or area name"}
            `;

            const geminiResponse = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${instruction}\n\nUser Prompt: "${mainQuery}"` }] }]
                })
            });

            if (!geminiResponse.ok) throw new Error('Gemini API request failed');

            const geminiData = await geminiResponse.json();
            const jsonString = geminiData.candidates[0].content.parts[0].text.match(/\{.*\}/s)[0];
            const searchParams = JSON.parse(jsonString);

            // --- STEP 3: Use the JSON to search the open-source map (Nominatim) ---
            const nominatimQuery = encodeURIComponent(`${searchParams.query} in ${searchParams.location}`);
            const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${nominatimQuery}&format=json&limit=1`;

            const mapResponse = await fetch(nominatimUrl, {
                headers: { 'User-Agent': 'SIH-Demo/1.0 (Client-Side)' }
            });
            const places = await mapResponse.json();

            if (places.length === 0) throw new Error('Location not found by Nominatim');

            // --- STEP 4: Generate an OpenStreetMap iframe with a marker ---
            const location = places[0];
            const lat = location.lat;
            const lon = location.lon;
            const mapIframe = `
                <iframe
                    width="100%"
                    height="500"
                    frameborder="0"
                    scrolling="no"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon)-0.1}%2C${parseFloat(lat)-0.1}%2C${parseFloat(lon)+0.1}%2C${parseFloat(lat)+0.1}&layer=mapnik&marker=${lat}%2C${lon}"
                    style="border: 1px solid #ccc; border-radius: 8px;">
                </iframe>
            `;

            // --- STEP 5: Display the final map ---
            responseArea.innerHTML = mapIframe;

        } catch (error) {
            console.error("Error:", error);
            responseArea.innerHTML = 'Sorry, an error occurred. Could not find the location. Please check the console for details.';
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });
});
