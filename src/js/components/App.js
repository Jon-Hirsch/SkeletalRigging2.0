import React from 'react';
import PropTypes from 'prop-types';
import BoneControls from './BoneControls';

export default function App({ state }) {
  const baseBone = state.bones.find(bone => bone.parent === null);
  return <BoneControls boneId={baseBone.id} bones={state.bones} />;
}

App.propTypes = {
  state: PropTypes.shape({
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
  }).isRequired
};
