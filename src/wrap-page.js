const React = require("react");
const TransitionHandler = require("./components/TransitionHandler").default;
const InternalProvider = require("./context/InternalProvider").default;
const Consumer = require("./context/createTransitionContext").Consumer;

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }) => {
  const sessionMinHeight =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("wrapperMinHeight")
      : false;
  return (
    <InternalProvider>
      <Consumer>
        {({ wrapperMinHeight, inTransition }) => {
          const minHeight = wrapperMinHeight
            ? `${wrapperMinHeight}px`
            : `${!!sessionMinHeight ? sessionMinHeight + "px" : false}`;
          return (
            <div
              style={{
                position: "relative",
                zIndex: 0,
                minHeight: inTransition ? false : minHeight
              }}
            >
              <TransitionHandler {...props}>{element}</TransitionHandler>
            </div>
          );
        }}
      </Consumer>
    </InternalProvider>
  );
};
