import React, { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { Consumer } from "../context/createTransitionContext";
import { PublicProvider } from "../context/createTransitionContext";
import InternalProvider from "../context/InternalProvider";
import delayTransitionRender from "./delayTransitionRender";

const DelayedTransition = delayTransitionRender(Transition);
export default class TransitionHandler extends Component {
  render() {
    const { props } = this;
    const { children } = props;
    return (
      <InternalProvider>
        <Consumer>
          {({ delayNext, exitTimeout, entryState, exitState, entryFor }) => (
            <TransitionGroup>
              <DelayedTransition
                delay={delayNext}
                timeout={{ enter: entryFor, exit: exitTimeout }}
                key={props.location.pathname}
              >
                {transitionStatus => {
                  const transitionState = {
                    transitionStatus,
                    entryState,
                    exitState
                  };

                  const childWithTransitionState = React.Children.map(
                    children,
                    child => {
                      return React.cloneElement(child, {
                        ...transitionState
                      });
                    }
                  );

                  return (
                    <div style={{ position: "absolute", width: "100%" }}>
                      <PublicProvider value={{ ...transitionState }}>
                        {childWithTransitionState}
                      </PublicProvider>
                    </div>
                  );
                }}
              </DelayedTransition>
            </TransitionGroup>
          )}
        </Consumer>
      </InternalProvider>
    );
  }
}
