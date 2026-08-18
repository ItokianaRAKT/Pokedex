import { useState, useEffect } from "react";
import { fetchPokemonList } from "../api/pokemonApi";

export function usePokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPokemonList().then((data) => {
            setPokemons(data);
            setLoading(false);
        });
    }, []);

    return { pokemons, loading };
}
