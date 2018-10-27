import React from "react";
// import PropTypes from "prop-types";
import { Link } from "gatsby";

import { triggerTransition } from "../utils/triggerTransition";
import { Consumer } from "../context/createTransitionContext";

const TransitionLink = ({ to, children, ...props }) => {
  return (
    <Consumer>
      {({ state, updateState, toggleInTransition }) => (
        <Link
          onClick={
            event =>
              triggerTransition(
                // use gatsby link so prefetching still happens. this is prevent defaulted in triggertransition
                {
                  event,
                  props: { ...props, to },
                  state,
                  updateState,
                  toggleInTransition
                }
              )
            //
            // updateExitTimeout,
            // updateDelayNext,
            // updateEntryFor,
            // exitFor,
            // entryIn,
            // entryFor,
            // exitFn,
            // exitState,
            // updateExitState,
            // entryState,
            // updateEntryState,
          }
          to={to}
        >
          {/* {console.log(context)} */}
          {children}
        </Link>
      )}
    </Consumer>
  );
};

// TransitionLink.propTypes = {
//   to: PropTypes.string.isRequired,
//   exitFor: PropTypes.number,
//   entryIn: PropTypes.number,
//   exitFn: PropTypes.func,
//   entryState: PropTypes.object
// };

export { TransitionLink };
