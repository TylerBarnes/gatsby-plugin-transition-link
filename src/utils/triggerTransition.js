import { navigate } from "gatsby";

const triggerTransition = ({
  event = null,
  props,
  // inTransition,
  // exit,
  // entry,
  toggleInTransition,
  // updateState,
  state: { inTransition }
  // readState
}) => {
  event.preventDefault();

  const { to } = props;

  // if (inTransition) return false;
  toggleInTransition(true);
  console.log(inTransition);
  toggleInTransition(false);
  console.log(inTransition);

  // updateEntryFor(entryFor);
  // console.log(readState("status"));
  // updateState({ status: "test" });
  // console.log(readState("status"));

  // updateExitTimeout(exitFor);
  // updateDelayNext(entryIn);

  // exitFn && exitFn(exitFor);

  navigate(to);

  // updateExitState(exitState);
  // setTimeout(() => updateExitTimeout(0), exitFor);

  // setTimeout(() => {
  //   updateEntryState(entryState);
  //   updateDelayNext(0);
  // toggleInTransition(false);

  // console.log(readState("entry"));

  //   if (typeof window !== `undefined`) window.scrollTo(0, 0);
  // }, entryIn);
};

export { triggerTransition };
