import React, { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { Consumer } from "../context/createTransitionContext";
import delayTransitionRender from "./delayTransitionRender";
// import { returnTransitionState } from "../utils/returnTransitionState";

import { getMs } from "../utils/secondsMs";
import { onEnter } from "../functions/onEnter";
import { onExit } from "../functions/onExit";
import { LayoutComponent as Layout } from "./Layout";
import { PageWrapper } from "./PageWrapper/index.js";
import { Location } from "@reach/router";

const DelayedTransition = delayTransitionRender(Transition);

export default class TransitionHandlerWrapper extends Component {
  render() {
    return (
      <Consumer>
        {context => (
          <TransitionHandler context={{ ...context }} {...this.props} />
        )}
      </Consumer>
    );
  }
}

class TransitionHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationHistory: [this.props.location.key],
      browseDirection: false,
      navigationType: false
    };
  }

  componentDidUpdate(prevProps) {
    // only update our state when navigation has occurred
    if (prevProps.location.key === this.props.location.key) return;

    // check if we've been here before
    if (this.state.locationHistory.includes(this.props.location.key)) {
      const currentIndex =
        this.state.locationHistory.indexOf(this.props.location.key) + 1;
      const lastIndex =
        this.state.locationHistory.indexOf(prevProps.location.key) + 1;

      // if the last index of our location key is greater than the current index, we're moving backwards.
      // because our key exists we know this is a historical page
      return this.setState({
        browseDirection: lastIndex > currentIndex ? "back" : "forward",
        navigationType: "history"
      });
    }

    // not a historical page, the user definitely triggered forward navigation
    this.setState({
      locationHistory: [...this.state.locationHistory, this.props.location.key],
      browseDirection: "forward",
      navigationType: "trigger"
    });
  }

  render() {
    const { props } = this;

    const { children, context } = props;
    const { location } = props;
    const { pathname } = location;

    const {
      exitDelay,
      exitLength,
      exitState,
      entryDelay,
      entryLength,
      entryState,
      entryProps,
      exitProps,
      transitionIdHistory,
      inTransition
    } = context;

    return (
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
                onEnter({
                  navigationType: this.state.navigationType,
                  node,
                  pathname,
                  ...context
                })
              }
              onExit={node =>
                onExit({
                  node,
                  ...context
                })
              }
            >
              {transitionStatus => {
                const transitionState = {
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
                };
                {
                  /* const transitionState = returnTransitionState({
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
                      }); */
                }

                const childWithTransitionState = React.cloneElement(children, {
                  ...transitionState
                });

                return (
                  <PageWrapper
                    exitProps={exitProps}
                    entryProps={entryProps}
                    transitionState={transitionState}
                    transitionStatus={transitionStatus}
                  >
                    {childWithTransitionState}
                  </PageWrapper>
                );
              }}
            </DelayedTransition>
          </TransitionGroup>
        </div>
      </Layout>
    );
  }
}
