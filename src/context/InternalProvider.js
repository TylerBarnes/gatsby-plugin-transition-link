import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createTransitionContext";

class InternalProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inTransition: false,
      status: false,
      exit: {
        for: 0,
        state: {},
        trigger: false
      },
      entry: {
        for: 0,
        in: 0,
        state: {},
        trigger: false
      }
    };

    this.toggleInTransition = bool => this.setState({ inTransition: bool });
    this.updateState = state => {
      this.setState({ state });
    };
  }

  render() {
    const state = this.state;
    const updateState = this.updateState;
    const toggleInTransition = this.toggleInTransition;
    return (
      <Provider value={{ state, updateState, toggleInTransition }}>
        {this.props.children}
      </Provider>
    );
  }
}

InternalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalProvider;
