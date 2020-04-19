import React from "react";

export function useAnimatedContainerState(state: boolean) {
  const [active, setActiveState] = React.useState(state);
  React.useEffect(() => {
    setActiveState(state);
    return () => {
      setActiveState(false);
    };
  }, [state]);

  return {
    animatedContainerState: active,
    setAnimatedContainerState: setActiveState
  };
}

export function useOverLayState(state: boolean) {
  const [active, setActiveState] = React.useState(state);
  React.useEffect(() => {
    setActiveState(state);
    return () => {
      setActiveState(false);
    };
  }, [state]);
  return { overLayState: active, setOverLayState: setActiveState };
}
