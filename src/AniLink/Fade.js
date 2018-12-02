import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { TimelineMax } from "gsap";

const fade = ({ exit: { length }, node, direction }) => {
  const duration = direction === "out" ? length + length / 4 : length;
  const opacity = direction === "in" ? 1 : 0;

  return new TimelineMax().fromTo(
    node,
    duration,
    { opacity: !opacity },
    { opacity: opacity }
  );
};

export default function Fade({
  exit,
  entry,
  fade: removedProp,
  duration,
  ...props
}) {
  const length = duration || 0.8;

  return (
    <TransitionLink
      exit={{
        length: length,
        trigger: ({ exit, node }) => fade({ exit, node, direction: "out" })
      }}
      entry={{
        length: length,
        trigger: ({ exit, node }) => fade({ exit, node, direction: "in" })
      }}
      {...props}
    >
      {props.children}
    </TransitionLink>
  );
}
