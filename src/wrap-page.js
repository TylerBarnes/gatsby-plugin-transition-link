const React = require("react");
const TransitionHandler = require("./components/TransitionHandler").default;

module.exports = ({ element, props }) => {
  return (
    <TransitionHandler {...props}>{element}</TransitionHandler>
  );
};
