module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
      {
			  "preset": "@shelf/jest-mongodb"
			}
    ],
  ],
};