'use strict';
module.exports = {
  networkURL: {
    'tplusWebAppApiHost': 'http://webapp.tplus.chanjet.com/TPlus/api/v1/',
    'displayDataURL': 'http://mobilemoni01.chanjeter.com/cloudWeb/t3/common.do',
    'proxyCloudHostArray': [
      'http://cloudproxy01.chanapp.chanjet.com'
    ],
    'ciaHostArray': [
      'http://inte-cia.chanapp.chanjet.com'
    ],
    'tplusHostArray': [
      'http://webapp.tplus.chanjet.com'
    ],
    'redirectServerURL': location.protocol+'//'+location.host,
    'ciaHost': 'http://inte-cia.chanapp.chanjet.com',

  },
  proxy: {
    'throughProxy': false,
    'error': {
      "10101": "连接服务器超时",
      "10107": "T+服务器网络不给力，请确认T+云应用下云应用设置-服务器网络连接是否成功",
      "10104": "企业id不存在",
      "10106": "用户信息认证失败",
      "10108": "用户信息认证失败",
      "10109":"服务器内部错误",
      "T10108":"用户信息认证失败"
    }
  },
  cia: {
    'error': {
      "20129": "用户账号错误",
      "10002": "用户密码错误"
    }
  },
  page: {
    'global_pageSize': 10
  },
  extMsg: {

  },
  version: {
    'minServerVersion': '0052',
    'minServerFullVersion': '12.200.003.0052'
  }
};
