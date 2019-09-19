import {env} from 'tplusfx';
const {constant,platform,browser,os} = env;
const platform_chanjet = function() {
    return platform === constant.platform.chanjet;
};

const platform_browser = function(){
    return platform === constant.platform.browser;
}

const platform_weixin = function(){
    return platform === constant.platform.weixin;
}

const os_android = function(){
    return os === constant.os.android;
}

const os_ios = function(){
    return os === constant.os.ios;
}

export {platform_chanjet,platform_browser,platform_weixin,os_android,os_ios};
