import React from "react";
import Cover from "./Cover";
import Fade from "./Fade";
import PaintDrip from "./PaintDrip";
import SwipeOver from "./Swipe";
import TransitionLink from "../";
import MorphTo from "./MorphTo";

export default function DefaultTransition(allProps) {
  const { children, ...props } = allProps;
  return (
    <>
      {props.cover && <Cover {...props}>{children}</Cover>}
      {props.fade && <Fade {...props}>{children}</Fade>}
      {props.paintDrip && <PaintDrip {...props}>{children}</PaintDrip>}
      {props.swipe && <SwipeOver {...props}>{children}</SwipeOver>}
      {!!props.morph && <MorphTo {...props}>{children}</MorphTo>}

      {!props.cover &&
        !props.fade &&
        !props.paintDrip &&
        !props.swipe &&
        !props.morph && <TransitionLink {...props}>{children}</TransitionLink>}
    </>
  );
}
