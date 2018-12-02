import "polyfill-array-includes";

export const returnTransitionState = ({
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
  const historyWithoutLast = transitionIdHistory.slice(0, -1);

  if (currentId && historyWithoutLast.includes(currentId)) {
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
