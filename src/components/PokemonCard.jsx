import { useState } from "react";
import "../styles/pokemonCard.css"

const STAT_LABELS = {
    hp: "HP",
    attack: "Attaque",
    defense: "Défense",
    "special-attack": "Att. Spé",
    "special-defense": "Déf. Spé",
    speed: "Vitesse"
};

const MAX_STAT = 200;

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

                    <div className="pokemon-image">
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
