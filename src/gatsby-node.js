const path = require(`path`);

let didRunAlready = false;

exports.onPreInit = ({ store }) => {
  if (didRunAlready) {
    throw new Error(
      `You can only have single instance of gatsby-plugin-transition-link in your gatsby-config.js`
    );
  }

  didRunAlready = true;
};
