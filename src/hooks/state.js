import React from "react";
import { type } from "ramda";
export const useState = (initialState = {}) => {
  const [state, setUseState] = React.useState(initialState);

  const setState = React.useCallback(
    newState => {
      if (type(newState) === "Array")
        return setUseState(prev => [...prev, ...newState]);

      if (type(newState) === "Object")
        return setUseState(prev => ({ ...prev, ...newState }));

      return setUseState(newState);
    },
    [state]
  );

  return [state, setState];
};
