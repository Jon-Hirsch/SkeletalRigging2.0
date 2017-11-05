import shortid from 'shortid';
import rootReducer, {
  defaultState
} from '../../../src/js/reducers/rootReducer';

jest.mock('shortid');

describe('rootReducer', () => {
  beforeEach(() => {
    shortid.generate.mockReturnValue('123');
  });

  describe('default', () => {
    test('return the the default shape', () => {
      expect(rootReducer({}, {})).toEqual({});
    });
  });

  describe('INITIALIZE', () => {
    test('return the the default state', () => {
      expect(rootReducer({}, { type: 'INITIALIZE' })).toEqual(defaultState);
    });
  });

  describe('ADD_BONE', () => {
    test('Adds a new bone to the front of the list of bones', () => {
      const state = {
        bones: [{ id: 'oldBone' }]
      };
      expect(
        rootReducer(state, { type: 'ADD_BONE', parentId: 'oldBone' }).bones
      ).toEqual([
        {
          id: '123',
          name: '',
          parent: 'oldBone',
          x: '0',
          y: '0',
          boneLength: '100',
          angle: '0'
        },
        { id: 'oldBone' }
      ]);
    });
  });

  describe('REMOVE_BONE', () => {
    test('removes a bone and all its descendents', () => {
      const state = {
        bones: [
          { id: 'grandChildBone1', parent: 'childBone1' },
          { id: 'grandChildBone2', parent: 'childBone2' },
          { id: 'childBone1', parent: 'boneToRemove' },
          { id: 'childBone2', parent: 'boneToRemove' },
          { id: 'siblingBone', parent: 'baseBone' },
          { id: 'boneToRemove', parent: 'baseBone' },
          { id: 'baseBone', parent: null }
        ]
      };
      expect(
        rootReducer(state, { type: 'REMOVE_BONE', id: 'boneToRemove' }).bones
      ).toEqual([
        { id: 'siblingBone', parent: 'baseBone' },
        { id: 'baseBone', parent: null }
      ]);
    });
  });

  describe('UPDATE_BONE', () => {
    test('updates a field on a bone', () => {
      const state = {
        bones: [
          { id: 'childBone', parent: 'boneToUpdate' },
          { id: 'boneToUpdate', parent: 'baseBone', angle: '0' },
          { id: 'baseBone', parent: null }
        ]
      };
      expect(
        rootReducer(state, {
          type: 'UPDATE_BONE',
          id: 'boneToUpdate',
          field: 'angle',
          value: '90'
        }).bones
      ).toEqual([
        { id: 'childBone', parent: 'boneToUpdate' },
        { id: 'boneToUpdate', parent: 'baseBone', angle: '90' },
        { id: 'baseBone', parent: null }
      ]);
    });
  });
});
