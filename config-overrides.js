const {override,fixBabelImports,addLessLoader,addWebpackAlias,
  addBabelPlugins,addWebpackPlugin,useBabelRc,
  disableChunk,adjustWorkbox,setWebpackPublicPath,
  addBundleVisualizer,disableEsLint,babelInclude,babelExclude,
  addDecoratorsLegacy,addWebpackExternals,addExternalBabelPlugins} = require('customize-cra')
const path = require('path')
const paths = require('react-scripts/config/paths')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const rewireCompressionPlugin = require('react-app-rewire-compression-plugin')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 补充：对开发友好，打包完成桌面提醒
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const dashboard = new Dashboard()
/**
 * 生产环境是否打包 Source Map 两种方法
 */
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false

  return config
}
process.env.PORT = 3006

const options = {
  stylesDir: path.join(__dirname, './src/less'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/less/vars.less'),
  mainLessFile: path.join(__dirname, './src/less/main.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background',
    '@border-color-base'
  ],
  indexFileName: 'index.html',
  generateOnce: false // generate color.less on each compilation
}

// path
const resolveAlias = dir => path.join(__dirname, '.', dir)
// 热跟新
const hotLoader = () => (config, env) => {
  config = rewireReactHotLoader(config, env)
  return config
}
// build--->prod --->文件设置
const appBuildPathFile = () => config => {
  if (config.mode === 'development') {
    console.log('evn is development, skip build path change...')
  } else if (config.mode === 'production') {
    console.log('evn is production, change build path...')
    // 关闭sourceMap
    config.devtool = false
    //  // 配置打包后的文件位置修改path目录
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
    //添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    )
    // 更改生产模式输出的文件名
    // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
    // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
  }
  return config
}
//生产环境去除console.* functions
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}
/**
 * @description 解决打包的时候如下报错
 * @url{https://github.com/ant-design/ant-design/issues/15696}
 * https://blog.csdn.net/peade/article/details/84890399
chunk 3 [mini-css-extract-plugin]
Conflicting order between:
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/input/style/index.less
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/message/style/index.less
 */
const delConflictingOrder = () => {
  return config => {
    for (let i = 0; i < config.plugins.length; i++) {
      const p = config.plugins[i]
      if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
        const miniCssExtractOptions = { ...p.options, ignoreOrder: true }
        config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions)
        break
      }
    }
  }
}
const addMiniCssExtractPlugin = () => {
  return config => {
    config.plugins.unshift(
      new FilterWarningsPlugin({
        // exclude: /any-warnings-matching-this-will-be-hidden/
        // exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
        exclude: /\[mini-css-extract-plugin\][^]*Conflicting order between:/
      })
    )
  }
}
const proxyApi = {
  '/api': {
    // target: '', // prod
    changeOrigin: true,
    secure: false,
    xfwd: false,
    pathRewrite: {
      '^/api': '/'
    }
  },
  '/store': {
    // target: '', // staging
    changeOrigin: true,
    secure: false,
    xfwd: false,
    pathRewrite: {
      '^/store': '/'
    }
  }
}
module.exports = {
  webpack: override(
    fixBabelImports("lodash", {
      libraryDirectory: "",
      camel2DashComponentName: false
    }),
    fixBabelImports('import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      {
        libraryName: 'react-use',
        libraryDirectory: 'lib',
        "camel2DashComponentName": false
      }
    ),
    //less 样式
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { 
        '@primary-color': '#1890ff', // 全局主色
        '@link-color': '#1890ff', // 链接色
        '@success-color': '#52c41a', // 成功色
        '@warning-color': '#faad14', // 警告色
        '@error-color': '#f5222d', // 错误色
        '@font-size-base': '14px', // 主字号
        '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
        '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
        '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
        '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
        '@border-radius-base': '4px', // 组件/浮层圆角
        '@border-color-base': '#d9d9d9', // 边框色
        '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
      },
    }),
    addWebpackExternals({
      React: 'React',
      lodash: 'Lodash'
    }),
    // addWebpackModules(),
    addWebpackAlias({
      '@': resolveAlias('src'),
      lib: resolveAlias('src/lib'),
      components: resolveAlias('src/components'),
      images: resolveAlias('src/assets/images'),
      router: resolveAlias('src/router'),
      'react-dom': '@hot-loader/react-dom'
    }),
    // 允许使用.babelrc文件进行Babel配置。
    useBabelRc(),
    addDecoratorsLegacy(), // 解析器,
    disableEsLint(),
    babelInclude([
      path.resolve("src"), // make sure you link your own source
    ]),

    // babelExclude([path.resolve("src/excluded-folder")]),
    //disableEsLint(),
    appBuildPathFile(),
    dropConsole(),
    // 关闭mapSource
    rewiredMap(),
    // 热跟新
    hotLoader(),
    addWebpackPlugin(
      new WebpackBuildNotifierPlugin({
        title: '',
        logo: path.resolve('./public/logo.svg'),
        suppressSuccess: true
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[id].[contenthash].css',
        ignoreOrder: false
        // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
      }),
      // 美化控制台
      new DashboardPlugin(dashboard.setData),
      // 进度条
      new ProgressBarPlugin(),
      delConflictingOrder(),
      addMiniCssExtractPlugin(),
      new AntdDayjsWebpackPlugin(),
      new AntDesignThemePlugin(options)
    ),

    adjustWorkbox(wb =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat('index.html')
      })
    )
  ),
  devServer: configFunction => (proxy, allowedHost) => {
    proxy = process.env.NODE_ENV === 'development' ? proxyApi : null
    // allowedHost： 添加额外的地址
    const config = configFunction(proxy, allowedHost)
    return config
  }
};