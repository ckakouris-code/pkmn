function normalizePokemonName(name) {
  const map = {
    "nidoran♀": "nidoran-f", "nidoranf": "nidoran-f", "nidoran\u2640": "nidoran-f",
    "nidoran♂": "nidoran-m", "nidoranm": "nidoran-m", "nidoran\u2642": "nidoran-m",
    "mr.mime": "mr-mime", "mr mime": "mr-mime",
    "mime jr.": "mime-jr", "mimejr": "mime-jr",
    "type: null": "type-null", "ho-oh": "ho-oh",
    "farfetch’d": "farfetchd", "sirfetch’d": "sirfetchd",
    "porygon-z": "porygon-z", "giratina-origin": "giratina"
  };
  return map[name.toLowerCase().trim()] || name.toLowerCase().trim();
}

document.addEventListener("DOMContentLoaded", () => {
  const bodyClass = document.body.classList;
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

  if (pageType) setupPokemonPage(pageType);

  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "pkmnpg-index.html";
    });
  }
});

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
      pokemonList = data.pokemon
        .filter(p => !p.pokemon.name.includes("-"))
        .map(p => p.pokemon.name);
      console.log(`✅ Loaded ${pokemonList.length} ${type}-type base Pokémon.`);
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

      if (pokemon.id > 1010 || pokemon.name.includes("-")) {
        console.warn("⚠️ Skipping unsupported or alternate form:", pokemon.name);
        resultContainer.textContent = "That Pokémon isn't supported in this Dex. Try again!";
        serebiiLink.classList.remove("show");
        bulbapediaLink.classList.remove("show");
        return;
      }

      const formattedName = normalizePokemonName(pokemon.name);
      const serebiiURL = `https://www.serebii.net/pokemon/${formattedName}/`;
      const bulbapediaURL = `https://bulbapedia.bulbagarden.net/wiki/${pokemon.name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/'/g, "%27")}_\(Pokémon\)`;

      resultContainer.innerHTML = `
        <h3>${pokemon.name.toUpperCase()}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
      `;

      serebiiLink.href = serebiiURL;
      bulbapediaLink.href = bulbapediaURL;
      serebiiLink.classList.remove("hidden");
      bulbapediaLink.classList.remove("hidden");
      serebiiLink.classList.add("show");
      bulbapediaLink.classList.add("show");

    } catch (error) {
      console.error(`❌ Error fetching Pokémon details:`, error);
      resultContainer.textContent = "Failed to load Pokémon details.";
      serebiiLink.classList.remove("show");
      bulbapediaLink.classList.remove("show");
    }
  });
}