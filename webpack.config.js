const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, arg) => {
  const isEnvDevelopment = arg.mode === "development";

  return {
    mode: arg.mode,
    entry: { index: path.resolve(__dirname, "./src/index.tsx") },
    output: {
      filename: isEnvDevelopment ? "[name].js" : "[name].[contenthash:8].js",
    },
    devtool: isEnvDevelopment
      ? // NOTE: `eval-cheap-module-source-map` is recommend for dev, but it doesn't report error location accurately
        // See https://github.com/vuejs-templates/webpack/issues/520#issuecomment-356773702
        "cheap-module-source-map"
      : "source-map",
    devServer: {
      compress: true, // enable gzip compression for everything served to reduce traffic size
      dev: {
        publicPath: "/",
      },
      open: true,
      // start - should remove this in next iteration of webpack-dev-server@4.beta
      static: {
        watch: false,
      },
      // end - should remove this in next iteration of webpack-dev-server@4.beta
      port: 3000,
      host: "localhost",
      client: {
        // suppress HMR and WDS messages about updated chunks
        // NOTE: there is a bug that the line '[HMR] Waiting for update signal from WDS...' is not suppressed
        // See https://github.com/webpack/webpack-dev-server/issues/2166
        logging: "warn",
      },
    },
    infrastructureLogging: {
      // Only warnings and errors
      // See https://webpack.js.org/configuration/other-options/#infrastructurelogginglevel
      level: "info",
    },
    stats: {
      // Make `webpack-dev-middleware` less verbose, consider `quiet` and `noInfo` options as well
      // NOTE: Use custom reporter to output errors and warnings from TS fork checker in `stylish` format. It's less verbose and
      // repetitive. Since we use the custom plugin, we want to mute `errors` and `warnings` from `webpack-dev-middleware`
      // See https://github.com/webpack-contrib/webpack-stylish
      // See https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/119
      all: false,
      logging: "warn",
      colors: true,
      timings: true,
    },
    resolve: {
      // These extensions are used to generate all the possible paths (in order) to the module
      // so we don't need to specify extensions (e.g. `import * from 'src/module1'` -> src/modules1.ts);
      // NOTE: `mjs` takes precedence over `js` in case a dependency module supports tree-shaking with ESM bundle
      extensions: [".tsx", ".ts", ".mjs", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(?:mjs|js|ts|tsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "./src/"),
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                cacheDirectory: true,
                configFile: path.resolve(__dirname, "./babel.config.js"),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
      }),
    ],
  };
};
