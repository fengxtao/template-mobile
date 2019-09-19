

// const default


class echartUtils {

  //获取DPR的值
  static getDprValue(value){
     var  dpr = window.devicePixelRatio;
     if(!dpr){
       return 2.5 * value;
     }
     return dpr * value;
  };

}

export default echartUtils;
