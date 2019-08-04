import { setTimeout } from "requestanimationframe-timer";

const onEnter = ({
  node,
  inTransition,
  entryTrigger,
  entryProps,
  exitProps,
  triggerResolve,
  pathname,
  entryProps: { delay = 0 },
  appearAfter = 0,
  e
}) => {
  if (inTransition) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, appearAfter);
  } else {
    // If session storage fails due to cookies being disabled, 
    // scroll to the top after every navigation
    let position = [0, 0];
    try {
      const storageKey = `@@scroll|${pathname}`;
      position = JSON.parse(sessionStorage.getItem(storageKey));
    }
    catch(e) {
      console.warn(`[gatsby-plugin-transition-link] Unable to save state in sessionStorage; sessionStorage is not available.`)
    } finally {
      window.scrollTo(...position);
    }
  }

  if (!inTransition) return;

  const { trigger: removed, ...entryPropsTrimmed } = entryProps;

  const timeout = appearAfter + delay;

  const visiblePromise = new Promise(resolve => {
    setTimeout(() => resolve(), timeout);
  });

  triggerResolve.entry({
    ...entryPropsTrimmed,
    visible: visiblePromise,
    node
  });

  entryTrigger &&
    typeof entryTrigger === "function" &&
    entryTrigger({
      entry: entryProps,
      exit: exitProps,
      node,
      e
    });
};

export { onEnter };
