import React, { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { Consumer } from "../context/createTransitionContext";
import { PublicProvider } from "../context/createTransitionContext";
import { delayTransitionRender } from "./delayTransitionRender";
import { returnTransitionState } from "../utils/returnTransitionState";
import { Location } from "@reach/router";
import { getMs } from "../utils/secondsMs";
import { onEnter } from "../functions/onEnter";
import { onExit } from "../functions/onExit";
import { LayoutComponent as Layout } from "./Layout";
import { pageMinHeight } from "../functions/pageMinHeight";

const DelayedTransition = delayTransitionRender(Transition);
export class TransitionHandler extends Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
    this.updatePageMinHeight = this.updatePageMinHeight.bind(this);
  }
  componentDidMount() {
    this.updatePageMinHeight();
    window.addEventListener("resize", this.updatePageMinHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePageMinHeight);
  }

  updatePageMinHeight() {
    setTimeout(
      () =>
        pageMinHeight({
          node: this.wrapper
        }),
      1
    );
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
                  <TransitionGroup>
                    <DelayedTransition
                      key={pathname} // we're using seconds but transitiongroup uses ms
                      delay={getMs(entryDelay)}
                      timeout={{
                        enter: getMs(entryLength),
                        exit: getMs(exitLength)
                      }}
                      onEnter={node =>
                        onEnter({
                          node,
                          action,
                          inTransition,
                          entryTrigger,
                          entryProps,
                          exitProps,
                          pathname,
                          updateContext,
                          pageMinHeight,
                          e
                        })
                      }
                      onExit={node =>
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
                              position: "absolute",
                              width: "100%",
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
