module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env", // Use @env as the module name for importing
          path: ".env",
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
