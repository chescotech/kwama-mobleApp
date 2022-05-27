// const path = require('@babel/plugin-proposal-decorators');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
};
