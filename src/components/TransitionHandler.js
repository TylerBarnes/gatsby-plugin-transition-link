import React, { Component } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { setTimeout } from "requestanimationframe-timer";

// import { returnTransitionState } from "../utils/returnTransitionState";
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

class TransitionHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationHistory: [this.props.location.key],
      browseDirection: false,
      navigationType: false,
      lastKey: false,
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

  // getSnapshotBeforeUpdate(prevProps, prevState) {

  // }

  componentDidUpdate(prevProps) {
    // only update our state when navigation has occurred
    if (prevProps.location.key === this.props.location.key) return;

    this.setState({ lastKey: this.props.location.key });

    // check if we've been here before.
    // if the location key is in our history
    // and there was no mouse event
    if (
      this.state.locationHistory.includes(this.props.location.key) &&
      !this.props.context.e
    ) {
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
    let { pathname, state: locationState } = location;

    // let exit, entry, transitionId;

    // if (!!locationState) {
    //   exit = locationState.exit;
    //   entry = locationState.entry;
    //   transitionId = locationState.transitionId;
    // }

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
      exitTrigger,
      entryTrigger
    } = context;

    const navigation = {
      navigationType: this.state.navigationType,
      browseDirection: this.state.browseDirection
    };

    // check if we've been here before.
    // if the location key is in our history
    // and there was no mouse event
    if (
      this.state.locationHistory.includes(this.props.location.key) &&
      this.props.location.key !== this.state.lastKey &&
      !this.props.context.e &&
      this.state.lastKey
    ) {
      const currentIndex =
        this.state.locationHistory.indexOf(this.props.location.key) + 1;
      const lastIndex =
        this.state.locationHistory.indexOf(this.state.lastKey) + 1;

      if (currentIndex < lastIndex) {
        console.log("back");
      } else {
        console.log("forward");
      }
    }

    // if (navigation.navigationType === "history" && !!exit && !!entry) {
    //   // if the user didn't trigger a new animation and we have exit and entry transition info from location history.

    //   // functions can't be stored on location history state so we keep track of our own
    //   const functionHistory = this.props.context.triggerFunctionHistory;
    //   const functions = functionHistory.find(
    //     item => item.transitionId === transitionId
    //   );

    //   if (functions) {
    //     entryTrigger = functions.entry;
    //     exitTrigger = functions.exit;
    //   }

    //   if (navigation.browseDirection === "back") {
    //     // if we're going backwards, swap the exit and entry animations
    //     [exit, entry] = [entry, exit];
    //     [entryTrigger, exitTrigger] = [exitTrigger, entryTrigger];
    //   }

    //   exitDelay = exit.delay;
    //   exitLength = exit.length;
    //   exitState = exit.state;

    //   entryDelay = entry.delay;
    //   entryLength = entry.length;
    //   entryState = entry.state;
    // }

    return (
      <Layout {...props}>
        <div
          className="tl-wrapper-outer"
          style={{ maxWidth: "100%", overflowX: "hidden" }}
        >
          <TransitionGroup component={null}>
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
                  navigationType: this.state.navigationType,
                  ...navigation,
                  ...context,
                  entryTrigger
                })
              }
              onExit={node =>
                onExit({
                  node,
                  updateHandlerState: state => this.setState(state),
                  handlerInTransition: this.state.inTransition,
                  navigationType: this.state.navigationType,
                  ...navigation,
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
