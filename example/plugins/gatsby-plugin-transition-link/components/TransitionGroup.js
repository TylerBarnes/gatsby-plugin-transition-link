import React from "react";
import { TransitionGroup } from "react-transition-group";

class Transition extends React.PureComponent {
  render() {
    const { children } = this.props;

    return <TransitionGroup>{children}</TransitionGroup>;
  }
}

export default Transition;
