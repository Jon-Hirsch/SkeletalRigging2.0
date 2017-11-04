export const defaultState = {
  bones: [
    {
      id: 'body',
      parent: null,
      x: '300',
      y: '320',
      boneLength: '200',
      angle: '270'
    },
    {
      id: 'leftUpperArm',
      parent: 'body',
      x: '75',
      y: '0',
      boneLength: '75',
      angle: '-90'
    },
    {
      id: 'leftForearm',
      parent: 'leftUpperArm',
      x: '0',
      y: '0',
      boneLength: '75',
      angle: '45'
    },
    {
      id: 'rightUpperArm',
      parent: 'body',
      x: '75',
      y: '0',
      boneLength: '75',
      angle: '90'
    },
    {
      id: 'rightForearm',
      parent: 'rightUpperArm',
      x: '0',
      y: '0',
      boneLength: '75',
      angle: '-45'
    },
    {
      id: 'leftUpperLeg',
      parent: 'body',
      x: '200',
      y: '0',
      boneLength: '75',
      angle: '215'
    },
    {
      id: 'leftLowerLeg',
      parent: 'leftUpperLeg',
      x: '0',
      y: '0',
      boneLength: '75',
      angle: '-25'
    },
    {
      id: 'rightUpperLeg',
      parent: 'body',
      x: '200',
      y: '0',
      boneLength: '75',
      angle: '-215'
    },
    {
      id: 'rightLowerLeg',
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
    default: {
      return state;
    }
  }
}
