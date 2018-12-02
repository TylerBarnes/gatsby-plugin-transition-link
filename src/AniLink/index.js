import React from "react";
import { Cover } from "./Cover";
import { Fade } from "./Fade";
import { PaintDrip } from "./PaintDrip";
import { Swipe } from "./Swipe";
import { TransitionLink } from "../components/TransitionLink";

export function AniLink(props) {
  return (
    <>
      {props.cover && <Cover {...props}>{props.children}</Cover>}
      {props.fade && <Fade {...props}>{props.children}</Fade>}
      {props.paintDrip && <PaintDrip {...props}>{props.children}</PaintDrip>}
      {props.swipe && <Swipe {...props}>{props.children}</Swipe>}

      {!props.cover && !props.fade && !props.paintDrip && !props.swipe && (
        <TransitionLink {...props}>{props.children}</TransitionLink>
      )}
    </>
  );
}
