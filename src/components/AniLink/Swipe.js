import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { TimelineMax, Power1 } from "gsap";

const boxShadow = "0 0 100px 10px rgba(0, 0, 0, 0.12941176470588237)";

const swipeTopDirection = (direction, reverse) => {
  const polarityPos = reverse ? "-" : "+";
  const polarityNeg = reverse ? "+" : "-";

  switch (direction) {
    case "down":
      return { y: `${polarityPos}=100vh`, ease: Power1.easeIn };
    case "up":
      return { y: `${polarityNeg}=100vh`, ease: Power1.easeIn };
    case "left":
      return { x: `${polarityNeg}=100%`, ease: Power1.easeIn };
    default:
      return { x: `${polarityPos}=100%`, ease: Power1.easeIn };
  }
};

const swipeBottomDirection = (direction, reverse) => {
  const polarityPos = reverse ? "-" : "";
  const polarityNeg = reverse ? "" : "-";

  switch (direction) {
    case "down":
      return { y: `${polarityNeg}40vh`, ease: Power1.easeIn };
    case "up":
      return { y: `${polarityPos}40vh`, ease: Power1.easeIn };
    case "left":
      return { x: `${polarityPos}40%`, ease: Power1.easeIn };
    default:
      return { x: `${polarityNeg}40%`, ease: Power1.easeIn };
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
      .from(node, exit.length, swipeTopDirection(direction, true))
      .set(node, { overflowY: "initial" });
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
      .to(node, exit.length, swipeTopDirection(direction))
      .set(node, { overflowY: "initial" });
  } else {
    return new TimelineMax()
      .set(node, {
        boxShadow: boxShadow,
        overflowY: "hidden",
        height: "100vh",
        scrollTop: scrollTop
      })
      .to(node, exit.length, swipeBottomDirection(direction, true))
      .set(node, { overflowY: "initial" });
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
