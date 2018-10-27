import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { triggerTransition } from "../utils/triggerTransition";
import { Consumer } from "../context/createTransitionContext";

const TransitionLink = ({ to, children, exit, entry }) => {
  return (
    <Consumer>
      {({ ...context }) => (
        <Link
          onClick={event =>
            triggerTransition({
              event,
              to,
              exit,
              entry,
              ...context
            })
          }
          to={to} // use gatsby link so prefetching still happens. this is prevent defaulted in triggertransition
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
