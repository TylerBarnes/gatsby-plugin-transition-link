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
  updateExitState
}) => {
  event.preventDefault();

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
  }, entryIn);
};

export { triggerTransition };
