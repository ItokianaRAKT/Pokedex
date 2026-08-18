import { useTheme } from "./hooks/useTheme";
import { useScroll } from "./hooks/useScroll";
import { usePokemons } from "./hooks/usePokemons";
import MoonIcon from "./components/icons/MoonIcon";
import SunIcon from "./components/icons/SunIcon";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";

function App() {
    const { dark, setDark } = useTheme();
    const scrolled = useScroll();
    const { pokemons, loading } = usePokemons();

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
                {loading ? (
                    <Loader />
                ) : (
                    <div className="pokemon-grid">
                        {pokemons.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                pokemon={pokemon}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
