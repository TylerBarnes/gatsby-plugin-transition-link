import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { triggerTransition } from "../utils/triggerTransition";
import { Consumer } from "../context/createTransitionContext";

const TransitionLink = ({
  to,
  children,
  exit,
  entry,
  activeStyle,
  style,
  className,
  ...rest
}) => {
  return (
    <Consumer>
      {({ inTransition, ...context }) => (
        <Link
          activeStyle={activeStyle}
          style={style}
          className={className}
          to={to} // use gatsby link so prefetching still happens.
          onClick={event => {
            event.preventDefault();
            if (!inTransition) {
              event.persist();
              triggerTransition({
                event,
                to,
                exit,
                entry,
                ...context
              });
            }
          }}
          {...rest}
        >
          {children}
        </Link>
      )}
    </Consumer>
  );
};

TransitionLink.propTypes = {
  to: PropTypes.string.isRequired,
  exitLength: PropTypes.number,
  entryDelay: PropTypes.number,
  exitFn: PropTypes.func,
  entryState: PropTypes.object
};

export { TransitionLink };
