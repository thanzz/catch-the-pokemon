import { useReducer, useEffect, useRef } from 'react';
import axios from 'axios';
import Pokemon from './components/Pokemon';
import CaughtPokemon from './components/CaughtPokemon';
import ScoreCard from './components/ScoreCard';
import { ACTIONS, INITIAL_STATE, usePokemonReducer } from './reducers/usePokemonReducer';

function App() {

  const [state, dispatch] = useReducer(usePokemonReducer, INITIAL_STATE);
  const parentRef = useRef(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${state.nextPokemonID}`);
        dispatch({ type: ACTIONS.FETCH, payload: response.data })
      } catch (error) {
        // console.error(error).
        dispatch({ type: ACTIONS.NEXT })
      }
    };
    fetchData();
  }, [state.nextPokemonID]);

  const handlePokemonClick = (pokemonCaught) => {
    if (state.count !== 5) {
      dispatch({ type: ACTIONS.CAUGHT, payload: pokemonCaught })
      dispatch({ type: ACTIONS.COUNT })
      dispatch({ type: ACTIONS.NEXT })
    }
  }
  return (

    <div className="App">
      <ScoreCard score={state.count} />
      <div className='pokemon-place' ref={parentRef}>
        {
          state.count !== 5 && state.isVisible &&
          <Pokemon data={state.pokemon} handlePokemonClick={handlePokemonClick} parentRef={parentRef} />
        }
        {
          state.count === 5 &&
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
