// 保证加载足够快
require.ensure([], require => {
  require('babel-polyfill');

  // 把一些常用的第三方包合并在一起加载
  require('react');
  require('react-dom');
  require('react-router');
  require('react-router-dom');

  require('mobx');
  require('mobx-react');

  //require('socket.io-client');

  // require('antlr4');
  // require('nools');

  // require('i18next-browser-languagedetector');
  // require('i18next-xhr-backend');
  // require('i18next');

  const clientModules = require('./clientModules');
  const moduleNames = Object.keys(clientModules);
  const loadNext = function (cur = 0) {
    const key = moduleNames[cur];
    if (key) {
      clientModules[key](() => {
        loadNext(cur + 1);
      });
    } else {
      require('./src/index');
    }
  }
  loadNext();

}, 'common');
