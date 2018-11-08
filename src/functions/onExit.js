const onExit = ({
  node,
  inTransition,
  exitTrigger,
  entryProps,
  exitProps,
  e
}) => {
  if (!inTransition) return;

  return (
    exitTrigger &&
    typeof exitTrigger === "function" &&
    exitTrigger({
      entry: entryProps,
      exit: exitProps,
      node,
      e
    })
  );
};

export { onExit };
