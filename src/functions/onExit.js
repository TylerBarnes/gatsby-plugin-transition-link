const onExit = ({
  node,
  handlerInTransition,
  updateHandlerState,
  exitTrigger,
  entryProps,
  exitProps,
  navigationType,
  browseDirection,
  e
}) => {
  // only fire function if the user clicked a link
  if (!e) return;

  // bail if the node doesn't exist anymore
  if (!node) return;

  // only trigger the function if onExit isn't currently animating
  if (!handlerInTransition.exit) {
    updateHandlerState({ inTransition: { exit: true } });
  } else {
    return;
  }

  return (
    exitTrigger &&
    typeof exitTrigger === "function" &&
    exitTrigger({
      navigationType,
      browseDirection,
      entry: entryProps,
      exit: exitProps,
      node,
      e
    })
  );
};

export { onExit };
