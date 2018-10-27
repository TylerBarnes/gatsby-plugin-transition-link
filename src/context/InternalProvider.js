import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createTransitionContext";

class InternalProvider extends Component {
  state = {
    inTransition: false,
    toggleInTransition: val =>
      this.setState({
        inTransition: val
      }),
    // exit
    exitDelay: 0,
    exitLength: 0,
    exitState: {},
    // entry
    entryDelay: 0,
    entryLength: 0,
    entryState: {},
    // state updates
    updateExitDelay: ms => this.setState({ exitDelay: ms }),
    updateExitLength: ms => this.setState({ exitLength: ms }),
    updateExitState: state => this.setState({ exitState: state }),
    updateEntryDelay: ms => this.setState({ entryDelay: ms }),
    updateEntryLength: ms => this.setState({ entryLength: ms }),
    updateEntryState: state => this.setState({ entryState: state })
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

InternalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalProvider;
