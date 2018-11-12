const React = require("react");

const preferDefault = m => (m && m.default) || m;
let Layout;
let GATSBY_LAYOUT_COMPONENT_PATH = false;
if (GATSBY_LAYOUT_COMPONENT_PATH) {
  try {
    Layout = preferDefault(require(GATSBY_LAYOUT_COMPONENT_PATH));
  } catch (e) {
    if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
      throw new Error(
        `Couldn't find layout component at "${GATSBY_LAYOUT_COMPONENT_PATH}.\n\n` +
          `Please create layout component in that location or specify path to layout component in gatsby-config.js`
      );
    } else {
      // Logging the error for debugging older browsers as there is no way
      // to wrap the thrown error in a try/catch.
      console.error(e);
      throw e;
    }
  }
}

const LayoutComponent = ({ children, ...props }) => {
  if (GATSBY_LAYOUT_COMPONENT_PATH) {
    return <Layout {...props}>{children}</Layout>;
  } else {
    return children;
  }
};

export { LayoutComponent };
