const returnTransitionState = ({
  location,
  transitionIdHistory,
  inTransition,
  ...transitionState
}) => {
  if (inTransition) return transitionState;

  const currentId =
    location.state && location.state.transitionId
      ? location.state.transitionId
      : false;
  const transitionIdWithoutLastTransition = transitionIdHistory.slice(0, -1);

  if (transitionIdWithoutLastTransition.includes(currentId)) {
    return {
      transitionStatus: "POP",
      entry: {
        state: {},
        delay: 0,
        length: 0
      },
      exit: {
        state: {},
        delay: 0,
        length: 0
      }
    };
  }

  return transitionState;
};

export { returnTransitionState };
