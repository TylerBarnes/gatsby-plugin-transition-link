import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createContext";

// The provider, which holds the page-wide store and its actions.
// Feel free to abstract actions and state away from this file.
class AppProvider extends Component {
  state = {
    exitTimeout: 0,
    delayNext: 0,
    updateExitTimeout: ms => this.setState({ exitTimeout: ms }),
    updateDelayNext: ms => this.setState({ delayNext: ms })
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
