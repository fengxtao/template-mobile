var config = require('../api/config');
import _ from 'lodash';

class tools {
  static createGUID() {
    function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  // 验证手机号码
  // 验证规则：11位数字，以1开头
  static checkMobile(str) {
        var re = /^1\d{10}$/;
        return re.test(str);
  }

  // 验证电话号码
  // 验证规则：区号+号码，区号以0开头，3位或4位
  // 号码由7位或8位数字组成
  // 区号与号码之间可以无连接符，也可以“-”连接
  // 如01088888888,010-88888888,0955-7777777
  static checkPhone(str){
     var re = /^0\d{2,3}-?\d{7,8}$/;
     return true;
  }


  static format (num) {
    if(typeof num !== 'number') return num;
    return (this.returnFloat(num) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  }


  static returnFloat(value){
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
      value=value.toString()+".00";
      return value;
    }
    if(xsd.length>1){
      if(xsd[1].length<2){
        value=value.toString()+"0";
      }
      return value;
    }
  }

  static preventEvent (event) {
    if (event) {
        event.preventDefault();
        event.stopImmediatePropagation && event.stopImmediatePropagation();
        event.stopPropagation();
    }
  }

  static phoneFormat(phoneNum, type='mobile') {
    if(isNaN(phoneNum)) return phoneNum;

    if(type == 'mobile') {
      return (''+phoneNum).replace(/(^\d{3}|\d{4}\B)/g,"$1-");
    } else if(type == 'phone') {
      return phoneNum;
    }
  }


  //判断是否为空
  static isNull(s) {
  	if (s==undefined || (this.trim(s) + "123" == "123")) {
  		return true;
  	}
  	return false;
  }

  //去空函数
  static trim(str) {
    var localstr = new String(str);
    var pattern = /^\s+|\s+$/g;
    localstr = localstr.replace(pattern, "");
    return localstr;
  }

  //数组包含的函数
  static arrayContains(array,element){
    for (var i = 0; i < array.length; i++) {
      if (array[i] == element) {
        return true;
      }
    }
    return false;
  };

  //是否以数组中的内容作为开头
  static arrayStartWith(array,element){
    for (var i = 0; i < array.length; i++) {
      if (element && element.startsWith(array[i])) {
        return true;
      }
    }
    return false;

  }

  //判断是不是小数
  static isMinus(number){
    if(!this.isNull(number)){
      if(parseFloat(number) < 0){
         return true;
      }
    }
    return false;
  }

  //数组部分包含
  static arrayIndexOf(array,element){

    for (var i = 0; i < array.length; i++) {
      if (element.indexOf(array[i])> -1) {
        return true;
      }
    }
    return false;
  };

  //判断是否是json对象
  static isJson(obj){
    return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  }

  static isJsonStr(jsonStr){
    if(isNull(jsonStr)){
      return false;
    }
    if(jsonStr.indexOf('{')==0 || jsonStr.indexOf('[')==0){
      return true;
    }
  }

  //根据小数位数 四舍五入
  static fixedNum(num,precision){
     if(typeof num !== 'number') return num;
     return _.round(num,precision);
  }

//连接的字符串中是否包含某个指定字符串
 static concatStringContains(concatString,containStr,seperator)
 {
     seperator = seperator || ',';
     if(!this.isNull(concatString)&&!this.isNull(containStr)){
        let strArray = concatString.split(seperator);
        for(let index in strArray){
           if(strArray[index] === containStr){
               return true;
           }
        }
     }
     return false;
 }

  /**
   * 数字转千分符
   */
  static comdify(n)
  {
      var absn=Math.abs(n);
      var re=/\d{1,3}(?=(\d{3})+$)/g;
      var n1=String(absn).replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
      if(n<0)
        return '-'+n1;
      else
        return n1;
  }

  static toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }

  /**
   * 格式化日期：yyyy-MM-dd
   */
  static formatDate(date) {
      var myyear = date.getFullYear();
      var mymonth = date.getMonth()+1;
      var myweekday = date.getDate();

      if(mymonth < 10){
          mymonth = "0" + mymonth;
      }
      if(myweekday < 10){
          myweekday = "0" + myweekday;
      }
      return (myyear+"-"+mymonth + "-" + myweekday);
  }
  /**
   * 获得某月的天数
   */
  static getMonthDays(nowYear,myMonth){
      var monthStartDate = new Date(nowYear, myMonth, 1);
      var monthEndDate = new Date(nowYear, myMonth + 1, 1);
      var days=(monthEndDate-monthStartDate)/(1000*60*60*24);
      return days;
  }
  /**
   * 根据日期获取星期几 欠款明细中使用
   */
   static getWeekday(myday){

      var strs= new Array(); //定义一数组
      strs=myday.split("-"); //字符分割
      var myDate = new Date(strs[0],parseInt(strs[1])-1,strs[2]);
      var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      return (weekDay[myDate.getDay()]);
   }


   /**
    * 获取当前格式化时间  格式“yyyy-MM-dd HH:MM:SS”
    */
   static getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + date.getHours() + seperator2 + date.getMinutes()
              + seperator2 + date.getSeconds();
      return currentdate;
  }

  /**
   * js 时间差  获取毫秒时间差
   */
   static getTimeDiff(startTime){
      return new Date().getTime() - startTime.getTime();
   }



   /**
    * 转换金额小数位数+单位
    */
   static changeToAccountNum(num,currency){
     var currencyName="";
     if(!this.isNull(num)){
       if(currency !== undefined){
         if(isJson(currency)){
            //如果是curreny对象
           currencyName = currency.Name;
         }else{
            //直接传递currencyName
            currencyName = currency;
          }
       }
       return (comdify(parseFloat(num).toFixed(2)) + currencyName);
     }else{
       return "";
     }
   }

   //检查日期是否合法
   static checkStartAndEndDate(startDate,endDate){
      if(!this.isNull(startDate)&&!this.isNull(endDate)){
          var startDateStr = startDate.split('-').join();
          var endDateStr = endDate.split('-').join();
          if(parseFloat(startDateStr)>parseFloat(endDateStr)){
              return '开始时间不能大于结束时间';
          }
      }
      return '';
   }

   static accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }

   //公共函数
   static Map() {
       /** 存放键的数组(遍历用到) */
       this.keys = new Array();
       /** 存放数据 */
       this.data = new Object();

       /**
        * 放入一个键值对
        * @param {String} key
        * @param {Object} value
        */
       this.put = function(key, value) {
           if(this.data[key] == null){
               this.keys.push(key);
           }
           this.data[key] = value;
       };

       /**
        * 获取某键对应的值
        * @param {String} key
        * @return {Object} value
        */
       this.get = function(key) {
           return this.data[key];
       };

       /**
        * 遍历Map,执行处理函数
        *
        * @param {Function} 回调函数 function(key,value,index){..}
        */
       this.each = function(fn){
           if(typeof fn != 'function'){
               return;
           }
           var len = this.keys.length;
           for(var i=0;i<len;i++){
               var k = this.keys[i];
               fn(k,this.data[k],i);
           }
       };

       /**
        * 获取键值数组(类似Java的entrySet())
        * @return 键值对象{key,value}的数组
        */
       this.entrys = function() {
           var len = this.keys.length;
           var entrys = new Array(len);
           for (var i = 0; i < len; i++) {
               entrys[i] = {
                   key : this.keys[i],
                   value : this.data[i]
               };
           }
           return entrys;
       };

       /**
        * 判断Map是否为空
        */
       this.isEmpty = function() {
           return this.keys.length == 0;
       };

       /**
        * 获取键值对数量
        */
       this.size = function(){
           return this.keys.length;
       };

       /**
        * 重写toString
        */
       this.toString = function(){
           var s = "{";
           for(var i=0;i<this.keys.length;i++,s+=','){
               var k = this.keys[i];
               s += k+"="+this.data[k];
           }
           s+="}";
           return s;
       };
   }


   //修改日期格式样式
   static dateChange(date,s,r){
     // return date.replace('-','.');
     return date.replace(/-/ig, ".");
   }

  static removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
  }

  //判断是不是为数值型
static isNumber(str){
  var n = Number(str);
  if (!isNaN(n))
  {
      return true;
  }
  return false;
}


  static isJsonStr(str){
    try{
      var obj = eval('(' + str + ')');
      return true;
      }
      catch(e){
        return false;
      }
      return true;
  }

  static formatDate(date) {
    let month = '' + (date.getMonth() + 1),
     day = '' + date.getDate(),
     year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  static cloneObj(obj){
    let str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //序列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
  }

  static isDiff(obj1,obj2){

    if((obj1!=undefined && typeof obj1 =='boolean') || (obj2!=undefined && typeof obj2 == 'boolean')){
        if(obj1.toLocaleString().toLowerCase() == obj2.toLocaleString().toLowerCase()){
          return false;
        }else{
          return true;
        }
    }

    if(!obj1 && !obj2){
      return false;
    }
    if(obj1 && !obj2){
      return true;
    }
    if(!obj1 && obj2){
      return true;
    }
    if((typeof obj1 =='object') && (typeof obj2 == 'object')){
      if(obj1.ID!=obj2.ID){
        return true;
      }else{
        return false;
      }
    }

    if(obj1!=obj2){
      let numObj1 = Number(obj1);
      let numObj2 = Number(obj2);
      if(!isNaN(numObj1) && !isNaN(numObj2)){
        if(numObj1 == numObj2){
          return false;
        }
      }
      return true;
    }

    return false;
  }

  static insertArray(arr, index, item) {
    arr.splice(index, 0, item);
  }

  //判断类型
  static type(obj) {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
  }

  //深拷贝
  static deepClone(data) {
    var t = this.type(data), o, i, ni;
    if(t === 'array') {
        o = [];
    }else if( t === 'object') {
        o = {};
    }else {
        return data;
    }
    if(t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
            o.push(this.deepClone(data[i]));
        }
        return o;
    }else if( t === 'object') {
        for( i in data) {
            o[i] = this.deepClone(data[i]);
        }
        return o;
    }
  }


    //千分符处理
    static thousandthNum(num){
      return num && num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }

    //四舍五入且千分符处理
    static fixedAndThousandthNum(num,precision){
      return this.thousandthNum(this.fixedNum(num,precision));
    }


    //设置缓存内容
    static setCacheValue(cacheName, value){
      if(typeof value == 'object'){
        window.localStorage[cacheName] = JSON.stringify(value);
      }else{
        window.localStorage[cacheName] = value;
      }
    }

    static setUserCache(cacheName, value){
      let key = 'Tplus_Marketing' + '_' + cacheName +'_'+ tools.getCacheValue('session.orgId') +'_' + tools.getCacheValue('session.userId');
      this.setCacheValue(key, value);
    }

    static getCacheValue(cacheName){
      return window.localStorage[cacheName];
    }

    static getUserCache(cacheName){
      let key = 'Tplus_Marketing' + '_' + cacheName +'_'+ tools.getCacheValue('session.orgId') +'_' + tools.getCacheValue('session.userId');
      return this.getCacheValue(key);
    }


    static removeCacheValue(cacheName){
      window.localStorage.removeItem(cacheName);
    }

    //获取历史
    static getHistory(cacheName){
      let historyItemsString = this.getCacheValue(cacheName);
      if(historyItemsString){
          return JSON.parse(historyItemsString);
      }else{
          return [];
      }
    }

    static cache() {
        return {
          keyPrefix: 'Tplus_Marketing' + '_' + window.localStorage.orgId +'_' + window.localStorage.userId + '_',
          get: function (cacheName) {
            cacheName = this.keyPrefix + cacheName;
            return config.cache[cacheName];
          },
          getLocalStorage: function(cacheName){
            cacheName = this.keyPrefix + cacheName;
            if(window.localStorage){
                return window.localStorage[cacheName];
            }else{
                return this.get(cacheName);
            }
          },
          set: function (cacheName, value) {
            cacheName = this.keyPrefix + cacheName;
            config.cache[cacheName] = value;
          },
          setLocalStorage: function (cacheName, value) {
            cacheName = this.keyPrefix + cacheName;
            if(window.localStorage){
                window.localStorage[cacheName] = value;
            }else{
                config.cache[cacheName] = value;
            }
          },
          clear: function () {
              for (var attr in config.cache)
                  if (attr != "get" && attr != "set" && attr != "clear")
                      delete config.cache[attr];
          }
      }
    };

  //本地历史功能使用 写入对象为数组  插入元素写入到数组起始位置  LRU 最多保留10个元素
  static insertHistory(cacheName,historyItem,compare){
    let historyItemsString = this.getCacheValue(cacheName);
    let historyItems;
    if(historyItemsString){
      historyItems = JSON.parse(historyItemsString);
      let isContain = historyItems.some((item,index)=>{
        if(compare){
          return compare(historyItem,item);
        }
        return item == historyItem;
      });
      if(!isContain){
        let itemLength = historyItems.unshift(historyItem);
        if(itemLength > 10){
            historyItems.pop();
        }
      }
    }else{
      historyItems = new Array();
      historyItems.push(historyItem);
    }
    this.setCacheValue(cacheName,JSON.stringify(historyItems));
  }

  static getShareCode(){
    let supplierInfo = tools.getCacheValue('SupplierInfo');
    if(!tools.isNull(supplierInfo)){
      supplierInfo = JSON.parse(supplierInfo);
    }
    let timestamp = new Date().getTime();
    let time = timestamp-1546272000000;
    return parseInt('1'+supplierInfo.supplier_id+time);
  }

  static getShareHost(){
    let supplierInfo = tools.getCacheValue('SupplierInfo');
    if(!tools.isNull(supplierInfo)){
      supplierInfo = JSON.parse(supplierInfo);
    }
    return supplierInfo.share_host;
  }

}
export default tools;
