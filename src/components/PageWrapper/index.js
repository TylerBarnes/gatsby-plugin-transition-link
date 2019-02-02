import React, { Component } from "react";
import { PublicProvider } from "../../context/createTransitionContext";

import "./style.css";

class PageWrapper extends Component {
  shouldComponentUpdate(previousProps) {
    return previousProps.transitionStatus !== this.props.transitionStatus;
  }

  render() {
    const {
      children,
      transitionState,
      transitionStatus,
      exitProps,
      entryProps
    } = this.props;

    const exitZindex = exitProps.zIndex || 0;
    const entryZindex = entryProps.zIndex || 1;

    return (
      <div
        className="tl-wrapper"
        style={{
          zIndex:
            transitionStatus === "entering" || transitionStatus === "entered"
              ? entryZindex
              : exitZindex
        }}
      >
        <PublicProvider value={{ ...transitionState }}>
          {children}
        </PublicProvider>
      </div>
    );
  }
}

export { PageWrapper };
