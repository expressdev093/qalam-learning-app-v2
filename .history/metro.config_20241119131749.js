/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {evaPackage, customMappingPath} = require('@ui-kitten/metro-config');

// Fetch the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Extract resolver configurations
const {
  resolver: {sourceExts, assetExts},
} = defaultConfig;

// Eva configuration
const evaConfig = {
  evaPackage: '@eva-design/eva', // Path to your Eva package
  customMappingPath: './mapping.json', // Path to the custom mapping file
};

// Custom Metro configuration (your custom SVG handling and options)
const config = {
  transformer: {
    // Async function to set up the transform options
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    // Set the transformer for handling SVG files
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // Remove 'svg' from assetExts to prevent Metro from treating it as a static asset
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    // Add 'svg' to sourceExts to allow it to be used as a source file
    sourceExts: [...sourceExts, 'svg'],
  },
};

// Merge the evaConfig with your custom config
module.exports = mergeConfig(defaultConfig, evaConfig, config);
