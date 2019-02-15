import React, { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { Consumer } from "../context/createTransitionContext";
import { PublicProvider } from "../context/createTransitionContext";
import delayTransitionRender from "./delayTransitionRender";
import { returnTransitionState } from "../utils/returnTransitionState";
import { Location } from "@reach/router";
import { getMs } from "../utils/secondsMs";
import { onEnter } from "../functions/onEnter";
import { onExit } from "../functions/onExit";
import { LayoutComponent as Layout } from "./Layout";

import "../style.css";

const DelayedTransition = delayTransitionRender(Transition);
export default class TransitionHandler extends Component {
  render() {
    const { props } = this;
    const { children } = props;
    return (
      <Consumer>
        {({
          exitDelay,
          exitLength,
          exitState,
          entryDelay,
          entryLength,
          entryState,
          entryTrigger,
          entryProps,
          exitTrigger,
          exitProps,
          transitionIdHistory,
          inTransition,
          updateContext,
          e
        }) => {
          return (
            <Location>
              {({ location: { action, pathname } }) => (
                <Layout {...props}>
                  <TransitionGroup>
                    <DelayedTransition
                      key={pathname} // we're using seconds but transitiongroup uses ms
                      delay={getMs(entryDelay)}
                      timeout={{
                        enter: getMs(entryLength),
                        exit: getMs(exitLength)
                      }}
                      onEnter={node =>
                        !!node &&
                        onEnter({
                          node,
                          action,
                          inTransition,
                          entryTrigger,
                          entryProps,
                          exitProps,
                          pathname,
                          updateContext,
                          e
                        })
                      }
                      onExit={node =>
                        !!node &&
                        onExit({
                          node,
                          inTransition,
                          exitTrigger,
                          entryProps,
                          exitProps,
                          e
                        })
                      }
                    >
                      {transitionStatus => {
                        const mount =
                          transitionStatus === "entering" ||
                          transitionStatus === "entered";

                        const states = {
                          entry: {
                            state: entryState,
                            delay: entryDelay,
                            length: entryLength
                          },
                          exit: {
                            state: exitState,
                            delay: exitDelay,
                            length: exitLength
                          }
                        };

                        const current = mount ? states.entry : states.exit;

                        const transitionState = returnTransitionState({
                          inTransition,
                          location: props.location,
                          transitionIdHistory,
                          transitionStatus,
                          current,
                          mount,
                          ...states
                        });

                        const exitZindex = exitProps.zIndex || 0;
                        const entryZindex = entryProps.zIndex || 1;

                        return (
                          <div
                            className={`tl-wrapper ${
                              mount
                                ? "tl-wrapper--mount"
                                : "tl-wrapper--unmount"
                            } tl-wrapper-status--${transitionStatus}`}
                            style={{
                              zIndex: mount ? entryZindex : exitZindex
                            }}
                          >
                            <PublicProvider value={{ ...transitionState }}>
                              {/* pass transition state to page/template */}
                              {React.cloneElement(children, {
                                ...transitionState
                              })}
                            </PublicProvider>
                          </div>
                        );
                      }}
                    </DelayedTransition>
                  </TransitionGroup>
                </Layout>
              )}
            </Location>
          );
        }}
      </Consumer>
    );
  }
}
