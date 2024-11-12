import { useReducer, useEffect, useRef } from 'react';
import axios from 'axios';
import Pokemon from './components/Pokemon';
import CaughtPokemon from './components/CaughtPokemon';
import ScoreCard from './components/ScoreCard';
import { ACTIONS, INITIAL_STATE, usePokemonReducer } from './reducers/usePokemonReducer';

function App() {

  const [state, dispatch] = useReducer(usePokemonReducer, INITIAL_STATE);
  const parentRef = useRef(null);
  const score = state.pokemonCaught.length;

  //fetch new Pokemon
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${state.nextPokemonID}`);
        //set the pokemon details
        dispatch({ type: ACTIONS.FETCH, payload: response.data })
      } catch (error) {
        // console.error(error).
        //if error try another pokemon
        dispatch({ type: ACTIONS.NEXT })
      }
    };
    fetchData();
  }, [state.nextPokemonID]);//every time new ID generates, a new pokemon is fetched

  const handlePokemonClick = (pokemonCaught) => {
    //callback function from <Pokemon/>  which sets the caught pokemon, increases the count and fetch the next pokemon
    if (score !== state.winningScore) {
      dispatch({ type: ACTIONS.CAUGHT, payload: pokemonCaught })
      dispatch({ type: ACTIONS.NEXT })
    }
  }
  return (

    <div className="App">
      <ScoreCard score={score} winningScore={state.winningScore} />
      <div className='pokemon-place' ref={parentRef}>
        {
          score !== state.winningScore && state.isVisible &&
          <Pokemon data={state.pokemon} handlePokemonClick={handlePokemonClick} parentRef={parentRef} />
        }
        {
          score === state.winningScore &&
          <div className='winner-banner'>
            <h1>You won</h1>
            <button type='button' onClick={() => dispatch({ type: ACTIONS.RESET })}>RESET</button>
          </div>
        }
      </div>
      <div className='jail'>
        {
          state.pokemonCaught.map((item, index) =>
            <CaughtPokemon imgSrc={item.image} name={item.name} key={index} />)
        }
      </div>
    </div>
  );
}

export default App;
