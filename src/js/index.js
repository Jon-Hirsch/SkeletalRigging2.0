import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer, { defaultState } from './reducers/rootReducer';
import App from './components/App';
import CanvasManager from './canvasClasses/CanvasManager';
import '../styles/app.scss';
import { initDispatch } from './dispatch';

document.addEventListener('DOMContentLoaded', initSkeletalRigging);

export default function initSkeletalRigging () {
  const container = document.getElementById('SkeletalRiggingContainer');
  const controlsContainer = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;

  container.appendChild(canvas);
  container.appendChild(controlsContainer);
  const manager = new CanvasManager(canvas, defaultState.bones);

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    const state = store.getState();
    ReactDOM.render(<App state={state} />, controlsContainer);
    manager.generateSkeleton(state.bones);
    manager.draw();
  });

  initDispatch(store.dispatch);
  store.dispatch({ type: 'INITIALIZE' });
}
