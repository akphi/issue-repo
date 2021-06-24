module.exports = {
  presets: [
    ["@babel/preset-env"],
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // use React@17 JSX transform
      },
    ],
    function () {
      return { plugins: ["@babel/plugin-proposal-class-properties"] };
    },
    [
      "@babel/preset-typescript",
      {
        onlyRemoveTypeImports: true,
        // Allow using `declare` keyword for class fields.
        // NOTE: for this to work, this plugin has to run before other class modifier plugins like
        // `@babel/plugin-proposal-class-properties`; `babel` should want about this if it happens.
        // `allowDeclareFields` will be `true` by default in babel 8
        // See https://babeljs.io/docs/en/babel-preset-typescript#allowdeclarefields
        allowDeclareFields: true,
      },
    ],
  ],
};
