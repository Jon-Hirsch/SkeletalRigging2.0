import { degreesToRadians } from '../../../src/js/canvasClasses/helpers';

describe('helpers', () => {
  describe('degreesToRadians', () => {
    test('converts degrees to radians', () => {
      expect(degreesToRadians(90)).toEqual(0.5 * Math.PI);
    });
  });
});
