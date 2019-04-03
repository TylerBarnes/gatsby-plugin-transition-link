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
  partiallyActive,
  style,
  className,
  activeClassName,
  state,
  onClick,
  trigger,
  replace,
  ...rest
}) => {
  return (
    <Consumer>
      {({ ...context }) => (
        <Link
          style={style}
          activeStyle={activeStyle}
          className={className}
          activeClassName={activeClassName}
          partiallyActive={partiallyActive}
          onClick={event => {
            triggerTransition({
              event,
              to,
              exit,
              entry,
              trigger,
              replace,
              linkState: state,
              ...context
            });

            if (typeof onClick === "function") {
              onClick(event);
            }
          }}
          to={to} // use gatsby link so prefetching still happens. this is prevent defaulted in triggertransition
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
