const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 100;

export async function fetchPokemonList() {
    const response = await fetch(`${POKEAPI_BASE}?limit=${LIMIT}`);
    const data = await response.json();
    return Promise.all(data.results.map((pokemon) => fetchPokemonDetail(pokemon.url)));
}

async function fetchPokemonDetail(url) {
    const response = await fetch(url);
    const data = await response.json();
    return transformPokemon(data);
}

function transformPokemon(data) {
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other?.["official-artwork"]?.front_default ?? null,
        types: data.types.map((type) => type.type.name),
        stats: data.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
        })),
        height: data.height,
        weight: data.weight,
    };
}
