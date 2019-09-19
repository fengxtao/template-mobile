const path = require('path')
const pkg = require('./package.json')
const NODE_ENV = process.env.NODE_ENV || 'development'
const vendors = Object.keys(pkg.dependencies)
const myip    = require('quick-local-ip')

const injectVar = {
    __APPCONFIG__: JSON.stringify({
        clientId: 'tplusclient', // CSP分配给应用的应用编号, 该属性不能省略
        clientSecret: 'pwjd5q', // CSP分配给应用的客户端密钥, 生产环境请删除.
        cspAppkey: '8f442ec3-713e-4133-b64c-5d2d828c5426',
        cspAppSecret: 'jjy3uh',
        appId:31019,
        appName:'智慧营销',
        appDesc:'数据分析，智慧推广，赋能业务员，让营销更简单！',
        serviceDue: true
    }),
    __PROXYURL__: `'http://${myip.getLocalIP4()}:9998'`,
};

module.exports = {
    theme      : {
        'primary-color'       : '#495060',
        'menu-dark-bg'        : '#495060',
        'menu-dark-submenu-bg': '#363e4f',
        'normal-color'        : '#262a30',
        'text-color'          : '#262a30',
        'border-radius-base'  : '2px',
        'border-radius-sm'    : '2px',
        'font-family'         : 'Microsoft YaHei'
    },
    basePath   : __dirname,
    srcDir     : path.resolve(__dirname, 'src'),
    outDir     : path.resolve(__dirname, 'dist'),
    zipDir     : path.resolve(__dirname, 'app-zip'),
    cordovaDir : path.resolve(__dirname, 'cordova'),
    zipKey     : 'startkit',
    publicPath : NODE_ENV === 'development' ? './' : './',
    esLint     : false,
    vendor     : vendors,
    injectVar
    // 当 (dll不存在) (vendor被改变) (包的版本被更换) 时，请 npm run dll。
}
