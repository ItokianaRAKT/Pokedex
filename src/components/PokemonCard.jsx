import "../styles/pokemonCard.css"
function PokemonCard({ pokemon }) {
    return (
        <article className="pokemon-card">
            <div className="pokemon-number">
                #{String(pokemon.id).padStart(3, "0")}
            </div>

            <div className="pokemon-image">
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
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
        </article>
    );
}

export default PokemonCard;
