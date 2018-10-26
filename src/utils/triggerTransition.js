import { navigate } from "gatsby";

const triggerTransition = ({
  event = null,
  exitFor = 0,
  updateExitTimeout,
  updateDelayNext,
  entryIn = 0,
  to,
  entryState = {},
  exitFn = false,
  exitState = {},
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
