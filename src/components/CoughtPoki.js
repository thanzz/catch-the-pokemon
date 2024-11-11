export default function CaughtPoki({ imgSrc, name }) {
    return (
        <div className="pokemon-card">
            <img src={imgSrc}
                alt="Pokimon under costody"
                className="captive"
            />
            <p>{name}</p>
        </div>
    )
}