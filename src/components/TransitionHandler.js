import React, { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

import delayTransitionRender from "./delayTransitionRender";
import { Consumer } from "../context/createTransitionContext";
import { getMs } from "../utils/secondsMs";
import { onEnter } from "../functions/onEnter";
import { onExit } from "../functions/onExit";
import { LayoutComponent as Layout } from "./Layout";
import { PageWrapper } from "./PageWrapper/index.js";

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

let navigation = {
  type: "initial",
  direction: false
};

class TransitionHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationHistory: [this.props.location.key],
      lastKey: this.props.location.key,
      inTransition: {
        entry: false,
        exit: false
      }
    };
  }

  componentDidMount() {
    this.props.context.updateContext({
      updateHandlerState: state => this.setState(state)
    });
  }

  componentDidUpdate(prevProps) {
    // only update our state when navigation has occurred
    if (prevProps.location.key === this.props.location.key) return;

    this.setState({
      locationHistory: [...this.state.locationHistory, this.props.location.key],
      lastKey: this.props.location.key
    });
  }

  render() {
    const { props } = this;

    const { children, context } = props;
    const { location } = props;
    let { pathname, state: locationState } = location;

    let exit, entry;

    if (!!locationState) {
      exit = locationState.exit;
      entry = locationState.entry;
    }

    let {
      exitDelay,
      exitLength,
      exitState,
      entryDelay,
      entryLength,
      entryState,
      entryProps,
      exitProps,
      inTransition,
      entryTrigger,
      exitTrigger
    } = context;

    const currentIndex =
      this.state.locationHistory.indexOf(this.props.location.key) + 1;
    const lastIndex =
      this.state.locationHistory.indexOf(this.state.lastKey) + 1;

    if (currentIndex && lastIndex) {
      if (currentIndex !== lastIndex && !this.props.context.e) {
        navigation.direction = currentIndex > lastIndex ? "forward" : "back";
        navigation.type = "history";
      } else if (this.props.context.e) {
        navigation.direction = "forward";
        navigation.type = "trigger";
      }
    }

    if (navigation.type === "history") {
      // if the user didn't trigger a new animation and we have exit and entry transition info from location history.

      // functions can't be stored on location history state so we keep track of our own
      const functionHistory = this.props.context.triggerFunctionHistory;

      const functions = functionHistory.find(
        item => item.locationKey === this.props.location.key
      );

      if (functions) {
        entryTrigger = functions.entry;
        exitTrigger = functions.exit;
      }

      if (navigation.direction === "back") {
        // if we're going backwards, swap the exit and entry animations
        // [exit, entry] = [entry, exit];
        // [entryTrigger, exitTrigger] = [exitTrigger, entryTrigger];

        exitDelay = entry.delay;
        exitLength = entry.length;
        exitState = entry.state;

        entryDelay = exit.delay;
        entryLength = exit.length;
        entryState = exit.state;
      } else {
        exitDelay = exit.delay;
        exitLength = exit.length;
        exitState = exit.state;

        entryDelay = entry.delay;
        entryLength = entry.length;
        entryState = entry.state;
      }
    }

    return (
      <Layout {...props}>
        <div
          className="tl-wrapper-outer"
          style={{ maxWidth: "100%", overflowX: "hidden" }}
        >
          <TransitionGroup
            component={null}
            childFactory={(child, i) => {
              console.log(child.props);
              return (
                <div className="test" key={i}>
                  {child}
                </div>
              );
            }}
          >
            <DelayedTransition
              key={pathname}
              // we're using seconds but transitiongroup uses ms, hence getMs()
              delay={getMs(entryDelay)}
              timeout={{
                enter: getMs(entryLength),
                exit: getMs(exitLength)
              }}
              onEnter={node =>
                onEnter({
                  node,
                  pathname,
                  updateHandlerState: state => this.setState(state),
                  handlerInTransition: this.state.inTransition,
                  navigation,
                  ...context,
                  entryTrigger
                })
              }
              onExit={node =>
                onExit({
                  node,
                  updateHandlerState: state => this.setState(state),
                  handlerInTransition: this.state.inTransition,
                  navigation,
                  ...context,
                  exitTrigger
                })
              }
            >
              {transitionStatus => {
                const transitionState = {
                  inTransition,
                  location: location,
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
