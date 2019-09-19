export default class DisplayUtil {
  static px2rem(value){
    if(typeof value == "number") return (value*2/75)+"rem";
    return value;
  }
}
