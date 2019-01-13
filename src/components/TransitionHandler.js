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

const DelayedTransition = delayTransitionRender(Transition);
export default class TransitionHandler extends Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

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
                  <div
                    className="tl-wrapper-outer"
                    style={{ maxWidth: "100%", overflowX: "hidden" }}
                  >
                    <TransitionGroup component={null}>
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
                          const transitionState = returnTransitionState({
                            inTransition,
                            location: props.location,
                            transitionIdHistory,
                            transitionStatus,
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
                          });

                          const exitZindex = exitProps.zIndex || 0;
                          const entryZindex = entryProps.zIndex || 1;

                          const childWithTransitionState = React.Children.map(
                            children,
                            child => {
                              return React.cloneElement(child, {
                                ...transitionState
                              });
                            }
                          );

                          return (
                            <div
                              ref={n => (this.wrapper = n)}
                              className="tl-wrapper"
                              style={{
                                width: "100%",
                                float: "left",
                                zIndex:
                                  transitionStatus === "entering" ||
                                  transitionStatus === "entered"
                                    ? entryZindex
                                    : exitZindex
                              }}
                            >
                              <PublicProvider value={{ ...transitionState }}>
                                {childWithTransitionState}
                              </PublicProvider>
                              <style
                                dangerouslySetInnerHTML={{
                                  __html: `
                                  .tl-wrapper + .tl-wrapper {
                                    margin-left: -100%;
                                  }
                                `
                                }}
                              />
                            </div>
                          );
                        }}
                      </DelayedTransition>
                    </TransitionGroup>
                  </div>
                </Layout>
              )}
            </Location>
          );
        }}
      </Consumer>
    );
  }
}
