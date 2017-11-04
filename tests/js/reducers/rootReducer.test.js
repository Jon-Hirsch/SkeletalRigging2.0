import rootReducer from '../../../src/js/reducers/rootReducer';

describe('rootReducer', () => {
  describe('default', () => {
    test('return the the default shape', () => {
      expect(rootReducer(undefined, {})).toEqual({});
    });
  });
});
