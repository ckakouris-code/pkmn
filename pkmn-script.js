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

// === Electric.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomElectricBtn = document.getElementById("randomelectric");
    const electricResult = document.getElementById("electricResult");

    if (!randomElectricBtn || !electricResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Electric-type Pokémon
    let electricPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Electric");
        const data = await response.json();
        electricPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load electric-type Pokémon:", error);
        electricResult.textContent = "Failed to load Electric-type Pokémon.";
        return;
    }

    randomElectricBtn.addEventListener("click", async function () {
        electricResult.innerHTML = "Fetching Pokémon...";

        const randomName = electricPokemonList[Math.floor(Math.random() * electricPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            electricResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            electricResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Fairy.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomFairyBtn = document.getElementById("randomfairy");
    const fairyResult = document.getElementById("fairyResult");

    if (!randomFairyBtn || !fairyResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Fairy-type Pokémon
    let fairyPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Fairy");
        const data = await response.json();
        fairyPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load fairy-type Pokémon:", error);
        fairyResult.textContent = "Failed to load Fairy-type Pokémon.";
        return;
    }

    randomFairyBtn.addEventListener("click", async function () {
        fairyResult.innerHTML = "Fetching Pokémon...";

        const randomName = fairyPokemonList[Math.floor(Math.random() * fairyPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            fairyResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            fairyResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Ghost.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomGhostBtn = document.getElementById("randomghost");
    const ghostResult = document.getElementById("ghostResult");

    if (!randomGhostBtn || !ghostResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Ghost-type Pokémon
    let ghostPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Ghost");
        const data = await response.json();
        ghostPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load ghost-type Pokémon:", error);
        ghostResult.textContent = "Failed to load Ghost-type Pokémon.";
        return;
    }

    randomGhostBtn.addEventListener("click", async function () {
        ghostResult.innerHTML = "Fetching Pokémon...";

        const randomName = ghostPokemonList[Math.floor(Math.random() * ghostPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            ghostResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            ghostResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Ice.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomIceBtn = document.getElementById("randomice");
    const iceResult = document.getElementById("iceResult");

    if (!randomIceBtn || !iceResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Ice-type Pokémon
    let icePokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Ice");
        const data = await response.json();
        icePokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load ice-type Pokémon:", error);
        iceResult.textContent = "Failed to load ice-type Pokémon.";
        return;
    }

    randomIceBtn.addEventListener("click", async function () {
        iceResult.innerHTML = "Fetching Pokémon...";

        const randomName = icePokemonList[Math.floor(Math.random() * icePokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            iceResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            iceResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Ground.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomGroundBtn = document.getElementById("randomground");
    const groundResult = document.getElementById("groundResult");

    if (!randomGroundBtn || !groundResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Ground-type Pokémon
    let groundPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Ground");
        const data = await response.json();
        groundPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load ground-type Pokémon:", error);
        groundResult.textContent = "Failed to load ground-type Pokémon.";
        return;
    }

    randomGroundBtn.addEventListener("click", async function () {
        groundResult.innerHTML = "Fetching Pokémon...";

        const randomName = groundPokemonList[Math.floor(Math.random() * groundPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            groundResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            groundResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Flying.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomFlyingBtn = document.getElementById("randomflying");
    const flyingResult = document.getElementById("flyingResult");

    if (!randomFlyingBtn || !flyingResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Flying-type Pokémon
    let flyingPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Flying");
        const data = await response.json();
        flyingPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load flying-type Pokémon:", error);
        flyingResult.textContent = "Failed to load flying-type Pokémon.";
        return;
    }

    randomFlyingBtn.addEventListener("click", async function () {
        flyingResult.innerHTML = "Fetching Pokémon...";

        const randomName = flyingPokemonList[Math.floor(Math.random() * flyingPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            flyingResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            flyingResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Fighting.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomFightingBtn = document.getElementById("randomfighting");
    const fightingResult = document.getElementById("fightingResult");

    if (!randomFightingBtn || !fightingResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Fighting-type Pokémon
    let fightingPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/fighting");
        const data = await response.json();
        fightingPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load Fighting-type Pokémon:", error);
        fightingResult.textContent = "Failed to load Fighting-type Pokémon.";
        return;
    }

    randomFightingBtn.addEventListener("click", async function () {
        fightingResult.innerHTML = "Fetching Pokémon...";

        const randomName = fightingPokemonList[Math.floor(Math.random() * fightingPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            fightingResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            fightingResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Dragon.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomDragonBtn = document.getElementById("randomdragon");
    const dragonResult = document.getElementById("dragonResult");

    if (!randomDragonBtn || !dragonResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Dragon-type Pokémon
    let dragonPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/dragon");
        const data = await response.json();
        dragonPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load dragon-type Pokémon:", error);
        dragonResult.textContent = "Failed to load Dragon-type Pokémon.";
        return;
    }

    randomDragonBtn.addEventListener("click", async function () {
        dragonResult.innerHTML = "Fetching Pokémon...";

        const randomName = dragonPokemonList[Math.floor(Math.random() * dragonPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            dragonResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            dragonResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Normal.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomNormalBtn = document.getElementById("randomnormal");
    const normalResult = document.getElementById("normalResult");

    if (!randomNormalBtn || !normalResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Normal-type Pokémon
    let normalPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Normal");
        const data = await response.json();
        normalPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load normal-type Pokémon:", error);
        normalResult.textContent = "Failed to load normal-type Pokémon.";
        return;
    }

    randomNormalBtn.addEventListener("click", async function () {
        normalResult.innerHTML = "Fetching Pokémon...";

        const randomName = normalPokemonList[Math.floor(Math.random() * normalPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            normalResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            normalResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Poison.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomPoisonBtn = document.getElementById("randompoison");
    const poisonResult = document.getElementById("poisonResult");

    if (!randomPoisonBtn || !poisonResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Poison-type Pokémon
    let poisonPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Poison");
        const data = await response.json();
        poisonPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load poison-type Pokémon:", error);
        poisonResult.textContent = "Failed to load poison-type Pokémon.";
        return;
    }

    randomPoisonBtn.addEventListener("click", async function () {
        poisonResult.innerHTML = "Fetching Pokémon...";

        const randomName = poisonPokemonList[Math.floor(Math.random() * poisonPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            poisonResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            poisonResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Steel.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomSteelBtn = document.getElementById("randomsteel");
    const steelResult = document.getElementById("steelResult");

    if (!randomSteelBtn || !steelResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Steel-type Pokémon
    let steelPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/steel");
        const data = await response.json();
        steelPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load Steel-type Pokémon:", error);
        steelResult.textContent = "Failed to load Steel-type Pokémon.";
        return;
    }

    randomSteelBtn.addEventListener("click", async function () {
        steelResult.innerHTML = "Fetching Pokémon...";

        const randomName = steelPokemonList[Math.floor(Math.random() * steelPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            steelResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            steelResult.textContent = "Failed to load Pokémon details.";
        }
    });
});

// === Psychic.HTML FUNCTIONALITY ===

document.addEventListener("DOMContentLoaded", async function () {
    const randomPsychicBtn = document.getElementById("randompsychic");
    const psychicResult = document.getElementById("psychicResult");

    if (!randomPsychicBtn || !psychicResult) {
        console.error("❌ Missing button or result container.");
        return;
    }

    // Fetch Psychic-type Pokémon
    let psychicPokemonList = [];

    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/Psychic");
        const data = await response.json();
        psychicPokemonList = data.pokemon.map(p => p.pokemon.name);
    } catch (error) {
        console.error("Failed to load Psychic-type Pokémon:", error);
        psychicResult.textContent = "Failed to load Psychic-type Pokémon.";
        return;
    }

    randomPsychicBtn.addEventListener("click", async function () {
        psychicResult.innerHTML = "Fetching Pokémon...";

        const randomName = psychicPokemonList[Math.floor(Math.random() * psychicPokemonList.length)];

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
            const pokemon = await res.json();

            psychicResult.innerHTML = `
                <h3>${pokemon.name.toUpperCase()}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">View Pokédex Entry</a>
            `;
        } catch (error) {
            console.error("❌ Error fetching Pokémon details:", error);
            psychicResult.textContent = "Failed to load Pokémon details.";
        }
    });
});