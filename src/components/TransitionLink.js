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
  entryFor,
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
        updateEntryFor,
        updateExitState,
        toggleInTransition,
        inTransition
      }) => (
        <Link
          onClick={event =>
            triggerTransition(
              // use gatsby link so prefetching still happens. this is prevent defaulted in triggertransition
              {
                event,
                updateExitTimeout,
                updateDelayNext,
                updateEntryFor,
                exitFor,
                entryIn,
                entryFor,
                to,
                exitFn,
                exitState,
                updateExitState,
                entryState,
                updateEntryState,
                toggleInTransition,
                inTransition
              }
            )
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
