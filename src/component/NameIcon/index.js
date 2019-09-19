import React,{Component} from 'react';
import PropTypes from 'prop-types';
class  NameIcon extends Component{

  static propTypes = {
    name:PropTypes.string,
    index:PropTypes.number.isRequired,
    style:PropTypes.object,
    iconStyles:PropTypes.arrayOf(
      PropTypes.shape({
        background: PropTypes.string.isRequired,
        borderColor: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
      })
    ),

  };
  // _getStyles(){
  //   return {
  //     iconPerson:{
  //       borderRadius: '50%',
  //       position: 'absolute',
  //       height: '100px',
  //       width: '100px',
  //       //fontSize: '0.35rem',
  //       paddingTop: '30px',
  //       textAlign: 'center',
  //       //lineHeight: '22px',
  //       border: 'solid 3px'
  //     }
  //   }
  // }
  _getStyles(){
    return {
      iconPerson:{
        borderRadius: '50%',
        top: '0.1rem',
        position: 'absolute',
        height: '0.55rem',
        width: '0.55rem',
        //fontSize: '0.35rem',
        paddingTop: '0.18rem',
        textAlign: 'center',
        //lineHeight: '1.2rem',
        border: 'solid 0.015rem'
      }
    }
  }
  constructor(...args){
     super(...args);
     this.iconStyles = [
       {background:'#CFEEFF',borderColor:'#A7DFFE',color:'#00a1fd'},
       {background:'#FFF3DF',borderColor:'#FCBE7B',color:'#ff730f'},
       {background:'#CDF0E6',borderColor:'#87DDC4',color:'#0faa7e'},
       {background:'#E5E6F4',borderColor:'#C3BDFD',color:'#7e72ee'},
     ];
  }

  render(){
    const {index,name='',iconStyles=this.iconStyles,style={}} = this.props;
    const iconStyle = iconStyles[index%this.iconStyles.length];
    const {iconPerson} = this._getStyles();
    const finalStyle = {...iconPerson,...iconStyle,...style};
    return <div style={finalStyle}>{name}</div>;
  }

}
export default NameIcon;
