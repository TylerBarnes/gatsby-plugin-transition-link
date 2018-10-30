import { navigate } from "gatsby";

const triggerTransition = ({
  to,
  event = null,
  exit = {},
  entry = {},
  inTransition,
  updateContext
}) => {
  event.preventDefault();

  if (inTransition) return false;

  updateContext({
    inTransition: true,
    exitDelay: 0,
    exitLength: 0,
    exitState: {}
  });

  const {
    length: exitLength = 0,
    delay: exitDelay = 0,
    state: exitState = {},
    trigger: exitTrigger = false
  } = exit;
  const {
    length: entryLength = 0,
    delay: entryDelay = 0,
    state: entryState = {},
    trigger: entryTrigger = false
  } = entry;

  updateContext({
    entryLength: entryLength,
    entryDelay: entryDelay,
    exitLength: exitLength,
    exitDelay: exitDelay
  });

  exitTrigger && exitTrigger(exit);

  setTimeout(() => {
    // wait for exitDelay before we start navigating and adding exit state
    navigate(to);
    updateContext({ exitState: exitState });
  }, exitDelay);

  // reset animation times so they dont apply when using browser back/forward
  //  this will be replaced with a better solution in the future
  setTimeout(
    () =>
      updateContext({
        exitDelay: 0,
        exitLength: 0
      }),
    exitDelay + exitLength
  );

  setTimeout(() => {
    // wait for entryDelay before we trigger our entry function and add entry state
    entryTrigger && entryTrigger(entry);
    updateContext({
      entryState: entryState
    });

    // scrollto window top at the exact moment the next page comes in.
    if (typeof window !== `undefined`) window.scrollTo(0, 0);
  }, exitDelay + entryDelay);

  // reset animation times so they dont apply when using browser back/forward.
  //  this will be replaced with a better solution in the future
  setTimeout(
    () =>
      updateContext({
        entryDelay: 0,
        entryLength: 0,
        inTransition: false
      }),
    exitDelay + entryDelay + entryLength
  );
};

export { triggerTransition };
