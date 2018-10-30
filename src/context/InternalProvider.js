import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createTransitionContext";

class InternalProvider extends Component {
  state = {
    inTransition: false,
    transitionIdHistory: [],
    // exit
    exitDelay: 0,
    exitLength: 0,
    exitState: {},
    // entry
    entryDelay: 0,
    entryLength: 0,
    entryState: {},
    // state updates
    updateContext: obj => this.setState(obj)
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

InternalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalProvider;
