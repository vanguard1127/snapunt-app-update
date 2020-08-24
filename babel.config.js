module.exports = function bpe(api) {
  api.cache(true);
  const presets = [
    'babel-preset-expo',
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv'
  ];
  const plugins = [];

  return {
    presets: presets,
    plugins: [
      '@babel/transform-react-jsx-source',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            "@i18n": './i18n',
            "@image-overlay": './components/challenge/ImageOverlay',
            "@resp-image-overlay": './components/challenge/RespImageOverlay'
          }
        }
      ]
    ]
  };

  // if (api.env(['development', 'test', 'production'])) {
  //   return envDevelopment;
  // }

  // return {
  //   presets: presets,
  //   plugins: plugins
  // };

};
