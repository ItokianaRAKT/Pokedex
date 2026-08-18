import "../styles/loader.css";

function Loader() {
    return (
        <div className="loader">
            <div className="loader-bar">
                <div className="loader-fill"></div>
            </div>
            <p className="loader-text">Chargement des Pokémon...</p>
        </div>
    );
}

export default Loader;
