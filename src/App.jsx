import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [scrolled, setScrolled] = useState(false);

    const limit = 100;

    useEffect(() => {
        async function fetchPokemons() {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
            );

            const data = await response.json();

            const pokemonsDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const data = await response.json();

                    return {
                        id: data.id,
                        name: data.name,
                        image: data.sprites.other["official-artwork"].front_default,
                        types: data.types.map((type) => type.type.name),
                        stats: data.stats.map((stat) => ({
                            name: stat.stat.name,
                            value: stat.base_stat
                        })),
                        height: data.height,
                        weight: data.weight
                    };
                })
            );

            setPokemons(pokemonsDetails);
        }

        fetchPokemons();
    }, []);

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 0);
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <header className={`topbar${scrolled ? " scrolled" : ""}`}>
                <h1>Pokédex</h1>
            </header>

            <main>
                <div className="pokemon-grid">
                    {pokemons.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}

export default App;
