// import React from "react";
// import TransitionHandler from "./components/TransitionHandler";
// import InternalProvider from "./context/InternalProvider";
const React = require("react");
const TransitionHandler = require("./components/TransitionHandler").default;
const InternalProvider = require("./context/InternalProvider").default;
const Layout = require("./components/Layout").LayoutComponent;

// export default ({ element, props }) => {
//   return (
//     <InternalProvider>
//       <TransitionHandler location={props.location}>{element}</TransitionHandler>
//     </InternalProvider>
//   );
// };

// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }) => {
  return (
    <InternalProvider>
      {/* <Layout {...props}> */}
      <TransitionHandler location={props.location}>{element}</TransitionHandler>
      {/* </Layout> */}
    </InternalProvider>
  );
};
