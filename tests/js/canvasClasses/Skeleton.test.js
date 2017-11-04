import Skeleton from '../../../src/js/canvasClasses/Skeleton';
import { defaultState } from '../../../src/js/reducers/rootReducer';

const context = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  arc: jest.fn()
};

describe('Skeleton', () => {

  test('it can handle generating bones with invalid values', () => {
    const skeleton = new Skeleton([{
      id: 'body',
      parent: null,
      x: '-',
      y: 'a',
      boneLength: '.',
      angle: 'z'
    }], context);
    const bone = skeleton.bones[0];
    expect(bone.x).toEqual(0);
    expect(bone.y).toEqual(0);
    expect(bone.boneLength).toEqual(0);
    expect(bone.angle).toEqual(0);
  });

  describe('draw', () => {
    test('calls draw on the first bone in its list of bones', () => {
      const skeleton = new Skeleton(defaultState.bones, context);
      skeleton.bones[0].draw = jest.fn();
      skeleton.draw();
      expect(skeleton.bones[0].draw).toHaveBeenCalled();
    });
  });

  describe('calculateCoordinates', () => {
    test('calls calculateCoordinates on the first bone in its list of bones', () => {
      const skeleton = new Skeleton(defaultState.bones, context);
      skeleton.bones[0].calculateCoordinates = jest.fn();
      skeleton.calculateCoordinates();
      expect(skeleton.bones[0].calculateCoordinates).toHaveBeenCalled();
    });
  });
});
