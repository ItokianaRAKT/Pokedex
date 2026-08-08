import { useState, useEffect } from "react";
import { fetchPokemonList } from "../api/pokemonApi";

export function usePokemons() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemonList().then(setPokemons);
    }, []);

    return pokemons;
}
