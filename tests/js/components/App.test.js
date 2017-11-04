import React from 'react';
import App from '../../../src/js/components/App';

describe('App', () => {
  let shallowWrapper, state;

  function render() {
    return shallow(<App state={state} />);
  }

  beforeEach(() => {
    shallowWrapper = render();
  });

  test('should match snapshot', () => {
    expect(shallowWrapper.getElement()).toMatchSnapshot();
  });
});
