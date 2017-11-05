import React from 'react';
import PropTypes from 'prop-types';
import dispatch from '../dispatch';

export default function BoneControls({ boneId, bones }) {
  const currentBone = bones.find(bone => bone.id === boneId);
  const children = bones.filter(bone => bone.parent === boneId);
  return (
    <div className="skeletal-rigging-bone-controls">
      <div className="bone-controls">
        <div>
          name:{' '}
          <input
            className="bone-name-input"
            type="text"
            value={currentBone.name}
            onChange={event =>
              updateBone(currentBone.id, 'name', event.target.value)}
          />
          x:{' '}
          <input
            className="bone-x-input"
            type="text"
            value={currentBone.x}
            onChange={event =>
              updateBone(currentBone.id, 'x', event.target.value)}
          />
          y:{' '}
          <input
            className="bone-y-input"
            type="text"
            value={currentBone.y}
            onChange={event =>
              updateBone(currentBone.id, 'y', event.target.value)}
          />
          length:{' '}
          <input
            className="bone-length-input"
            type="text"
            value={currentBone.boneLength}
            onChange={event =>
              updateBone(currentBone.id, 'boneLength', event.target.value)}
          />
          angle:{' '}
          <input
            type="text"
            className="bone-angle-input"
            value={currentBone.angle}
            onChange={event =>
              updateBone(currentBone.id, 'angle', event.target.value)}
          />
          <button
            className="add-bone-button"
            onClick={() => addBone(currentBone.id)}
          >
            Add Bone
          </button>
          {currentBone.parent && (
            <button
              className="remove-bone-button"
              onClick={() => removeBone(currentBone.id)}
            >
              Remove Bone
            </button>
          )}
        </div>
        <div />
      </div>
      {children.map(childBone => (
        <BoneControls key={childBone.id} boneId={childBone.id} bones={bones} />
      ))}
    </div>
  );
}

function addBone(id) {
  dispatch({
    type: 'ADD_BONE',
    parentId: id
  });
}

function removeBone(id) {
  dispatch({
    type: 'REMOVE_BONE',
    id
  });
}

function updateBone(id, field, value) {
  dispatch({
    type: 'UPDATE_BONE',
    id,
    field,
    value
  });
}

BoneControls.propTypes = {
  boneId: PropTypes.string.isRequired,
  bones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parent: PropTypes.string,
      x: PropTypes.string.isRequired,
      y: PropTypes.string.isRequired,
      boneLength: PropTypes.string.isRequired,
      angle: PropTypes.string.isRequired
    })
  ).isRequired
};
