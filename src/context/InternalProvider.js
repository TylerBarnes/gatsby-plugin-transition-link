import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createTransitionContext";

class InternalProvider extends Component {
  state = {
    exitTimeout: 0,
    delayNext: 0,
    entryState: {},
    exitState: {},
    updateExitTimeout: ms => this.setState({ exitTimeout: ms }),
    updateDelayNext: ms => this.setState({ delayNext: ms }),
    updateEntryState: state => this.setState({ entryState: state }),
    updateExitState: state => this.setState({ exitState: state })
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

InternalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalProvider;
