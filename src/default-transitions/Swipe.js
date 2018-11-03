import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { TimelineMax, Power1 } from "gsap";

const boxShadow = "0 0 100px 10px rgba(0, 0, 0, 0.12941176470588237)";

const swipeTopDirection = direction => {
  switch (direction) {
    case "down":
      return { y: "+=100vh", ease: Power1.easeIn };
    case "up":
      return { y: "-=100vh", ease: Power1.easeIn };
    case "left":
      return { x: "-=100%", ease: Power1.easeIn };
    default:
      return { x: "+=100%", ease: Power1.easeIn };
  }
};

const swipeBottomDirection = direction => {
  switch (direction) {
    case "down":
      return { y: "-40vh", ease: Power1.easeIn };
    case "up":
      return { y: "40vh", ease: Power1.easeIn };
    case "left":
      return { x: "40%", ease: Power1.easeIn };
    default:
      return { x: "-40%", ease: Power1.easeIn };
  }
};

const swipe = ({ node, exit, direction, top, triggerName }) => {
  const scrollTop =
    document.scrollingElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset;

  if (triggerName === "entry" && top === "entry") {
    return new TimelineMax()
      .set(node, {
        boxShadow: boxShadow,
        overflowY: "hidden",
        height: "100vh",
        scrollTop: scrollTop
      })
      .from(node, exit.length, swipeTopDirection(direction));
  } else if (triggerName === "entry") {
    return new TimelineMax().from(
      node,
      exit.length,
      swipeBottomDirection(direction)
    );
  } else if (triggerName === "exit" && top === "exit") {
    return new TimelineMax()
      .set(node, {
        boxShadow: boxShadow,
        overflowY: "hidden",
        height: "100vh",
        scrollTop: scrollTop
      })
      .to(node, exit.length, swipeTopDirection(direction));
  } else {
    return new TimelineMax().to(
      node,
      exit.length,
      swipeBottomDirection(direction)
    );
  }
};

export default function SwipeOver(props) {
  const top = props.top || "exit";
  const entryZ = top === "entry" ? 5 : 0;
  const exitZ = top === "exit" ? 5 : 0;

  return (
    <TransitionLink
      to={props.to}
      exit={{
        length: 0.7,
        trigger: ({ node, exit }) =>
          swipe({
            node,
            exit,
            direction: props.direction,
            top: top,
            triggerName: "exit"
          }),
        zIndex: exitZ
      }}
      entry={{
        length: 1,
        trigger: ({ node, exit }) =>
          swipe({
            node,
            exit,
            direction: props.direction,
            top: top,
            triggerName: "entry"
          }),
        zIndex: entryZ
      }}
    >
      {props.children}
    </TransitionLink>
  );
}
