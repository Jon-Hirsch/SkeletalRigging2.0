import ReactDOM from 'react-dom';
import initSkeletalRigging from '../../src/js/index';
import { initDispatch } from '../../src/js/dispatch';

jest.mock('react-dom');
jest.mock('../../src/js/dispatch');

describe('initSkeletalRigging', () => {
  beforeEach(() => {
    window.document.getElementById = jest.fn(() =>
      document.createElement('div')
    );
  });

  test('should call initDispatch', () => {
    initSkeletalRigging();
    expect(initDispatch).toHaveBeenCalled();
  });

  test('should call ReactDOM.render', () => {
    initSkeletalRigging();
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
