import handleScroll from "../utils/handleScroll";

const onEnter = ({
  node,
  handlerInTransition,
  updateHandlerState,
  entryTrigger,
  entryProps,
  exitProps,
  pathname,
  navigationType,
  browseDirection,
  e
}) => {
  // only fire function if the user clicked a link
  if (!e) return;

  // bail if the node doesn't exist anymore
  if (!node) return;

  // only trigger the function if onEnter isn't currently animating
  if (!handlerInTransition.entry) {
    updateHandlerState({ inTransition: { entry: true } });
  } else {
    return;
  }

  handleScroll({ navigationType, pathname });

  entryTrigger &&
    typeof entryTrigger === "function" &&
    entryTrigger({
      navigationType,
      browseDirection,
      entry: entryProps,
      exit: exitProps,
      node,
      e
    });
};

export { onEnter };
