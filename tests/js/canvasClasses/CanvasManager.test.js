import CanvasManager from '../../../src/js/canvasClasses/CanvasManager';
import dispatch from '../../../src/js/dispatch';
import { defaultState } from '../../../src/js/reducers/rootReducer';

jest.mock('../../../src/js/dispatch');

const context = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  arc: jest.fn(),
  clearRect: jest.fn(),
};

const canvas = {
  getContext: () => context,
  addEventListener: jest.fn(),
  getBoundingClientRect: () => ({ top: 10, left: 10 }),
  style: {},
};

describe('CanvasManager', () => {
  beforeEach(() => {
    dispatch.mockClear();
  });

  describe('draw', () => {
    test('clears the canvas', () => {
      const canvasManager = new CanvasManager(canvas, defaultState.bones);
      canvasManager.draw();
      expect(context.clearRect).toHaveBeenCalled();
    });

    test('clears the draw method of the skeleton', () => {
      const canvasManager = new CanvasManager(canvas, defaultState.bones);
      canvasManager.skeleton.draw = jest.fn();
      canvasManager.draw();
      expect(canvasManager.skeleton.draw).toHaveBeenCalled();
    });
  });

  describe('handleMouseDown', () => {
    test('it sets currentDragBone to any bone that has its drag point at the mouse coordinates', () => {
      const canvasManager = new CanvasManager(canvas, defaultState.bones);
      canvasManager.skeleton.bones[1].endX = 10;
      canvasManager.skeleton.bones[1].endY = 10;
      canvasManager.handleMouseDown({
        clientX: 20,
        clientY: 20,
        preventDefault: () => {},
      });
      expect(canvasManager.currentDragBone).toEqual(canvasManager.skeleton.bones[1]);
    });
  });

  describe('handleMouseUp', () => {
    test('sets the current drag bone to null', () => {
      const canvasManager = new CanvasManager(canvas, defaultState.bones);
      canvasManager.currentDragBone = 'drag bone';
      canvasManager.handleMouseUp();
      expect(canvasManager.currentDragBone).toEqual(null);
    });
  });

  describe('handleMouseMove', () => {
    describe('if a bone is being dragged', () => {
      let canvasManager;
      beforeEach(() => {
        canvasManager = new CanvasManager(canvas, defaultState.bones);
        canvasManager.currentDragBone = {
          pointToward: jest.fn(),
          id: '1',
          angle: 0,
        };
      });

      test('it calls the bones pointToward method with the mouse coordinates relative to the canvas', () => {
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20, preventDefault: () => {} });
        expect(canvasManager.currentDragBone.pointToward).toHaveBeenCalledWith(10, 10);
      });

      test('it calls draw', () => {
        canvasManager.draw = jest.fn();
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20, preventDefault: () => {} });
        expect(canvasManager.draw).toHaveBeenCalled();
      });

      test('it calls dispatch with UPDATE_BONE', () => {
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20, preventDefault: () => {} });
        expect(dispatch).toHaveBeenCalledWith({
          type: 'UPDATE_BONE',
          id: '1',
          field: 'angle',
          value: '0',
        });
      });
    });

    describe('if a bone is not being dragged', () => {
      let canvasManager;
      beforeEach(() => {
        canvasManager = new CanvasManager(canvas, defaultState.bones);
      });

      test('it sets currentHoverBone to any bone that has its drag point at the mouse coordinates', () => {
        canvasManager.skeleton.bones[1].endX = 10;
        canvasManager.skeleton.bones[1].endY = 10;
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20, preventDefault: () => {} });
        expect(canvasManager.currentHoverBone).toEqual(canvasManager.skeleton.bones[1]);
      });

      test('it sets the canvas cursor style to pointer if a hover bone is found', () => {
        canvasManager.skeleton.bones[1].endX = 10;
        canvasManager.skeleton.bones[1].endY = 10;
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20, preventDefault: () => {} });
        expect(canvasManager.canvas.style.cursor).toEqual('pointer');
      });

      test('it sets the canvas cursor style to default if a hover bone is not found', () => {
        canvasManager.handleMouseMove({ clientX: 20, clientY: 20, preventDefault: () => {} });
        expect(canvasManager.canvas.style.cursor).toEqual('default');
      });
    });
  });
});
