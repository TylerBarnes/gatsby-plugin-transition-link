import { navigate } from "gatsby";

const triggerTransition = ({
  to,
  event = null,
  exitFn = false,
  exitFor = 0,
  entryIn = 0,
  entryFor = 0,
  entryState = {},
  exitState = {},
  updateDelayNext,
  updateExitTimeout,
  updateEntryState,
  updateExitState,
  toggleInTransition,
  inTransition,
  updateEntryFor
}) => {
  event.preventDefault();

  if (inTransition) return false;
  toggleInTransition(true);

  updateEntryFor(entryFor);
  updateExitTimeout(exitFor);
  updateDelayNext(entryIn);

  exitFn && exitFn(exitFor);

  navigate(to);

  updateExitState(exitState);
  setTimeout(() => updateExitTimeout(0), exitFor);

  setTimeout(() => {
    updateEntryState(entryState);
    updateDelayNext(0);
    toggleInTransition(false);

    if (typeof window !== `undefined`) window.scrollTo(0, 0);
  }, entryIn);
};

export { triggerTransition };
