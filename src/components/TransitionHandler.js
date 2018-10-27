import React from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { Consumer } from "../context/createTransitionContext";
import { PublicProvider } from "../context/createTransitionContext";
import InternalProvider from "../context/InternalProvider";

const TransitionHandler = props => {
  return (
    <InternalProvider>
      <Consumer>
        {({ delayNext, exitTimeout, entryState, exitState }) => (
          <TransitionGroup>
            <Transition
              timeout={{ enter: delayNext, exit: exitTimeout }}
              key={props.location.pathname}
            >
              {transitionStatus => {
                const isExiting =
                  transitionStatus !== "entered" &&
                  transitionStatus !== "entering";

                const passedState = isExiting ? exitState : entryState;
                const passedStateWithStatus = Object.assign({}, passedState, {
                  status: transitionStatus
                });

                const childWithTransitionState = React.Children.map(
                  props.children,
                  child => {
                    return React.cloneElement(child, {
                      transitionStatus: transitionStatus,
                      entryState: entryState,
                      exitState: exitState
                    });
                  }
                );

                return transitionStatus !== "entering" ? (
                  <div style={{ position: "absolute", width: "100%" }}>
                    <PublicProvider
                      value={{ transitionStatus, entryState, exitState }}
                    >
                      {childWithTransitionState}
                    </PublicProvider>
                  </div>
                ) : null;
              }}
            </Transition>
          </TransitionGroup>
        )}
      </Consumer>
    </InternalProvider>
  );
};

export default TransitionHandler;
