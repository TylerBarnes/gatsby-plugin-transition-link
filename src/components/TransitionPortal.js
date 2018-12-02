import React, { Component } from "react";
import ReactDOM from "react-dom";

const portalRoot = typeof document !== `undefined` ? document.body : false;

const PortalContainer = props => {
  const zIndex = (function(level) {
    switch (level) {
      case "bottom":
        return 1000;
      case "top":
        return 1200;
      default:
        return 1100;
    }
  })(props.level);

  return (
    <div
      className="gatsby-plugin-transition-link-portal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: zIndex
      }}
    >
      {props.children}
    </div>
  );
};

export class TransitionPortal extends Component {
  constructor(props) {
    super(props);
    this.el =
      typeof document !== `undefined`
        ? document.createElement("section")
        : false;
  }

  componentDidMount = () => {
    portalRoot && portalRoot.appendChild(this.el);
  };

  componentWillUnmount = () => {
    portalRoot && portalRoot.removeChild(this.el);
  };

  render() {
    return this.el && portalRoot
      ? ReactDOM.createPortal(
          <>
            {portalRoot && (
              <PortalContainer styles={this.props.css} level={this.props.level}>
                {this.props.children}
              </PortalContainer>
            )}
          </>,
          this.el
        )
      : null;
  }
}
