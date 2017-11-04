let dispatch;

export default function(action) {
  return dispatch(action);
}

export function initDispatch(newDispatch) {
  dispatch = newDispatch;
}
