module.exports = {
  icon: true,
  expandProps: 'end',
  typescript: true,
  native: true,
  memo: true,
  svgo: true,
  svgoConfig: require('./svgo.config.js'),
  dimensions: false,
  titleProp: false,
  descProp: false,
  replaceAttrValues: {
    '#000': 'currentColor',
  },
};
