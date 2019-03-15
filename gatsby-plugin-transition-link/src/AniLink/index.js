import React from "react";
import Cover from "./Cover";
import Fade from "./Fade";
import PaintDrip from "./PaintDrip";
import SwipeOver from "./Swipe";
import TransitionLink from "../";

export default function DefaultTransition(props) {
  return (
    <>
      {props.cover && <Cover {...props}>{props.children}</Cover>}
      {props.fade && <Fade {...props}>{props.children}</Fade>}
      {props.paintDrip && <PaintDrip {...props}>{props.children}</PaintDrip>}
      {props.swipe && <SwipeOver {...props}>{props.children}</SwipeOver>}

      {!props.cover && !props.fade && !props.paintDrip && !props.swipe && (
        <TransitionLink {...props}>{props.children}</TransitionLink>
      )}
    </>
  );
}
