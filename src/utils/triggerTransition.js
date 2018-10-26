import { navigate } from "gatsby";

const triggerTransition = ({
  event,
  exitFor,
  updateExitTimeout,
  updateDelayNext,
  entryIn,
  to,
  entryState,
  exitFn,
  exitState,
  updateEntryState,
  updateExitState
}) => {
  event.preventDefault();

  updateExitTimeout(exitFor);
  updateDelayNext(entryIn);

  exitFn(exitFor);

  navigate(to);
  updateEntryState(entryState);
  updateExitState(exitState);

  setTimeout(() => updateExitTimeout(0), exitFor);
  setTimeout(() => updateDelayNext(0), entryIn);
};

export { triggerTransition };
