module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            tests: ["./tests/"],
            "@components": "./src/components",
            "@assets": "./src/assets",
            "@pages": "./src/pages",
            "@contexts": "./src/contexts",
            "@hooks": "./src/hooks",
          },
        },
      ],
    ],
  };
};
