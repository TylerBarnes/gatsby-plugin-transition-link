import { useContext } from "react";
import { publicContext } from "../context/createTransitionContext";

const useTransitionState = () => useContext(publicContext);

export { useTransitionState };
