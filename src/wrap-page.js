const React = require("react");
const TransitionHandler = require("./components/TransitionHandler").default;
const InternalProvider = require("./context/InternalProvider").default;
const Consumer = require("./context/createTransitionContext").Consumer;

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }) => {
  const minHeight = sessionStorage.getItem("wrapperMinHeight");
  return (
    <InternalProvider>
      <Consumer>
        {({ wrapperMinHeight }) => (
          <div
            style={{
              position: "relative",
              zIndex: 0,
              minHeight: wrapperMinHeight
                ? `${wrapperMinHeight}px`
                : `${minHeight}px`
            }}
          >
            <TransitionHandler {...props}>{element}</TransitionHandler>
          </div>
        )}
      </Consumer>
    </InternalProvider>
  );
};
