exports.wrapPageElement = require(`./wrap-page`)
exports.wrapRootElement = require(`./wrap-root`)

exports.shouldUpdateScroll = () => !window.__tl_inTransition
