import { isVisible } from "@testing-library/user-event/dist/utils"

export const ACTIONS = {
    COUNT: 'count',
    NEXT: 'next',
    CAUGHT: 'caught',
    FETCH: 'fetch',
    RESET: 'reset'
}
export const INITIAL_STATE = {
    count: 0,
    nextPokemonID: parseInt(Math.floor(Math.random() * 1118)),
    pokemonCaught: [],
    isVisible: true,
    pokemon: {
        image: '',
        name: ''
    }
}

export const usePokemonReducer = (state, action) => {
    switch (action.type) {
        case 'count':
            return {
                ...state, count: state.count === 5 ? state.count = 5 : state.count + 1
            }
        case 'next':
            return {
                ...state, nextPokemonID: parseInt(Math.floor(Math.random() * 1000))
            }
        case 'caught':
            return {
                ...state,
                pokemonCaught: [{
                    image: action.payload.image,
                    name: action.payload.name
                }, ...state.pokemonCaught],
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
