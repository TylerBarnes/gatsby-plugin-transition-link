import handleScroll from "../utils/handleScroll";

const onEnter = ({
  node,
  inTransition,
  entryTrigger,
  entryProps,
  exitProps,
  pathname,
  navigationType,
  e
}) => {
  handleScroll({ navigationType, pathname });

  if (!inTransition || !node) return;

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
