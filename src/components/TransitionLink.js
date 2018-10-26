import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { triggerTransition } from "../utils/triggerTransition";
import { Consumer } from "../context/createTransitionContext";

const TransitionLink = ({
  to,
  children,
  exitFor,
  entryIn,
  exitFn,
  entryState,
  exitState
}) => {
  return (
    <Consumer>
      {({
        updateExitTimeout,
        updateDelayNext,
        updateEntryState,
        updateExitState
      }) => (
        // use gatsby link so prefetching still happens. this is prevent defaulted in triggertransition
        <Link
          onClick={event =>
            triggerTransition({
              event,
              updateExitTimeout,
              updateDelayNext,
              exitFor,
              entryIn,
              to,
              exitFn,
              exitState,
              updateExitState,
              entryState,
              updateEntryState
            })
          }
          to={to}
        >
          {children}
        </Link>
      )}
    </Consumer>
  );
};

TransitionLink.propTypes = {
  to: PropTypes.string.isRequired,
  exitFor: PropTypes.number,
  entryIn: PropTypes.number,
  exitFn: PropTypes.func,
  entryState: PropTypes.object
};

export { TransitionLink };
