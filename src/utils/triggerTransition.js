import { navigate } from "gatsby";
import random from "lodash/random";
import { setTimeout } from "requestanimationframe-timer";
import { getMs } from "./secondsMs";

const triggerTransition = ({
  to,
  exit = {},
  entry = {},
  transitionIdHistory,
  triggerFunctionHistory,
  updateContext,
  updateHandlerState,
  locationKey
}) => {
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
    trigger: entryTrigger = () => {}
  } = entry;

  // const transitionId = random(10000, 99999, false);

  navigate(to, {
    state: {
      transitionId: locationKey,
      entry: {
        state: entryState,
        delay: entryDelay,
        length: entryLength
      },
      exit: {
        state: exitState,
        delay: exitDelay,
        length: exitLength
      }
    }
  });

  updateContext({
    inTransition: true,
    exitState: exitState,
    transitionIdHistory: [...transitionIdHistory, locationKey],
    triggerFunctionHistory: [
      ...triggerFunctionHistory,
      { locationKey, entry: entryTrigger, exit: exitTrigger }
    ],
    entryLength: entryLength,
    entryDelay: entryDelay,
    exitLength: exitLength,
    exitDelay: exitDelay,
    entryProps: entry,
    exitProps: exit,
    exitTrigger: exitTrigger,
    entryTrigger: entryTrigger,
    e: event
  });

  setTimeout(() => {
    // wait for entryDelay before we add entry state
    updateContext({ entryState: entryState });
  }, getMs(exitDelay + entryDelay));

  const finalResetSeconds =
    exitDelay + Math.max(exitLength, entryDelay + entryLength);

  setTimeout(() => {
    // Once all animation is finished, it's safe to start a new animation since we're no longer inTransition.
    updateHandlerState({
      inTransition: {
        entry: false,
        exit: false
      }
    });

    updateContext({
      inTransition: false,
      e: false,
      entryTrigger: () => {},
      exitTrigger: () => {}
    });
  }, getMs(finalResetSeconds) + 1);
};

export { triggerTransition };
