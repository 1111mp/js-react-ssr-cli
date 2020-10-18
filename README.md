## js-react-ssr-cli

React 的服务端渲染脚手架

### 使用

首先：

```
npm install js-react-ssr-cli -g
or
yarn global add js-react-ssr-cli
```

然后创建项目：

```
react-ssr create app-name(你的项目名)
```

然后根据提示创建自己的初始化项目

启动开发环境：
```
npm run dev or yarn dev
```

启动生产环境：
```
npm run build && npm run start
or
yarn build && yarn start
```

关于 React 的 SSR：
已经实现项目 DOM、路由、store 和 css 同构，开发环境的热更新功能

支持选择 js 和 typescript，支持选择 MobX 和 Redux

默认的 css 预处理器为：stylus
