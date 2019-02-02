import React, { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { Consumer } from "../context/createTransitionContext";
import delayTransitionRender from "./delayTransitionRender";
import { returnTransitionState } from "../utils/returnTransitionState";
import { getMs } from "../utils/secondsMs";
import { onEnter } from "../functions/onEnter";
import { onExit } from "../functions/onExit";
import { LayoutComponent as Layout } from "./Layout";
import { PageWrapper } from "./PageWrapper/index.js";

const DelayedTransition = delayTransitionRender(Transition);
export default class TransitionHandler extends Component {
  render() {
    const { props } = this;
    const {
      children,
      location: { action, pathname }
    } = props;
    return (
      <Consumer>
        {context => {
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
                      !!node &&
                      onEnter({
                        node,
                        action,
                        pathname,
                        ...context
                      })
                    }
                    onExit={node =>
                      !!node &&
                      onExit({
                        node,
                        ...context
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

                      const childWithTransitionState = React.cloneElement(
                        children,
                        {
                          ...transitionState
                        }
                      );

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
        }}
      </Consumer>
    );
  }
}
