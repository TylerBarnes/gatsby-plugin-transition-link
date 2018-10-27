import { navigate } from "gatsby";

const triggerTransition = ({
  to,
  event = null,
  exit = {},
  entry = {},
  inTransition,
  toggleInTransition,
  updateDelayNext,
  updateExitTimeout,
  updateEntryState,
  updateExitState,
  updateEntryFor
}) => {
  event.preventDefault();

  if (inTransition) return false;
  toggleInTransition(true);

  const {
    length: exitFor = 0,
    delay: exitIn = 0,
    state: exitState = {},
    trigger: exitTrigger = false
  } = exit;
  const {
    length: entryFor = 0,
    delay: entryIn = 0,
    state: entryState = {},
    trigger: entryTrigger = false
  } = entry;

  updateEntryFor(entryFor);
  updateExitTimeout(exitFor);
  updateDelayNext(entryIn);

  exitTrigger && exitTrigger(exit);

  // wait for exitIn to start navigating
  setTimeout(() => {
    navigate(to);

    updateExitState(exitState);
    setTimeout(() => updateExitTimeout(0), exitFor);

    // wait for entryIn to begin our entry animation
    setTimeout(() => {
      entryTrigger && entryTrigger(entry);
      updateEntryState(entryState);
      updateDelayNext(0);
      toggleInTransition(false);

      if (typeof window !== `undefined`) window.scrollTo(0, 0);
    }, entryIn);
  }, exitIn);
};

export { triggerTransition };
