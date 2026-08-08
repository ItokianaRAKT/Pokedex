import { useState } from "react";
import "../styles/pokemonCard.css"

const STAT_LABELS = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed"
};

const MAX_STAT = 200;

const TYPE_COLORS = {
    normal: "#919aa2",
    fighting: "#ce416b",
    flying: "#89aae3",
    poison: "#ab6ac8",
    ground: "#d97845",
    rock: "#c5b78c",
    bug: "#91c12f",
    ghost: "#5269ad",
    steel: "#5a8ea2",
    fire: "#ff9d55",
    water: "#5090d6",
    grass: "#63bc5a",
    electric: "#f4d23c",
    psychic: "#fa7179",
    ice: "#73cec0",
    dragon: "#0a6dc4",
    dark: "#5a5366",
    fairy: "#ec8fe6"
};

const STAT_COLORS = {
    hp: { light: "#ffb3b3", dark: "#e53935" },
    attack: { light: "#ffcc80", dark: "#fb8c00" },
    defense: { light: "#fff3b0", dark: "#f2c94c" },
    "special-attack": { light: "#a5d6ff", dark: "#1e88e5" },
    "special-defense": { light: "#b2ebf2", dark: "#00838f" },
    speed: { light: "#c8e6c9", dark: "#43a047" }
};

const FALLBACK_TYPE_COLOR = "#c5c5c5";
const FALLBACK_STAT_COLOR = { light: "#7aa8ff", dark: "#5b7cfa" };

function PokemonCard({ pokemon }) {
    const [flipped, setFlipped] = useState(false);

    const toggleFlip = () => setFlipped((prev) => !prev);

    const height = (pokemon.height / 10).toFixed(1);
    const weight = (pokemon.weight / 10).toFixed(1);

    return (
        <article
            className={`flip-card ${flipped ? "flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`${pokemon.name} : voir les statistiques`}
            onClick={toggleFlip}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleFlip();
                }
            }}
        >
            <div className="flip-card-inner">
                <div className="card-face card-front">
                    <div className="pokemon-number">
                        #{String(pokemon.id).padStart(3, "0")}
                    </div>

                    <div
                        className="pokemon-image"
                        style={{
                            "--type1": TYPE_COLORS[pokemon.types[0]] ?? FALLBACK_TYPE_COLOR
                        }}
                    >
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div className="pokemon-info">
                        <h2>{pokemon.name}</h2>

                        <div className="pokemon-types">
                            {pokemon.types.map((type) => (
                                <span
                                    key={type}
                                    className={`type type-${type}`}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card-face card-back">
                    <h2 className="back-name">{pokemon.name}</h2>

                    <div className="back-stats">
                        {pokemon.stats.map((stat) => (
                            <div className="stat-row" key={stat.name}>
                                <span className="stat-label">
                                    {STAT_LABELS[stat.name] ?? stat.name}
                                </span>
                                <div className="stat-bar">
                                    <div
                                        className="stat-fill"
                                        style={
                                            flipped
                                                ? {
                                                      "--stat-light": STAT_COLORS[stat.name]?.light ?? FALLBACK_STAT_COLOR.light,
                                                      "--stat-dark": STAT_COLORS[stat.name]?.dark ?? FALLBACK_STAT_COLOR.dark,
                                                      width: `${Math.min(
                                                          (stat.value / MAX_STAT) * 100,
                                                          100
                                                      )}%`
                                                  }
                                                : undefined
                                        }
                                    ></div>
                                </div>
                                <span className="stat-value">{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="back-measures">
                        <div className="measure">
                            <span>Taille</span>
                            <strong>{height} m</strong>
                        </div>
                        <div className="measure">
                            <span>Poids</span>
                            <strong>{weight} kg</strong>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default PokemonCard;
