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
    const storageKey = `@@scroll|${pathname}`;
    const savedPosition = sessionStorage.getItem(storageKey);
    window.scrollTo(...JSON.parse(savedPosition));
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
