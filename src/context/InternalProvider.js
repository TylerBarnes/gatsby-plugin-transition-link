import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createTransitionContext";

class InternalProvider extends Component {
  state = {
    inTransition: false,
    transitionIdHistory: [],
    // event
    e: false,
    // exit
    exitDelay: 0,
    exitLength: 0,
    exitState: {},
    exitProps: {},
    exitTrigger: false,
    // entry
    entryDelay: 0,
    entryLength: 0,
    entryState: {},
    entryProps: {},
    entryTrigger: false,
    // state updates
    updateContext: obj => this.setState(obj)
  };

  componentDidMount() {
    let exitResolve;
    const exitPromise = new Promise(resolve => {
      exitResolve = resolve;
    });

    let entryResolve;
    const entryPromise = new Promise(resolve => {
      entryResolve = resolve;
    });

    this.state.updateContext({
      triggerResolve: {
        entry: entryResolve,
        exit: exitResolve
      },
      pages: {
        exit: exitPromise,
        entry: entryPromise
      }
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

InternalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalProvider;
