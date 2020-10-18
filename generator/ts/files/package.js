module.exports = function (opts = {}) {
  const temp = `
		{
			"name": ${opts.appName ? `"${opts.appName}"` : ""},
			"version": "1.0.0",
			"description": ${opts.desc ? `"${opts.desc}"` : ""},
			"author": ${opts.author ? `"${opts.author}"` : ""},
			"license": "MIT",
			"scripts": {
				"dev": "cross-env NODE_ENV=development ts-node --project tsconfig.json -r tsconfig-paths/register src/server.ts",
        "start": "cross-env NODE_ENV=production ts-node --project tsconfig.json -r tsconfig-paths/register src/server.ts",
        "build": "rimraf dist && npm run build:client && npm run build:server",
        "build:client": "cross-env NODE_ENV=production webpack --config ./configs/webpack.config.client.babel.js --color",
        "build:server": "cross-env NODE_ENV=production webpack --config ./configs/webpack.config.server.babel.js --color"
			},
			"dependencies": {
				"@loadable/babel-plugin": "^5.13.2",
				"@loadable/component": "^5.13.2",
				"axios": "^0.20.0",
				"express": "^4.17.1",
				${
          opts.store === "mobx"
            ? `"mobx": "^6.0.1",
				"mobx-react": "^7.0.0",
				"mobx-react-router": "^4.1.0",`
            : `"react-redux": "^7.2.1",
				"redux": "^4.0.5",
				"redux-thunk": "^2.3.0",`
        }
				"react": "^16.13.1",
				"react-dom": "16.12.0",
				"react-helmet": "^6.1.0",
				"react-router-config": "^5.1.1",
				"react-router-dom": "^5.2.0"
			},
			"devDependencies": {
				"@babel/cli": "^7.11.6",
        "@babel/core": "^7.11.6",
        "@babel/node": "^7.10.5",
        "@babel/plugin-proposal-class-properties": "^7.12.1",
        "@babel/plugin-proposal-decorators": "^7.12.1",
        "@babel/preset-env": "^7.11.5",
        "@babel/preset-react": "^7.10.4",
        "@babel/preset-typescript": "^7.12.1",
        "@loadable/server": "^5.13.2",
        "@loadable/webpack-plugin": "^5.13.0",
        "@types/express": "^4.17.8",
        "@types/loadable__component": "^5.13.1",
        "@types/loadable__server": "^5.12.3",
        "@types/memory-fs": "^0.3.2",
        "@types/react": "^16.9.53",
        "@types/react-dom": "^16.9.8",
        "@types/react-helmet": "^6.1.0",
        "@types/react-router-config": "^5.0.1",
        "@types/react-router-dom": "^5.1.6",
        "@types/webpack": "^4.41.22",
        "@types/webpack-dev-middleware": "^3.7.2",
        "@types/webpack-hot-middleware": "^2.25.3",
        ${
          opts.store === "mobx"
            ? '"mobx-logger": "^0.7.1",'
            : `"@types/react-redux": "^7.1.9",
        "@types/redux-logger": "^3.0.8",
        "redux-logger": "^3.0.6",`
        }
        "babel-eslint": "^10.1.0",
        "babel-loader": "^8.1.0",
        "babel-plugin-dynamic-import-node": "^2.3.3",
        "cross-env": "^7.0.2",
        "css-loader": "^5.0.0",
        "eslint": "^7.11.0",
        "isomorphic-style-loader": "^5.1.0",
        "memory-fs": "^0.5.0",
        "rimraf": "^3.0.2",
        "stylus": "^0.54.8",
        "stylus-loader": "^4.1.1",
        "ts-node": "^9.0.0",
        "tsconfig-paths": "^3.9.0",
        "typescript": "^4.0.3",
        "url-loader": "^4.1.1",
        "webpack": "4.43.0",
        "webpack-cli": "^4.0.0",
        "webpack-dev-middleware": "^3.7.2",
        "webpack-hot-middleware": "^2.25.0",
        "webpack-merge": "^5.2.0",
        "webpack-node-externals": "^2.5.2"
			}
		}
	`;

  return { temp, dir: "", name: "package.json" };
};
