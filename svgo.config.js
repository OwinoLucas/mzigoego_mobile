module.exports = {
  plugins: [
    {
      name: 'removeAttrs',
      params: {
        elemSeparator: '?',
        attrs: '*?(aria-labelledby|xmlns:xlink|xmlns)',
      },
    },
  ],
};
