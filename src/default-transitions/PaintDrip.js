import React, { Component } from "react";
import TransitionLink, {
  TransitionPortal
} from "gatsby-plugin-transition-link";
import { TweenLite } from "gsap";

export default class PaintDrip extends Component {
  constructor(props) {
    super(props);

    this.drip = React.createRef();
    this.expand = this.expand.bind(this);
  }

  expand = () =>
    TweenLite.to(this.drip, 1, { width: "110vw", height: "110vh" });

  render() {
    const { props } = this;
    return (
      <>
        <TransitionLink
          to={props.to}
          entry={{ delay: 1000 }}
          exit={{ length: 1000, trigger: () => this.expand() }}
        >
          {props.children}
        </TransitionLink>

        <TransitionPortal>
          <div
            ref={n => (this.drip = n)}
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "10px",
              height: "10px",
              background: "black",
              borderRadius: "50%"
            }}
          />
        </TransitionPortal>
      </>
    );
  }
}
