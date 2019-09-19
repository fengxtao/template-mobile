import {webapiProxyReq}  from '../api/TplusApi';
import {voucherTemplate_param_key,localCache_prefix,partnerVoucherTemplateNames} from '../const/templateConst';
import tools from './tools';
import {referConfig} from '../const/referConfig';
import {observable} from 'mobx';

const customFieldPrefixArray = ['priuserdefnvc','priuserdefdecm','pubuserdefnvc','pubuserdefdecm'];


class TemplateUtil{


    /**获取处理后的模板  缓存相关的模板数据**/
    static getDealedTemplate(templateName){
        if(!this[templateName]){
            this[templateName] = this.dealTemplates(this.getTemplate(templateName));
        }
        return this[templateName];
    }


    /**模板下载相关**/
    static async refreshTemplate(){
        //取出模板请求参数
        let templateParam = tools.cache().getLocalStorage(voucherTemplate_param_key);
        let templateObjs = {};
        if(templateParam){
            templateParam = JSON.parse(templateParam);
            partnerVoucherTemplateNames.forEach((templateName,index)=>{
                //读取模板缓存
                templateObjs[templateName] = JSON.parse(tools.cache().getLocalStorage(localCache_prefix+templateName));
                console.log(templateName+"===================cached",templateObjs[templateName]);
            });
        }

      if(!templateParam){
        let defaultParam = {};
        //补充参数默认值
        defaultParam.templatesJson = JSON.stringify(partnerVoucherTemplateNames.map((item,index)=>{
              return {'TemplateName':item,'Ts':''};
        }));
        templateParam = defaultParam;
      }
      let method = 'Ufida.T.EAP.IMBVoucherDesign.GetVoucherTemplate';
      const resp = await webapiProxyReq(templateParam,method,false);
      let templates = resp.Template;
      if(templates && templates.length >0){
            //更新三处缓存  templdateParam  + 两个模板信息
            //更新templateParam 参数信息  主要处理TS的变化
            let templateJsonArray = new Array();
            let refreshTemplateNames = ',';
            templates.forEach((template,index)=>{
                templateObjs[template.TemplateName] = template;
                console.log(template.TemplateName+"===================",template);
                //更新模板localstorage的缓存
                tools.cache().setLocalStorage(localCache_prefix+template.TemplateName,JSON.stringify(template));
                templateJsonArray.push({'TemplateName':template.TemplateName,'Ts':template.Ts});
                refreshTemplateNames = refreshTemplateNames + template.TemplateName + ',';
            });
            if(templateParam && templateParam.templatesJson && templateParam.templatesJson!=''){
                //将没有更新的模板请求参数补全
                const templatesJson = JSON.parse(templateParam.templatesJson);
                //merge (本地模板请求参数,更新后的参数)
                templatesJson.forEach((item,index)=>{
                  if(refreshTemplateNames.indexOf(item.TemplateName + ',') == -1){
                      templateJsonArray.push(item);
                    }
                });
            }
            console.log('template param ===============',templateJsonArray);
                //将更新后的请求信息缓存到localstorage
            tools.cache().setLocalStorage(voucherTemplate_param_key,JSON.stringify({'templatesJson':JSON.stringify(templateJsonArray)}));

        }
      return templateObjs;
    }

    static getTemplate(templateName){
        return JSON.parse(tools.cache().getLocalStorage(localCache_prefix+templateName));
    }


    /**模板处理相关**/

    //处理主子模板
    static dealTemplates(templ){
       var obj = {};
       obj.Name = templ.TemplateName;
       //处理主模板
       obj.Groups = this.dealTemplate(templ).Groups;
       //处理子模板
       obj.Details = this.dealTemplateDetails(templ.Details);
       return obj;
   }

   //处理主模板
   static dealTemplate(templ){

       //"partnerInfo"

       var result = {};

       result.Groups = new Array();

       //模板字段列信息
       var templateFields = templ.TemplateField;
       //模板字段行信息
       var templateVal = templ.TemplateVal;
       //模板分组信息
       var groups = templ.Tab;

       var fields = new Array();
       templateVal.forEach((values,index)=>{
           //遍历行信息，取对应列头信息组装对象。
           var obj ={};
           values.forEach((value,valueIndex)=>{
               obj[''+ templateFields[valueIndex]] = value ;
           });
           //添加规则模板
           this.addFieldRule(obj);
           if(tools.arrayStartWith(customFieldPrefixArray,obj.FieldName)){
              this.handleCustomerField(obj,true);
           }
           fields.push(obj);
       });

       //根据分组信息，对字段信息进行分组返回
       groups.forEach((group,index)=>{
           var obj = {};
           obj.ID = group[0];
           obj.Name = group[1];
           obj.IsEmptyFiledHide = group[3];
           obj.Fields = new Array();
           let refIdFiles = [] ;
           fields.forEach((item,index)=>{
               if(item.TabID == obj.ID){
                   obj.Fields.push(item);
               }
           });
           obj.Fields = obj.Fields.concat(refIdFiles);
           result.Groups.push(obj);
       });

       return result;
   }

   //处理自定义项  补充相关字段
   static handleCustomerField(obj,isHead){
     obj.isCustomFile = true;
     obj.IsHead = isHead;
     //obj.VoucherName = 'Partner';
     obj.ValueFrom='RefDTO';
     if(obj.ControlType=='RefComboBox'){
         obj.ValueFrom='Enum';
     }
   }

   //处理子模板
   static dealTemplateDetails(details){
       var newDetails = [];
       if(!details){
           return newDetails;
       }
       details.forEach((item,index)=>{
           //detail.forEach((item,itemIndex)=>{
               var obj = {};
               obj.Name = item.TemplateName;
               //模板字段列信息
               var templateFields = item.TemplateField;
               //模板字段行信息
               var templateVal = item.TemplateVal;
               obj.IsEmptyFiledHide = item.Tab[0][3];
               obj.Fields = [];
               templateVal.forEach((values,index)=>{
                   //遍历行信息，取对应列头信息组装对象。
                   var objFile ={};
                   values.forEach((value,valueIndex)=>{
                       objFile[''+ templateFields[valueIndex]] = value ;
                   });
                   //添加规则模板
                   this.addFieldRule(objFile);
                   //处理自定义项
                   if(tools.arrayStartWith(customFieldPrefixArray,objFile.FieldName)){
                      this.handleCustomerField(obj,false);
                   }
                   obj.Fields.push(objFile);
               });
               newDetails.push(obj);
           //});
       });
       return newDetails;
   }

   //为每个字段添加规则模板
   static addFieldRule(field){

       if(referConfig[field.FieldName]){
           field.ruleTempl = referConfig[field.FieldName];
       }else{
           field.ruleTempl = {};

       }
       field.ruleTempl.controlID = "chanjet_ui_" + field.FieldName;

       if(field.FieldName == 'SaleMan' || field.FieldName == 'SaleDepartment' ){
          let sysInfo =  tools.cache().getLocalStorage('customerInfo_sysInfoForGZQ');
          if(sysInfo){
            let personInfo = JSON.parse(sysInfo).PersonInfo;
            if(personInfo.IsSalesman){
              if(field.FieldName == 'SaleMan'){
                field.DefaultValue = {ID:personInfo.ID,Name:personInfo.Name}
              }else{
                field.DefaultValue = {ID:personInfo.DepartmentId,Name:personInfo.DepartmentName}
              }
            }
          }
       }
   }

    //处理参照数据
    static dealRefData(data,ruleTempl){
        console.log('ruleTempl===========',ruleTempl);
        var listData = data[ruleTempl.dataStructure.listName];
        if(ruleTempl.dataStructure.listName==''){
            listData = data;
        }
        switch (ruleTempl.type) {
          case 'tree':
            return this.dealLevelData(listData);
            break;
          case 'listview':
            return this.dealParallelData(data,listData,ruleTempl);
            break;
          default:
        }
    }

     //处理平行数据  针对type = listview
     static dealParallelData(data,listData,ruleTempl) {
       var rows = new Array();
       listData.forEach((data,dataIndex)=>{
             rows[dataIndex] = new Array();
             ruleTempl.dataStructure.columnMap.forEach((columnItem,index)=>{
               let val;
               let attributeName = '';
               let attributeTitle = '';
               let column;
               if(Object.prototype.toString.call(columnItem) === '[object Object]'){
                 //如果是数组
                 val = columnItem.map((item,index)=>{
                    return this.getAttributeVal(item.split(':')[0],data);
                 }).join("/");
                 column = {'isTitle':index==1?true:false,'name':attributeName,'title':attributeTitle,'value':val};

               }else{
                 let attributes = columnItem.split(':');
                 attributeName = attributes[0];
                 attributeTitle = attributes[1];
                 val = this.getAttributeVal(attributeName,data);
                 column = {'isTitle':index==1?true:false,'name':attributeName,'title':attributeTitle,'value':val};
                 if(attributes.length == 3){
                    column.width =  attributes[2];//宽度
                 }
                 if(attributeTitle==''){  //有些数据是 是要带入到其它条目中，所以没有title
                    column.isHide = true;
                 }
               }
               console.log('column=============',column);
               rows[dataIndex].push(column);
             });
       });
       console.log('rows===========',rows);

       var result = {'datas':rows};
       if(ruleTempl.isPage){
           result.IsNextPage = data.IsNextPage;
       }
       return result;
     }

     //获取属性值
     static getAttributeVal(attributeName,data){
       let value;
       attributeName.split('_').forEach((dto_prop,index)=>{
           if(index == 0){
               value = data[dto_prop];
           }else{
               if(value){
                   value = value[dto_prop];
               }
           }
       });
       return value;
     }

     //处理分级数据 针对type = tree
     static dealLevelData(data) {

        var rootList = [];//一级节点
        var rootMap = {};
        var leafMap = {};

        data.forEach((item, index) => {
            item.Open = false;
            //label,value与enum的参数统一
            item.label = item.Name;
            item.value = item.ID;
            rootMap[item.ID] = item;
            if (item.ParentID === '') {
                rootList.push(item);
            } else {
                if(leafMap[item.ParentID]) {
                    leafMap[item.ParentID].push(item);
                } else {
                    leafMap[item.ParentID] = observable([]);
                    leafMap[item.ParentID].push(item);
                }
            }
        });
        var result = {};
        result.rootList = rootList;
        result.rootMap = rootMap;
        result.leafMap = leafMap;

        return result;
    }

    //获取模板字段
    static getTemplateField(fields,fieldName){
        return fields.Fields.filter((item,index)=>{
            return fieldName === item['FieldName'];
        });
    }
    // 获取模块模版
    static getGroup(groups,groupName){
      return groups.filter((group,index)=>{
        if (group.Name==groupName) {
            return group;
        }
      });
    }

    //start:显示模板用到的  item构成{'field':'{{template}}','value':'{{value}}'}
    // 模版赋值
    static handleItem(item){
      if (item.field.ControlType == 'RefComboBox'||item.field.ControlType == 'ComboBox'||item.field.ControlType == 'RefComplexBox') {
        this.handleCombox(item);
      }else if(item.field.ControlType == 'CheckBox'){
        this.handleCheckBox(item);
      }else{
        this.handleValue(item);
      }
      return item;
    }

    //处理checkbox类型
    static handleCheckBox(item){
      if (item.value=='True') {
        item.value = '是';
      }else if (item.value=='False'){
        item.value = '否';
      }

      if(item.field.isCustomFile){
            const intValue  = parseInt(item.value);
            item.value = '否';
            if(intValue>0){
              item.value = '是';
            }
       }

    }

    //枚举和基础档案处理
    static handleCombox(item){
      if (item.value) {
        item.value = item.value.Name;
      }else {
        item.value = '';
      }
      this.handleValue(item);
    }

    //特殊处理数据 decimal字段和时间字段
    static handleValue(item){
      if(tools.isNull(item.value)){
        item.value = '';
        return;
      }
      if (item.field.FieldType=='Decimal'||item.field.FieldType=='Int') {
        item.value = this.handleDecimalValue(item.value,item.field.Precision);
      }
      // 时间格式处理
      if (item.field.FieldType=='DateTime') {
        item.value = this.handleDateValue(item.value);
      }
    }

    //控制数值型字段的显示
    static handleDecimalValue(value,precision){
      //控制小数点精度
      if (value) {
        let point = value.indexOf('.');
        if (value.length > point+precision+1&&point>0) {
            let index=0;
            if (precision > 0) {
              index = 1;
            }
            value = value.substring(0,point+precision+index);
        }
      }
      return value;
    }

    //控制Date型显示
    static handleDateValue(value){
      if(value){
         return /\d{4}-\d{1,2}-\d{1,2}/g.exec(value)[0];
      }
    }

}


export default TemplateUtil;
