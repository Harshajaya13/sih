document.getElementById('search-button').addEventListener('click', function() {
    // Get user inputs
    const city = document.getElementById('city-input').value;
    const street = document.getElementById('street-input').value;
    const userPrompt = document.getElementById('user-prompt').value;

    // --- Show the results container and loading spinner ---
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'block';

    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';

    const responseArea = document.getElementById('response-area');
    responseArea.innerHTML = ''; // Clear previous results

    // --- Update the map without an API key ---
    const mapFrame = document.getElementById('map-iframe');
    
    // Construct a location query
    let locationQuery = city;
    if (street) {
        locationQuery = street + ', ' + city;
    }
    
    // Combine the user's prompt and the location for the map search
    const fullQuery = userPrompt + ' in ' + locationQuery;

    // Update the iframe source with a URL that doesn't require an API key
    mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(fullQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    // --- Simulate fetching AI results ---
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
        responseArea.innerHTML = `<p>Showing results for "${userPrompt}" near ${locationQuery}. The map above has been updated.</p>`;
    }, 2000); // Simulate a 2-second network request
});

