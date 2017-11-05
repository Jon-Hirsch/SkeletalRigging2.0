import shortid from 'shortid';

export const defaultState = {
  bones: [
    {
      id: 'body',
      name: 'body',
      parent: null,
      x: '300',
      y: '320',
      boneLength: '200',
      angle: '270'
    },
    {
      id: 'leftUpperArm',
      name: 'leftUpperArm',
      parent: 'body',
      x: '75',
      y: '0',
      boneLength: '75',
      angle: '-90'
    },
    {
      id: 'leftForearm',
      name: 'leftForearm',
      parent: 'leftUpperArm',
      x: '0',
      y: '0',
      boneLength: '75',
      angle: '45'
    },
    {
      id: 'rightUpperArm',
      name: 'rightUpperArm',
      parent: 'body',
      x: '75',
      y: '0',
      boneLength: '75',
      angle: '90'
    },
    {
      id: 'rightForearm',
      name: 'rightForearm',
      parent: 'rightUpperArm',
      x: '0',
      y: '0',
      boneLength: '75',
      angle: '-45'
    },
    {
      id: 'leftUpperLeg',
      name: 'leftUpperLeg',
      parent: 'body',
      x: '200',
      y: '0',
      boneLength: '75',
      angle: '215'
    },
    {
      id: 'leftLowerLeg',
      name: 'leftLowerLeg',
      parent: 'leftUpperLeg',
      x: '0',
      y: '0',
      boneLength: '75',
      angle: '-25'
    },
    {
      id: 'rightUpperLeg',
      name: 'rightUpperLeg',
      parent: 'body',
      x: '200',
      y: '0',
      boneLength: '75',
      angle: '-215'
    },
    {
      id: 'rightLowerLeg',
      name: 'rightLowerLeg',
      parent: 'rightUpperLeg',
      x: '0',
      y: '0',
      boneLength: '75',
      angle: '25'
    }
  ]
};

export default function rootReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE': {
      return defaultState;
    }
    case 'ADD_BONE': {
      const newBone = {
        id: shortid.generate(),
        name: '',
        parent: action.parentId,
        x: '0',
        y: '0',
        boneLength: '100',
        angle: '0'
      };
      const bones = [newBone].concat(state.bones);
      return Object.assign({}, state, { bones });
    }
    case 'REMOVE_BONE': {
      const idsToFilter = getDescendents(action.id, state.bones)
        .map(bone => bone.id)
        .concat([action.id]);
      const filteredBones = state.bones.filter(
        bone => !idsToFilter.includes(bone.id)
      );
      return Object.assign({}, state, { bones: filteredBones });
    }
    case 'UPDATE_BONE': {
      const bones = state.bones.slice(0);
      const index = bones.findIndex(bone => bone.id === action.id);
      bones[index] = Object.assign({}, bones[index], {
        [action.field]: action.value
      });
      return Object.assign({}, state, { bones });
    }
    default: {
      return state;
    }
  }
}

function getDescendents(id, bones) {
  let descendents = [];
  const children = bones.filter(bone => bone.parent === id);
  descendents = descendents.concat(children);
  children.forEach(childBone => {
    descendents = descendents.concat(getDescendents(childBone.id, bones));
  });
  return descendents;
}
