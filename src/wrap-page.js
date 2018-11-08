import React from "react";
import TransitionHandler from "./components/TransitionHandler";
import InternalProvider from "./context/InternalProvider";

export default ({ element, props }) => {
  return (
    <TransitionHandler location={props.location}>{element}</TransitionHandler>
  );
};

const wrapRoot = ({ element }) => (
  <InternalProvider>{element}</InternalProvider>
);

export { wrapRoot };
