import { navigate } from "gatsby";
import random from "lodash/random";
import { setTimeout } from "requestanimationframe-timer";
import { getMs } from "./secondsMs";

const triggerTransition = ({
  to,
  event = null,
  exit = {},
  entry = {},
  inTransition,
  transitionIdHistory,
  updateContext
}) => {
  event.persist();
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
    trigger: exitTrigger = () => {}
  } = exit;
  const {
    length: entryLength = 0,
    delay: entryDelay = 0,
    state: entryState = {},
    trigger: entryTrigger = () => {}
  } = entry;

  updateContext({
    entryLength: entryLength,
    entryDelay: entryDelay,
    exitLength: exitLength,
    exitDelay: exitDelay,
    entryProps: entry,
    exitProps: exit,
    exitTrigger: (exit, node, e) => exitTrigger(exit, node, e),
    entryTrigger: (entry, node, e) => entryTrigger(entry, node, e),
    e: event
  });

  setTimeout(() => {
    // after exitDelay
    const transitionId = random(10000, 99999, false);
    navigate(to, { state: { transitionId: transitionId } });
    updateContext({
      exitState: exitState,
      transitionIdHistory: [...transitionIdHistory, transitionId]
    });
  }, getMs(exitDelay));

  setTimeout(() => {
    // wait for entryDelay before we add entry state
    updateContext({ entryState: entryState });
  }, getMs(exitDelay + entryDelay));

  // reset animation times so they dont apply when using browser back/forward.
  //  this will be replaced with a better solution in the future
  setTimeout(
    () =>
      updateContext({
        entryDelay: 0,
        entryLength: 0,
        exitDelay: 0,
        exitLength: 0,
        inTransition: false
      }),
    getMs(exitDelay + entryDelay + entryLength)
  );
};

export { triggerTransition };
