/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-09-12 13:12:35   
*/
import tools from '../../util/tools';
class DataTools {

    static getValue(value, fieldType) {
        let _value = '';
        switch (fieldType) {
            case 51526: _value = this.isNumber(value) ? tools.returnFloat(value) : '0.00'; break;
            case 51527: _value = this.isNumber(value) ? parseInt(value) : '0'; break;
            case 51528:
            default: _value = value;
        }
        return _value;
    }

    static isNumber(str) {
        if (str.trim()) {
            var n = Number(str.trim());
            if (!isNaN(n)) {
                return true;
            }
            return false;
        }
        else
            return false;

    }
}
export default DataTools;