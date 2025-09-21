const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

// --- STEP 1: PASTE YOUR SECRET API KEYS HERE ---
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const MAPMYINDIA_API_KEY = 'YOUR_MAPMYINDIA_API_KEY';

const geminiAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/find-map-gemini', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // --- Use Gemini to convert the prompt to structured JSON ---
        const model = geminiAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const instruction = `From the user's request, extract the main search query and the location. Respond ONLY with a valid JSON object: {"query": "search term", "location": "city name"}`;
        const result = await model.generateContent(`${instruction}\n\nUser Prompt: "${prompt}"`);
        const jsonString = result.response.text().match(/\{.*\}/s)[0];
        const searchParams = JSON.parse(jsonString);

        // --- Use MapmyIndia to geocode and create the map ---
        const geocodeQuery = encodeURIComponent(`${searchParams.query}, ${searchParams.location}`);
        const geocodeUrl = `https://atlas.mapmyindia.com/api/places/geocode?address=${geocodeQuery}&itemCount=1`;

        const geocodeResponse = await fetch(geocodeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAPMYINDIA_API_KEY}`
            }
        });
        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.copResults || geocodeData.copResults.length === 0) {
            return res.status(404).json({ error: 'Location not found by MapmyIndia.' });
        }

        const location = geocodeData.copResults[0];
        const mapIframe = `<iframe width="100%" height="500" frameborder="0" src="https://maps.mapmyindia.com/embed?center=${location.latitude},${location.longitude}&zoom=14&marker=${location.latitude},${location.longitude}" style="border:1px solid #ccc; border-radius: 8px;"></iframe>`;
        
        res.json({ mapIframe: mapIframe });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to process your request. Check API keys and server logs.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
