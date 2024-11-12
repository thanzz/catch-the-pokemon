
export const ACTIONS = {
    NEXT: 'next',
    CAUGHT: 'caught',
    FETCH: 'fetch',
    RESET: 'reset'
}
export const INITIAL_STATE = {
    winningScore: 10,
    nextPokemonID: parseInt(Math.floor(Math.random() * 1000)),
    pokemonCaught: [],
    isVisible: false,
    pokemon: {
        image: '',
        name: ''
    }
}

export const usePokemonReducer = (state, action) => {
    switch (action.type) {
        case 'next':
            return {
                ...state, nextPokemonID: parseInt(Math.floor(Math.random() * 1000))
            }
        case 'caught':
            return {
                ...state,
                pokemonCaught: [...state.pokemonCaught, {
                    image: action.payload.image,
                    name: action.payload.name
                }],
                isVisible: false
            }
        case 'fetch':
            return {
                ...state,
                pokemon: {
                    image: action.payload.sprites.front_default,
                    name: action.payload.name
                },
                isVisible: true
            }
        case 'reset':
            return {
                ...state, count: 0, pokemonCaught: []
            }
        default:
            return state;
    }
}
