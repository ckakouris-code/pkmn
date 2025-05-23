document.getElementById("randomButton").addEventListener("click", async function () {
    const selectedType = document.getElementById("type").value;

    try {
        // Fetch Pokémon list from API
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
        const data = await response.json();
        
        // Fetch details for each Pokémon
        const pokemonData = await Promise.all(data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            return await detailsResponse.json();
        }));

        // Filter Pokémon by type
        let filteredList = selectedType === "all"
            ? pokemonData
            : pokemonData.filter(pokemon => pokemon.types.some(t => t.type.name === selectedType));

        if (filteredList.length === 0) {
            alert("No Pokémon found for this type!");
            return;
        }

        // Pick a random Pokémon
        const randomIndex = Math.floor(Math.random() * filteredList.length);
        const randomPokemon = filteredList[randomIndex];

        // Display Pokémon details before redirecting
        document.getElementById("searchResult").innerHTML = `
            <h3>${randomPokemon.name.toUpperCase()}</h3>
            <img src="${randomPokemon.sprites.front_default}" alt="${randomPokemon.name}">
            <p>Type: ${randomPokemon.types.map(t => t.type.name).join(", ")}</p>
            <a href="https://www.pokemon.com/us/pokedex/${randomPokemon.id}" target="_blank">View Dex Entry</a>
        `;

    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        alert("Failed to fetch Pokémon data. Please try again.");
    }
});

// Search for Pokémon by name
document.getElementById("searchButton").addEventListener("click", async function () {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();

    if (!searchQuery) {
        alert("Please enter a Pokémon name!");
        return;
    }

    try {
        // Fetch Pokémon data from API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
        if (!response.ok) {
            alert("Pokémon not found! Try again.");
            return;
        }
        const pokemon = await response.json();

        // Show result
        document.getElementById("searchResult").innerHTML = `
            <h3>${pokemon.name.toUpperCase()}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            <a href="https://www.pokemon.com/us/pokedex/${pokemon.id}" target="_blank">View Dex Entry</a>
        `;

    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        alert("Failed to retrieve Pokémon data.");
    }
});