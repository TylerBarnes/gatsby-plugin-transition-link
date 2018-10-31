exports.wrapPageElement = require(`./wrap-page`).default;

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.action !== "PUSH") {
    const savedPosition = getSavedScrollPosition(location);

    return savedPosition || [0, 0];
  } else {
    return false;
  }
};
