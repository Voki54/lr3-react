export const combineReducers = (reducers) => {
    return (state = {}, action) => {
      const nextState = {};
      for (const key in reducers) {
        const reducer = reducers[key];
        const prevStateForKey = state[key];
        const nextStateForKey = reducer(prevStateForKey, action);
        nextState[key] = nextStateForKey;
      }
      return nextState;
    };
  };
  