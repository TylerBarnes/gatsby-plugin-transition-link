// use this link to get this working properly
// https://codepen.io/osublake/pen/eNrQqV?editors=0010
import React, { Component } from "react";
import TransitionLink, {
  TransitionPortal
} from "gatsby-plugin-transition-link";
import { TimelineMax } from "gsap";

export default class PaintDrip extends Component {
  constructor(props) {
    super(props);

    this.drip = React.createRef();
    this.expand = this.expand.bind(this);
  }

  expand = ({ e }) => {
    if (typeof window === `undefined`) return false;

    const { innerHeight: h, innerWidth: w } = window;
    const diagonal = Math.sqrt(Math.pow(h, 2) + Math.pow(w, 2));
    const { pageX, pageY } = e;

    return new TimelineMax()
      .set(this.drip, { left: pageX, top: pageY })
      .to(this.drip, 0.2, {
        scale: diagonal * 2
      });
  };

  render() {
    const { props } = this;

    return (
      <>
        <TransitionLink
          to={props.to}
          entry={{ delay: 1000 }}
          exit={{
            length: 1000,
            trigger: (exit, node, e) => this.expand({ e })
          }}
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
              width: "1px",
              height: "1px",
              background: "black",
              borderRadius: "50%"
            }}
          />
        </TransitionPortal>
      </>
    );
  }
}
