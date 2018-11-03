import React, { Component } from "react";
import TransitionLink, {
  TransitionPortal
} from "gatsby-plugin-transition-link";
import { TimelineMax } from "gsap";

export default class Cover extends Component {
  constructor(props) {
    super(props);

    this.horizontal = this.horizontal.bind(this);
    this.vertical = this.vertical.bind(this);

    this.cover = React.createRef();
  }

  horizontal = ({ props: { length: seconds } }, direction) => {
    const directionTo = direction === "left" ? "-100%" : "100%";
    const directionFrom = direction === "left" ? "100%" : "-100%";

    return new TimelineMax()
      .set(this.transitionCover, { x: directionFrom, display: "block" })
      .to(this.transitionCover, seconds / 2, {
        x: "0%",
        ease: Power1.easeInOut
      })
      .set(this.layoutWrapper, { opacity: 0 })
      .to(this.transitionCover, seconds / 2, {
        x: directionTo,
        ease: Power1.easeInOut
      });
  };

  vertical = ({ props: { length: seconds } }, direction) => {
    const directionTo = direction === "up" ? "-100%" : "100%";
    const directionFrom = direction === "up" ? "100%" : "-100%";

    return new TimelineMax()
      .set(this.transitionCover, { y: directionFrom })
      .to(this.transitionCover, seconds / 2, {
        y: "0%",
        ease: Power1.easeInOut
      })
      .set(this.layoutContents, { opacity: 0 })
      .to(this.transitionCover, seconds / 2, {
        y: directionTo,
        ease: Power1.easeIn
      });
  };

  moveInDirection = ({ props, direction, reverse, node }) => {
    if (direction === "horizontal")
      return this.horizontal({ props, reverse, node });

    return this.vertical({ props, reverse, node });
  };

  render() {
    const reverse = this.props.reverse ? this.props.reverse : false;

    return (
      <>
        <TransitionLink
          to={props.to}
          exit={{
            length: 0.4,
            trigger: ({ exit, node }) =>
              this.moveInDirection({ props: exit, node, reverse })
          }}
          entry={{
            delay: 0.2,
            trigger: ({ entry, node }) =>
              this.moveInDirection({ props: entry, node, reverse })
          }}
        >
          {props.children}
        </TransitionLink>

        <TransitionPortal>
          <div
            ref={n => (this.cover = n)}
            style={{
              position: "fixed",
              background: this.props.bg || "#4b2571",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              transform: "translateY(100%)"
            }}
          />
        </TransitionPortal>
      </>
    );
  }
}
