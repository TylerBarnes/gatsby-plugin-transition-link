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
          {({
            exitDelay,
            exitLength,
            exitState,
            entryDelay,
            entryLength,
            entryState
          }) => (
            <TransitionGroup>
              <DelayedTransition
                delay={entryDelay}
                timeout={{ enter: entryLength, exit: exitLength }}
                key={props.location.pathname}
              >
                {transitionStatus => {
                  const transitionState = {
                    transitionStatus,
                    entry: {
                      state: entryState,
                      delay: entryDelay,
                      length: entryLength
                    },
                    exit: {
                      state: exitState,
                      delay: exitDelay,
                      exit: exitLength
                    }
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
