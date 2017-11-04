import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import '../styles/app.scss';
import { initDispatch } from './dispatch';

document.addEventListener('DOMContentLoaded', initSkeletalRigging);

export default function initSkeletalRigging () {
  const container = document.getElementById('SkeletalRiggingContainer');
  const controlsContainer = document.createElement('div');

  container.appendChild(controlsContainer);

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    const state = store.getState();
    ReactDOM.render(<App state={state} />, controlsContainer);
  });

  initDispatch(store.dispatch);
}
