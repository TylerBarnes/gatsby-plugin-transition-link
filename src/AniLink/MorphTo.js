import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { TimelineMax } from "gsap";

const MorphTo = ({ children, to, duration, morph }) => (
  <TransitionLink
    to={to}
    exit={{
      length: duration
    }}
    entry={{
      appearAfter: duration
    }}
    trigger={async pages => {
      const exit = await pages.exit;
      const entry = await pages.entry;

      const morphFromEl = exit.node.querySelector(morph.from);
      const morphToEl = entry.node.querySelector(morph.to);

      const finalMeasurements = {
        height: morphToEl.offsetHeight,
        width: morphToEl.offsetWidth
      };

      new TimelineMax().to(morphFromEl, 1, {
        width: finalMeasurements.width,
        height: finalMeasurements.height
      });
    }}
  >
    {children}
  </TransitionLink>
);

export default MorphTo;
