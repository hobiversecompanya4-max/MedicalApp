const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure Metro can find all modules by extending resolver config
config.resolver = {
  ...config.resolver,
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs', 'mjs'],
  assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'mp3', 'wav', 'ttf', 'otf', 'woff', 'woff2'],
};

// Optimize transformer settings
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

module.exports = config;
