import React from 'react';
import BoneControls from '../../../src/js/components/BoneControls';
import dispatch from '../../../src/js/dispatch';

jest.mock('../../../src/js/dispatch');

describe('BoneControls', () => {
  let shallowWrapper, props;

  function render() {
    return shallow(<BoneControls {...props} />);
  }

  beforeEach(() => {
    dispatch.mockClear();
    props = {
      boneId: 'body',
      bones: [
        {
          id: 'baseBone',
          name: 'baseBone',
          parent: null,
          x: '300',
          y: '320',
          boneLength: '200',
          angle: '270'
        },
        {
          id: 'body',
          name: 'body',
          parent: 'baseBone',
          x: '300',
          y: '320',
          boneLength: '200',
          angle: '270'
        },
        {
          id: 'child1',
          name: 'child1',
          parent: 'body',
          x: '300',
          y: '320',
          boneLength: '200',
          angle: '270'
        },
        {
          id: 'child1',
          name: 'child1',
          parent: 'body',
          x: '300',
          y: '320',
          boneLength: '200',
          angle: '270'
        },
        {
          id: 'child1',
          name: 'child1',
          parent: 'body',
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

  test('it should render any child bones', () => {
    expect(shallowWrapper.find(BoneControls).length).toEqual(3);
  });

  test('it should not render a remove bone button if the bone is the base bone', () => {
    props.boneId = 'baseBone';
    shallowWrapper = render();
    const removeBoneButton = shallowWrapper
      .find('.bone-controls')
      .at(0)
      .find('.remove-bone-button');
    expect(removeBoneButton.length).toEqual(0);
  });

  test('clicking the add bone button should dispatch ADD_BONE', () => {
    shallowWrapper
      .find('.add-bone-button')
      .at(0)
      .simulate('click');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_BONE',
      parentId: 'body'
    });
  });

  test('clicking the remove bone button should dispatch ADD_BONE', () => {
    shallowWrapper
      .find('.remove-bone-button')
      .at(0)
      .simulate('click');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_BONE',
      id: 'body'
    });
  });

  test('changing the bone name should dispatch UPDATE_BONE', () => {
    shallowWrapper
      .find('.bone-name-input')
      .at(0)
      .simulate('change', { target: { value: 'newValue' } });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_BONE',
      id: 'body',
      field: 'name',
      value: 'newValue'
    });
  });

  test('changing the bone x should dispatch UPDATE_BONE', () => {
    shallowWrapper
      .find('.bone-x-input')
      .at(0)
      .simulate('change', { target: { value: 'newValue' } });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_BONE',
      id: 'body',
      field: 'x',
      value: 'newValue'
    });
  });

  test('changing the bone y should dispatch UPDATE_BONE', () => {
    shallowWrapper
      .find('.bone-y-input')
      .at(0)
      .simulate('change', { target: { value: 'newValue' } });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_BONE',
      id: 'body',
      field: 'y',
      value: 'newValue'
    });
  });

  test('changing the bone length should dispatch UPDATE_BONE', () => {
    shallowWrapper
      .find('.bone-length-input')
      .at(0)
      .simulate('change', { target: { value: 'newValue' } });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_BONE',
      id: 'body',
      field: 'boneLength',
      value: 'newValue'
    });
  });

  test('changing the bone angle should dispatch UPDATE_BONE', () => {
    shallowWrapper
      .find('.bone-angle-input')
      .at(0)
      .simulate('change', { target: { value: 'newValue' } });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_BONE',
      id: 'body',
      field: 'angle',
      value: 'newValue'
    });
  });
});
