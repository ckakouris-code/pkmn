document.addEventListener("DOMContentLoaded", async function () {
  console.log("✅ Main script loaded.");

  const bodyClass = document.body.classList;
  const isHomepage = bodyClass.length === 0;

  // === HOMEPAGE FUNCTIONALITY ===
  if (isHomepage) {
    const randomBtn = document.getElementById("randomButton");
    const typeDropdown = document.getElementById("type");
    const searchBtn = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResult = document.getElementById("searchResult");
    const randomTypeBtn = document.getElementById("randomTypeBtn");

    if (randomBtn && typeDropdown && searchResult) {
      randomBtn.addEventListener("click", async function () {
        const selectedType = typeDropdown.value;

        try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
          const data = await response.json();

          const pokemonData = await Promise.all(
            data.results.map(async (pokemon) => {
              const detailsResponse = await fetch(pokemon.url);
              return await detailsResponse.json();
            })
          );

          const filteredList = selectedType === "all"
            ? pokemonData
            : pokemonData.filter(p =>
                p.types.some(t => t.type.name === selectedType)
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

    if (randomTypeBtn) {
      const typePages = [
        "fire.html", "water.html", "grass.html", "electric.html", "psychic.html",
        "ice.html", "dragon.html", "dark.html", "fairy.html", "bug.html",
        "rock.html", "ground.html", "poison.html", "fighting.html", "steel.html",
        "ghost.html", "normal.html"
      ];
      randomTypeBtn.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * typePages.length);
        window.location.href = typePages[randomIndex];
      });
    }
  }

  // === TYPE PAGE FUNCTIONALITY ===
  const typeMappings = {
    pkfire: "fire", pkwater: "water", pkgrass: "grass", pkbug: "bug", pkrock: "rock",
    pkdark: "dark", pkelectric: "electric", pkfairy: "fairy", pkghost: "ghost", pkground: "ground",
    pkice: "ice", pkflying: "flying", pkfight: "fighting", pkdragon: "dragon", pknormal: "normal",
    pkpoison: "poison", pksteel: "steel", pkpsychic: "psychic"
  };

  let pageType = null;
  Object.keys(typeMappings).forEach(key => {
    if (bodyClass.contains(key)) {
      pageType = typeMappings[key];
    }
  });

  if (pageType) {
    setupPokemonPage(pageType);
  }

  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "pkmnpg-index.html";
    });
    console.log("✅ Home button active.");
  }

  function setupPokemonPage(type) {
    console.log(`🔎 Setting up ${type}-type Pokémon page.`);

    const randomBtn = document.getElementById(`random${type}`);
    const resultContainer = document.getElementById(`${type}Result`);
    const serebiiLink = document.getElementById("serebiiLink");
    const bulbapediaLink = document.getElementById("bulbapediaLink");

    if (!randomBtn || !resultContainer || !serebiiLink || !bulbapediaLink) {
      console.error(`❌ Missing elements for ${type} page.`);
      return;
    }

    let pokemonList = [];

    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(data => {
        pokemonList = data.pokemon.map(p => p.pokemon.name);
        console.log(`✅ Loaded ${pokemonList.length} ${type}-type Pokémon.`);
      })
      .catch(error => {
        console.error(`❌ Error loading ${type}-type Pokémon list:`, error);
        resultContainer.textContent = "Failed to load Pokémon list.";
      });

    randomBtn.addEventListener("click", async function () {
      if (pokemonList.length === 0) {
        resultContainer.textContent = `No ${type}-type Pokémon found.`;
        return;
      }

      resultContainer.innerHTML = "Fetching Pokémon...";
      const randomName = pokemonList[Math.floor(Math.random() * pokemonList.length)];

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
        const pokemon = await res.json();

        const paddedID = pokemon.id.toString().padStart(3, "0");
        const serebiiURL = `https://www.serebii.net/pokemon/${paddedID}.shtml`;
        const bulbapediaURL = `https://bulbapedia.bulbagarden.net/wiki/${pokemon.name.replace(/\s+/g, "_")}_(Pokémon)`;

        resultContainer.innerHTML = `
          <h3>${pokemon.name.toUpperCase()}</h3>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
        `;

        // Reveal and set links
        serebiiLink.href = serebiiURL;
        bulbapediaLink.href = bulbapediaURL;
        serebiiLink.classList.remove("hidden");
        bulbapediaLink.classList.remove("hidden");
        serebiiLink.classList.add("show");
        bulbapediaLink.classList.add("show");
      } catch (error) {
        console.error(`❌ Error fetching ${type}-type Pokémon details:`, error);
        resultContainer.textContent = "Failed to load Pokémon details.";
        serebiiLink.classList.remove("show");
        bulbapediaLink.classList.remove("show");
      }
    });
  }
});