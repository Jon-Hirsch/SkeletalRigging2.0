import dispatch, { initDispatch } from '../../src/js/dispatch';

describe('dispatch', () => {
  test('initDispatch should set dispatch to the passed function', () => {
    const newDispatch = jest.fn();
    initDispatch(newDispatch);
    dispatch();
    expect(newDispatch).toHaveBeenCalled();
  });
});
