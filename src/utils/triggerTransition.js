import { navigate, withPrefix } from "gatsby";
import random from "lodash/random";
import { setTimeout } from "requestanimationframe-timer";
import { getMs } from "./secondsMs";
import getPagesPromises from "./getPagesPromises";

const triggerTransition = ({
  to,
  event = null,
  exit = {},
  entry = {},
  inTransition,
  transitionIdHistory,
  pages,
  trigger,
  updateContext,
  linkState,
  replace
}) => {
  event.persist();
  event.preventDefault();

  if (inTransition) return false;

  // these globals prevent the back button from being pressed during a transition as that can have unexpected results
  window.__tl_inTransition = true;
  window.__tl_desiredPathname = withPrefix(to);

  updateContext({
    inTransition: true,
    exitDelay: 0,
    exitLength: 0,
    appearAfter: 0,
    exitState: {}
  });

  if (trigger && typeof trigger === "function") {
    trigger(pages);
  }

  const {
    length: exitLength = 0,
    delay: exitDelay = 0,
    state: exitState = {},
    trigger: exitTrigger = () => {}
  } = exit;
  const {
    length: entryLength = 1, // this allows scrollposition to be reset when there is no transition.
    delay: entryDelay = 0,
    state: entryState = {},
    trigger: entryTrigger = () => {},
    appearAfter = 0
  } = entry;

  updateContext({
    entryLength: entryLength,
    entryDelay: entryDelay,
    exitLength: exitLength,
    exitDelay: exitDelay,
    entryProps: entry,
    exitProps: exit,
    appearAfter,
    exitTrigger: (exit, node, e) => exitTrigger(exit, node, e),
    entryTrigger: (entry, node, e) => entryTrigger(entry, node, e),
    e: event
  });

  // after exitDelay
  setTimeout(() => {
    const transitionId = random(10000, 99999, false);

    navigate(to, {
      state: {
        transitionId,
        ...linkState
      },
      replace
    });

    updateContext({
      exitState: exitState,
      transitionIdHistory: [...transitionIdHistory, transitionId]
    });
  }, getMs(exitDelay));

  setTimeout(() => {
    // wait for entryDelay before we add entry state
    updateContext({ entryState: entryState });
  }, getMs(exitDelay + entryDelay));

  // reset entry animation times so they dont apply when using browser back/forward.
  //  this will be replaced with a better solution in the future
  setTimeout(
    () =>
      updateContext({
        entryDelay: 0,
        appearAfter: 0,
        entryLength: 0
      }),
    getMs(exitDelay + entryDelay + entryLength)
  );

  const finalResetSeconds =
    exitDelay + Math.max(exitLength, entryDelay + entryLength);

  // reset exit animation times so they dont apply when using browser back/forward.
  //  this will be replaced with a better solution in the future
  setTimeout(() => {
    // these globals prevent the back button from being pressed during a transition as that can have unexpected results
    window.__tl_inTransition = false;
    window.__tl_desiredPathname = false;
    window.__tl_back_button_pressed = false;

    updateContext({
      exitDelay: 0,
      exitLength: 0,
      // Once all animation is finished, it's safe to start a new animation since we're no longer inTransition.
      inTransition: false,
      // create new page promises for the trigger prop
      ...getPagesPromises()
    });
  }, getMs(finalResetSeconds) + 1);
};

export { triggerTransition };
