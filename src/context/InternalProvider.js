import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createTransitionContext";

class InternalProvider extends Component {
  state = {
    exitLength: 0,
    entryDelay: 0,
    entryLength: 0,
    entryState: {},
    exitState: {},
    inTransition: false,
    toggleInTransition: val =>
      this.setState({
        inTransition: val
      }),
    updateExitLength: ms => this.setState({ exitLength: ms }),
    updateEntryDelay: ms => this.setState({ entryDelay: ms }),
    updateEntryLength: ms => this.setState({ entryLength: ms }),
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
