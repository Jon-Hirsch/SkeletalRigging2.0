import React from 'react';
import App from '../../../src/js/components/App';
import BoneControls from '../../../src/js/components/BoneControls';

describe('App', () => {
  let shallowWrapper, state;

  function render() {
    return shallow(<App state={state} />);
  }

  beforeEach(() => {
    state = {
      bones: [
        {
          id: 'blah',
          name: 'anything',
          parent: 'body',
          x: '300',
          y: '320',
          boneLength: '200',
          angle: '270'
        },
        {
          id: 'body',
          name: 'body',
          parent: null,
          x: '300',
          y: '320',
          boneLength: '200',
          angle: '270'
        }
      ]
    };
    shallowWrapper = render();
  });

  test('should match snapshot', () => {
    expect(shallowWrapper.getElement()).toMatchSnapshot();
  });

  test('should render a boneControl with the base bone', () => {
    const boneControls = shallowWrapper.find(BoneControls);
    expect(boneControls.props().boneId).toEqual('body');
  });
});
