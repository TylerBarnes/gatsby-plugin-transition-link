import { navigate } from "gatsby";

const triggerTransition = ({
  to,
  event = null,
  exitFn = false,
  exitFor = 0,
  entryIn = 0,
  entryState = {},
  exitState = {},
  updateDelayNext,
  updateExitTimeout,
  updateEntryState,
  updateExitState,
  toggleInTransition,
  inTransition
}) => {
  event.preventDefault();

  if (inTransition) return false;
  toggleInTransition(true);

  updateExitTimeout(exitFor);
  updateDelayNext(entryIn);

  exitFn && exitFn(exitFor);

  navigate(to, {
    entryState: entryState,
    exitState: exitState
  });

  updateExitState(exitState);
  setTimeout(() => updateExitTimeout(0), exitFor);

  setTimeout(() => {
    updateEntryState(entryState);
    updateDelayNext(0);
    toggleInTransition(false);
  }, entryIn);
};

export { triggerTransition };
