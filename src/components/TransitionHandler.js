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
                defer={delayNext}
                timeout={{ enter: 4000, exit: 5000 }}
                timeout={{ enter: entryFor, exit: exitTimeout }}
                key={props.location.pathname}
              >
                {transitionStatus => {
                  const childWithTransitionState = React.Children.map(
                    children,
                    child => {
                      return React.cloneElement(child, {
                        transitionStatus: transitionStatus,
                        entryState: entryState,
                        exitState: exitState
                      });
                    }
                  );

                  return (
                    <div style={{ position: "absolute", width: "100%" }}>
                      <PublicProvider
                        value={{ transitionStatus, entryState, exitState }}
                      >
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
