const onEnter = ({
  node,
  action,
  inTransition,
  entryTrigger,
  entryProps,
  exitProps,
  pathname,
  e
}) => {
  // fix scroll jumping when navigating with browser buttons
  if (typeof action !== `undefined` && action !== "PUSH") {
    const storageKey = `@@scroll|${pathname}`;
    const savedPosition = sessionStorage.getItem(storageKey);
    window.scrollTo(...JSON.parse(savedPosition));
  } else {
    window.scrollTo(0, 0);
  }

  if (!inTransition) return;

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
