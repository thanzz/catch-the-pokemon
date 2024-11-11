export default function CaughtPokemon({ imgSrc, name }) {
    return (
        <div className="pokemon-card">
            <img src={imgSrc}
                alt="Pokemon under costody"
                className="captive"
            />
            <p>{name}</p>
        </div>
    )
}