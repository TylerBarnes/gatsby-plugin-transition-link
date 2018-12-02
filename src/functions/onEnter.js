export const onEnter = ({
  node,
  inTransition,
  entryTrigger,
  entryProps,
  exitProps,
  pathname,
  pageMinHeight,
  updateContext,
  e
}) => {
  pageMinHeight({ node, updateContext });

  if (inTransition) {
    window.scrollTo(0, 0);
  } else {
    const storageKey = `@@scroll|${pathname}`;
    const savedPosition = sessionStorage.getItem(storageKey);
    window.scrollTo(...JSON.parse(savedPosition));
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
