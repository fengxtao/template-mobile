// 每个应用模块需要在此注册才能加载
module.exports = {
  "mobile-plugin-gzq": cb => {
    require.ensure([], require => {
      cb(require("tplus-mobile-plugin-gzq"));
    },"mobile-plugin-gzq");
  },
  "mobile-components": cb => {
    require.ensure([], require => {
      cb(require("tplus-mobile-components"));
    },"mobile-components");
  },
  "mobile-navigator": cb => {
    require.ensure([], require => {
      cb(require("tplus-mobile-navigator"));
    },"mobile-navigator");
  },
  "api": cb => {
    require.ensure([], require => {
      cb(require("tplus-api"));
    },"api");
  },
  "mobilelogin": cb => {
    require.ensure([], require => {
      cb(require("tplus-mobilelogin"));
    },"mobilelogin");
  },
  "query-scheme": cb => {
    require.ensure([], require => {
      cb(require("tplus-query-scheme"));
    },"query-scheme");
  }
}