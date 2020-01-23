import { useContext } from "react";
import { navigate } from "gatsby";
import { Context } from "../context/createTransitionContext";
import { triggerTransition } from "../utils/triggerTransition";

const useTriggerTransition = defaultOptions => {
  const context = useContext(Context);
  const programmaticallyTriggerTransition = calledOptions => {
    // allow passing an event directly instead of options
    if (
      calledOptions instanceof Event ||
      (calledOptions.nativeEvent && calledOptions.nativeEvent instanceof Event)
    ) {
      calledOptions = {
        event: calledOptions
      };
    }

		const options = {
			...defaultOptions,
			...calledOptions,
		}

		if (context.disableAnimation) {
			// If the user has set their browser or OS to prefers-reduced-motion
			// we should respect that.
      if (options.event) {
        options.event.persist();
        options.event.preventDefault();
      }
			navigate(options.to);
		} else {
      triggerTransition({
        ...context,
        ...options,
      });
    }

  };
  return programmaticallyTriggerTransition;
};

export { useTriggerTransition };
