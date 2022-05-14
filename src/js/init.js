import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer, { defaultState } from './reducers/rootReducer';
import App from './components/App';
import CanvasManager from './canvasClasses/CanvasManager';
import '../styles/app.scss';
import { initDispatch } from './dispatch';

export default function initSkeletalRigging() {
  const container = document.getElementById('SkeletalRiggingContainer');
  const controlsContainer = document.createElement('div');
  const canvas = document.createElement('canvas');

  window.addEventListener(
    'resize',
    debounce(() => {
      resizeCanvas(canvas);
      const state = store.getState();
      const scale = canvas.width / 600;
      manager.generateSkeleton(state.bones, scale);
      manager.draw();
    })
  );

  resizeCanvas(canvas);

  container.appendChild(canvas);
  container.appendChild(controlsContainer);
  const manager = new CanvasManager(canvas, defaultState.bones);

  const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  store.subscribe(() => {
    const state = store.getState();
    ReactDOM.render(<App state={state} />, controlsContainer);
    const scale = canvas.width / 600;
    manager.generateSkeleton(state.bones, scale);
    manager.draw();
  });

  initDispatch(store.dispatch);
  store.dispatch({ type: 'INITIALIZE' });
}

function resizeCanvas(canvas) {
  if (window.innerWidth < 375) {
    canvas.width = 300;
    canvas.height = 300;
  } else if (window.innerWidth < 850) {
    const size = (window.innerWidth / 850) * 600;
    canvas.width = size;
    canvas.height = size;
  } else {
    canvas.width = 600;
    canvas.height = 600;
  }
}

function debounce(callback) {
  let timer;

  return (params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(params);
    }, 200);
  };
}
