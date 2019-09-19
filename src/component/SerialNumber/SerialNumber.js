import React, {Component}  from 'react';
import './SerialNumber.less';


class SerialNumber extends Component {
    constructor(props) {
        super(props);
        this.state =  {
          index: '50'
        }
    }


    _getStyle(){
        let color = '#000';
        let backgroundColor='#E0EEFE';
        let {background} = this.props;
        // if(background){
        //     backgroundColor = background;
        //     color = '#fff';
        // }
    return {
      serialNumber: {
        background:backgroundColor,
        color:color
      }
    }
  }

    render() {
        const {index,background} = this.props;
        const styles = this._getStyle();
        if(background){
           
            const img =  require('../../image/' + background +'.png')
            var iconClassName = `${img}`;
            return(
                <div className = 'svgImg'>
                    <img className="color-icon" src ={iconClassName}/>
                </div>);
        }
        return (
            <div style = {styles.serialNumber} className="SerialNumber">
               {index}
            </div>
        );
    }
}
export default SerialNumber;
