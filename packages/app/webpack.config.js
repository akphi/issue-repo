import sass from "sass";
import { resolve, dirname, join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));

export default (env, arg) => {
  const isEnvDevelopment = arg.mode === "development";
  const isEnvProduction = arg.mode === "production";
  const baseUrl = "/myApp/";

  const config = {
    mode: arg.mode,
    bail: isEnvProduction,
    entry: { index: resolve(__dirname, "./src/index.jsx") },
    output: {
      path: join(__dirname, `dist/${baseUrl}`),
      assetModuleFilename: `static/${
        isEnvDevelopment ? "[name].[ext]" : "[name].[contenthash:8].[ext]"
      }`,
      publicPath: isEnvDevelopment ? "/" : baseUrl,
      filename: `static/${
        isEnvDevelopment ? "[name].js" : "[name].[contenthash:8].js"
      }`,
    },
    devServer: {
      compress: true, // enable gzip compression for everything served to reduce traffic size
      devMiddleware: {
        publicPath: "/",
      },
      open:
        // trim the leading and trailing slash
        baseUrl.length === 1 ? false : [baseUrl.slice(1, -1)],
      port: 8080,
      host: "localhost",
      // redirect 404s to /index.html
      historyApiFallback: {
        // URL contains dot such as for version (majorV.minV.patchV: 1.0.0) need this rule
        // See https://github.com/bripkens/connect-history-api-fallback#disabledotrule
        disableDotRule: true,
      },
      client: {
        // suppress HMR and WDS messages about updated chunks
        // NOTE: there is a bug that the line '[HMR] Waiting for update signal from WDS...' is not suppressed
        // See https://github.com/webpack/webpack-dev-server/issues/2166
        logging: "warn",
      },
    },
    devtool: isEnvDevelopment
      ? // NOTE: `eval-cheap-module-source-map` is recommend for dev, but it doesn't report error location accurately
        // See https://github.com/vuejs-templates/webpack/issues/520#issuecomment-356773702
        "cheap-module-source-map"
      : "source-map",
    watchOptions: {
      ignored: /node_modules/,
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
      extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(?:mjs|js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          include: resolve(__dirname, "./src/"),
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                cacheDirectory: true,
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      debug: false, // use `debug` option to see the lists of plugins being selected
                    },
                  ],
                  [
                    "@babel/preset-react",
                    {
                      development: isEnvDevelopment,
                      runtime: "automatic", // use React@17 JSX transform
                    },
                  ],
                  // function () {
                  //   return {
                  //     plugins: [
                  //       // NOTE: both of these proposals are in stage 3, so we should keep track of when we need to remove this plugin
                  //       // See https://github.com/tc39/proposal-class-fields
                  //       // See https://github.com/tc39/proposal-static-class-features
                  //       '@babel/plugin-proposal-class-properties',
                  //     ],
                  //   };
                  // },
                  // useTypescript && [
                  //   '@babel/preset-typescript',
                  //   {
                  //     onlyRemoveTypeImports: true,
                  //     // Allow using `declare` keyword for class fields.
                  //     // NOTE: for this to work, this plugin has to run before other class modifier plugins like
                  //     // `@babel/plugin-proposal-class-properties`; `babel` should want about this if it happens.
                  //     // `allowDeclareFields` will be `true` by default in babel 8
                  //     // See https://babeljs.io/docs/en/babel-preset-typescript#allowdeclarefields
                  //     allowDeclareFields: true,
                  //   },
                  // ],
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              // Helps resolve @import and url() like import/require()
              loader: require.resolve("css-loader"),
              options: {
                sourceMap: isEnvProduction,
              },
            },
            // isEnvProduction && {
            //   // Loads and transforms a CSS/SSS file using PostCSS
            //   loader: require.resolve('postcss-loader'),
            //   options: {
            //     postcssOptions: {
            //       plugins: [
            //         require.resolve('autoprefixer'), // adding vendor prefixes
            //         require.resolve('cssnano'), // minification
            //       ].filter(Boolean),
            //     },
            //     sourceMap: true,
            //   },
            // },
            {
              loader: require.resolve("sass-loader"),
              options: {
                implementation: sass,
                sourceMap: isEnvProduction,
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.(?:woff2?|ttf|otf|eot|svg|png|gif)$/,
          type: "asset/resource",
        },
      ],
    },
    optimization: isEnvDevelopment
      ? {
          // Keep runtime chunk minimal by enabling runtime chunk
          // See https://webpack.js.org/guides/build-performance/#minimal-entry-chunk
          runtimeChunk: true,
          // Avoid extra optimization step, turning off split-chunk optimization
          // See https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: false,
        }
      : {},
    plugins: [
      new MiniCssExtractPlugin({
        filename: `static/${
          isEnvDevelopment ? "[name].css" : "[name].[contenthash:8].css"
        }`,
        chunkFilename: `static/${
          isEnvDevelopment ? "[id].css" : "[id].[contenthash:8].css"
        }`,
      }),

      new HtmlWebpackPlugin({
        template: resolve(__dirname, "./src/index.html"),
      }),
    ].filter(Boolean),
  };
  return config;
};
