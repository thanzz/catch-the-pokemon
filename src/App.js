import { useReducer, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './components/Pokemon';
import CaughtPoki from './components/CoughtPoki';
import ScoreCard from './components/ScoreCard';
import { ACTIONS, INITIAL_STATE, usePokemonReducer } from './reducers/usePokemonReducer';
import './App.css';

function App() {

  const [state, dispatch] = useReducer(usePokemonReducer, INITIAL_STATE);

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

  const handlePokimonHunted = (pokemonCaught) => {
    if (state.count !== 5) {
      dispatch({ type: ACTIONS.CAUGHT, payload: pokemonCaught })
      dispatch({ type: ACTIONS.COUNT })
      dispatch({ type: ACTIONS.NEXT })
    }
  }

  return (
    <div className="App">
      {/* <p>count: {state.count}</p>
      <p>next id: {state.nextPokemonID}</p> */}
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>RESET</button>
      <div className='pokimon-place'>
        {
          state.count !== 5 ?
            <Pokemon data={state.pokemon} handlePokimonHunted={handlePokimonHunted} />
            :
            <h1>You won</h1>
        }
      </div>
      <ScoreCard score={state.count} />
      <div className='jail'>
        {state.pokemonCaught.map((item, index) =>
          <CaughtPoki imgSrc={item.image} name={item.name} key={index} />)
        }
      </div>

    </div>
  );
}

export default App;
