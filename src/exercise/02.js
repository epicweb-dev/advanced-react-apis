// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon';
import {useCallback, useEffect, useLayoutEffect, useRef} from 'react';

function useSafeDispatch(dispatch) {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback((...args) => {
    if (mountedRef.current)
      dispatch(...args);
  }, [dispatch]);
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(pokemonInfoReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState
  });
  const dispatch = useSafeDispatch(unsafeDispatch);

  const run = useCallback((promise) => {
    dispatch({type: 'pending'});
    promise.then(
      data => {
        dispatch({type: 'resolved', data});
      },
      error => {
        dispatch({type: 'rejected', error});
      },
    );
  }, [dispatch]);

  return {...state, run};
}

function pokemonInfoReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null};
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null};
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PokemonInfo({pokemonName}) {
  const {data, status, error, run} = useAsync({status: pokemonName ? 'pending' : 'idle',});

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    const pokemonPromise = fetchPokemon(pokemonName);
    run(pokemonPromise);
  }, [pokemonName, run]);

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>;
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />;
    case 'rejected':
      throw error;
    case 'resolved':
      return <PokemonDataView pokemon={data} />;
    default:
      throw new Error('This should be impossible');
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
}

export default AppWithUnmountCheckbox;
