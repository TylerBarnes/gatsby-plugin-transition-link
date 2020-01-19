import { useContext } from "react";
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

    triggerTransition({
      ...context,
      ...defaultOptions,
      ...calledOptions
    });
  };
  return programmaticallyTriggerTransition;
};

export { useTriggerTransition };
