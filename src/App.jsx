import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

const MoonIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="20"
        height="20"
        aria-hidden="true"
    >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 9 9 0 0 0 21 12.79z" />
    </svg>
);

const SunIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="20"
        height="20"
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const getInitialDark = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
};

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(getInitialDark);

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
        const root = document.documentElement;
        root.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

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
                <h1>Pokedex</h1>
                <button
                    type="button"
                    className="theme-toggle"
                    onClick={() => setDark((d) => !d)}
                    aria-label={dark ? "Passer au mode clair" : "Passer au mode sombre"}
                >
                    {dark ? <SunIcon /> : <MoonIcon />}
                </button>
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
