document.addEventListener("DOMContentLoaded", async function () {
    // === HOME PAGE FUNCTIONALITY ===

    // Random Pokémon by Type
    const randomBtn = document.getElementById("randomButton");
    const typeDropdown = document.getElementById("type");
    const searchResult = document.getElementById("searchResult");

    if (randomBtn && typeDropdown && searchResult) {
        randomBtn.addEventListener("click", async function () {
            const selectedType = typeDropdown.value;

            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
                const data = await response.json();

                const pokemonData = await Promise.all(data.results.map(async (pokemon) => {
                    const detailsResponse = await fetch(pokemon.url);
                    return await detailsResponse.json();
                }));

                let filteredList = selectedType === "all"
                    ? pokemonData
                    : pokemonData.filter(pokemon =>
                        pokemon.types.some(t => t.type.name === selectedType)
                    );

                if (filteredList.length === 0) {
                    alert("No Pokémon found for this type!");
                    return;
                }

                const randomIndex = Math.floor(Math.random() * filteredList.length);
                const randomPokemon = filteredList[randomIndex];

                searchResult.innerHTML = `
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
    }

    // Search by Name
    const searchBtn = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    if (searchBtn && searchInput && searchResult) {
        searchBtn.addEventListener("click", async function () {
            const searchQuery = searchInput.value.toLowerCase().trim();
            if (!searchQuery) {
                alert("Please enter a Pokémon name!");
                return;
            }

            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
                if (!response.ok) {
                    alert("Pokémon not found! Try again.");
                    return;
                }

                const pokemon = await response.json();
                searchResult.innerHTML = `
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
    }

    // === SHARED FUNCTIONALITY ===

    // Random Type Button
    const randomTypeBtn = document.getElementById("randomTypeBtn");
    if (randomTypeBtn) {
        const typePages = [
            "fire.html", "water.html", "grass.html", "electric.html", "psychic.html",
            "ice.html", "dragon.html", "dark.html", "fairy.html", "bug.html",
            "rock.html", "ground.html", "poison.html", "fighting.html", "steel.html",
            "ghost.html", "normal.html"
        ];
        randomTypeBtn.addEventListener("click", function () {
            const randomIndex = Math.floor(Math.random() * typePages.length);
            const selectedPage = typePages[randomIndex];
            window.location.href = selectedPage;
        });
    }

    // Home Button
    const homeBtn = document.getElementById("homeBtn");
    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "pkmnpg-index.html";
        });
    }

    // === FIRE.HTML FUNCTIONALITY ===

    const randomFireBtn = document.getElementById("randomfire");
    const fireResult = document.getElementById("fireResult");

    if (randomFireBtn && fireResult) {
        let firePokemonList = [];

        try {
            const response = await fetch("https://pokeapi.co/api/v2/type/fire");
            const data = await response.json();
            firePokemonList = data.pokemon.map(p => p.pokemon.name);
        } catch (error) {
            console.error("🔥 Failed to load Fire-type Pokémon:", error);
            fireResult.textContent = "Failed to load Fire-type Pokémon.";
            return;
        }

        randomFireBtn.addEventListener("click", async function () {
            fireResult.innerHTML = "Loading Pokémon...";
            const randomName = firePokemonList[Math.floor(Math.random() * firePokemonList.length)];

            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
                const pokemon = await res.json();

                fireResult.innerHTML = `
                    <h3>${pokemon.name.toUpperCase()}</h3>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                    <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
                `;
            } catch (error) {
                console.error("❌ Error fetching Pokémon details:", error);
                fireResult.textContent = "Failed to load Pokémon details.";
            }
        });
    }
});

// === WATER.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomWaterBtn = document.getElementById("randomwater");
    const waterResult = document.getElementById("waterResult");

    if (!randomWaterBtn || !waterResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Water-type Pokémon
    let waterPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/water");
        const data = await response.json();
        waterPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("💦 Failed to load Water-type Pokémon:", error);
        waterResult.textContent = "Failed to load Water-type Pokémon.";
        return;
    }

    randomWaterBtn.addEventListener("click", async function () {
        waterResult.innerHTML = "Fetching Pokémon...";

        const randomName = waterPokemonList[Math.floor(Math.random() * waterPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            waterResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            waterResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === GRASS.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomGrassBtn = document.getElementById("randomgrass");
    const grassResult = document.getElementById("grassResult");

    if (!randomGrassBtn || !grassResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Grass-type Pokémon
    let grassPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/grass");
        const data = await response.json();
        grassPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load Grass-type Pokémon:", error);
        grassResult.textContent = "Failed to load Grass-type Pokémon.";
        return;
    }

    randomGrassBtn.addEventListener("click", async function () {
        grassResult.innerHTML = "Fetching Pokémon...";

        const randomName = grassPokemonList[Math.floor(Math.random() * grassPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            grassResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            grassResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Bug.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomBugBtn = document.getElementById("randombug");
    const bugResult = document.getElementById("bugResult");

    if (!randomBugBtn || !bugResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Bug-type Pokémon
    let bugPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/bug");
        const data = await response.json();
        bugPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load Bug-type Pokémon:", error);
        bugResult.textContent = "Failed to load Bug-type Pokémon.";
        return;
    }

    randomBugBtn.addEventListener("click", async function () {
        bugResult.innerHTML = "Fetching Pokémon...";

        const randomName = bugPokemonList[Math.floor(Math.random() * bugPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            bugResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            bugResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === ROCK.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomRockBtn = document.getElementById("randomrock");
    const rockResult = document.getElementById("rockResult");

    if (!randomRockBtn || !rockResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Rock-type Pokémon
    let rockPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Rock");
        const data = await response.json();
        rockPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load rock-type Pokémon:", error);
        rockResult.textContent = "Failed to load Rock-type Pokémon.";
        return;
    }

    randomRockBtn.addEventListener("click", async function () {
        rockResult.innerHTML = "Fetching Pokémon...";

        const randomName = rockPokemonList[Math.floor(Math.random() * rockPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            rockResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            rockResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Dark.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomDarkBtn = document.getElementById("randomdark");
    const darkResult = document.getElementById("darkResult");

    if (!randomDarkBtn || !darkResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Dark-type Pokémon
    let darkPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Dark");
        const data = await response.json();
        darkPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load dark-type Pokémon:", error);
        darkResult.textContent = "Failed to load Dark-type Pokémon.";
        return;
    }

    randomDarkBtn.addEventListener("click", async function () {
        darkResult.innerHTML = "Fetching Pokémon...";

        const randomName = darkPokemonList[Math.floor(Math.random() * darkPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            darkResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            darkResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

