const { navigate } = require("gatsby");

exports.wrapPageElement = require(`./wrap-page`);

exports.shouldUpdateScroll = () => false;

exports.onPreRouteUpdate = ({ location }) => {
  // prevent the back button during transitions as it breaks pages
  if (
    window.__tl_inTransition &&
    location.pathname !== window.__tl_desiredPathname
  ) {
    window.__tl_back_button_pressed = true;
    navigate(window.__tl_desiredPathname);
  }
};
