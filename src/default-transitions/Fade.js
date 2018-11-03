import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { TimelineMax } from "gsap";

const fade = ({ exit: { length }, node, direction }) => {
  const seconds = length / 1000;
  const duration = direction == "out" ? seconds + seconds / 4 : seconds;
  const opacity = direction === "in" ? 1 : 0;

  return new TimelineMax().fromTo(
    node,
    duration,
    { opacity: !opacity },
    { opacity: opacity }
  );
};

export default function Fade(props) {
  const length = props.length || 400;

  return (
    <TransitionLink
      to={props.to}
      exit={{
        length: length,
        trigger: ({ exit, node }) => fade({ exit, node, direction: "out" })
      }}
      entry={{
        length: length,
        trigger: ({ exit, node }) => fade({ exit, node, direction: "in" })
      }}
    >
      {props.children}
    </TransitionLink>
  );
}
