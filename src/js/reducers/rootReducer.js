const defaultState = {};

export default function rootReducer(state = defaultState, action = {}) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
