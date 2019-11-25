import { useContext } from "react";
import { Context } from "../context/createTransitionContext";
import { triggerTransition } from "../utils/triggerTransition";

const useTriggerTransition = () => {
  const context = useContext(Context);
  const progrTriggerTransition = options => {
    triggerTransition({
      ...context,
      ...options
    });
  };
  return progrTriggerTransition;
};

export { useTriggerTransition };
