import React, {Component}  from 'react';
import './SmoothAmount.less';
import tools from '../../util/tools';
import {autobind} from 'core-decorators';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
var mobx = require('mobx');

const preventEvent = (event) => {
    if (event) {
        event.preventDefault();
        event.stopImmediatePropagation && event.stopImmediatePropagation();
        event.stopPropagation();
    }
};

@observer
class SmoothAmount extends Component {
  static PropTypes = {
       Datas: PropTypes.Array,
       OnFunClick: PropTypes.func
  }

  constructor(props, context) {
     super(props, context);
  }

  _getStyle(){

  }

  @autobind
  dataItemClick(e){
    const {itemClickListener} = this.props;
    itemClickListener(e.currentTarget.getAttribute("data-index"))
  }

  _renderMutiColumnDatas(Datas){
    let columnLength = 2;
    if(Datas.length%3 == 0){
      columnLength = 3;
    }
    let SmoothAmountDatas = '';

    if(Datas && Datas.length>0){
      SmoothAmountDatas = [];
      Datas.forEach((item,index)=>{
        let rowSize = parseInt(index/columnLength);
        if(!SmoothAmountDatas[rowSize]){
          SmoothAmountDatas[rowSize]=[];
        }
      let unit = item.Unit?item.Unit:'';

      SmoothAmountDatas[rowSize].push(<li key={`SmoothButton_li_${index}`} className={item.AmountFile} data-index={index} onClick={this.dataItemClick}>
        <p>{item.Value}</p>
        <span className ='title'>{item.Name}</span>{unit && <span>({unit})</span>}
      </li>);
      });


      if(columnLength == 2){
        SmoothAmountDatas = SmoothAmountDatas.map((item,index)=>{
          if(item.length>0){

            return(<ul key={`SmoothButton_ul_${index}`} className="row">{item}</ul>);
          }
          return(<div></div>);
        });
      }

      if(columnLength ==  3){
        SmoothAmountDatas = SmoothAmountDatas.map((item,index)=>{
          let right = [];
          right.push(item[1]);
          right.push(item[2]);
          if(item.length>0){

            return(<ul key={`SmoothButton_ul_${index}`} className="row"><div className='left'>{item[0]}</div><div className='right'>{right}</div></ul>);
          }
          return(<div></div>);
        });
      }
    }
    let className = columnLength ==  3 ? 'MutiTotalAmount_Three' : 'MutiTotalAmount';
    return (
        <div className={className}>
            { SmoothAmountDatas }
        </div>
    );
  }

  _renderSingleColumnData(Datas){

    const item = Datas[0];
    let style =  this._getStyle();
    let amountStyle ={
      paddingBottom:this.props.smoothAmountBottom,
      backgroundColor:this.props.backgroundColor
    };
    let unit = item.Unit?item.Unit:'';
    const {ValueColor,NameColor} = this.props;
    return (
      <div className="SingleTotalAmount" style = {amountStyle}>
         <h2 style={{color:ValueColor}}>{item?tools.thousandthNum(item.Value):''}</h2>
         <span style={{color:NameColor}}>{item?item.Name:''} </span>{unit && <span style={style.UnitStyle}> ({unit})</span>}
      </div>
    );
  }


  render (){

    const {datas} = this.props;

    if(datas){
      if(datas.length == 1){
          return this._renderSingleColumnData(datas);
      }else{
          return this._renderMutiColumnDatas(datas);
      }
    }else {
      return(<div></div>);
    }
  }
}
export default SmoothAmount;
