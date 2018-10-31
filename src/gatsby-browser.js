exports.wrapPageElement = require(`./wrap-page`).default;

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.action !== "PUSH") {
    const savedPosition = getSavedScrollPosition(location);

    setTimeout(() => {
      window.scrollTo(...(savedPosition || [0, 0]));
    }, 1);
  }
  return false;
};
