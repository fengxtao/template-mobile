import React , {Component} from 'react';
import tools from '../../util/tools'
import {autobind} from 'core-decorators';
import './OrderType.less';

class OrderType extends Component {

    constructor(props) {
        super(props);
        const {defaultIsAsc = false,defaultSelectIndex = -1 } = this.props;
        this.state = {
            selectIndex:defaultSelectIndex,
            isAsc:defaultIsAsc
        }
    }

    @autobind
    onChange(e){
        tools.preventEvent(e);
        let selectIndex = e.currentTarget.getAttribute("data-index");
        let isAsc = true;
        if(this.state.selectIndex == selectIndex){
            isAsc = !this.state.isAsc;
        }
        this.setState({
            selectIndex,
            isAsc
        });
        const {onChange} = this.props;
        onChange(e,selectIndex,isAsc);
    }

    render(){
        return(
            <div className='orderType' onClick={this.handClick}>
            {this.renderChildren()}
         </div>
        );
    }

    renderChildren(){
        if(this.state.selectIndex==-1){
            this.setState({
                selectIndex:0,
                isAsc:true
            })
        }
        let _this = this;
        const {normalClass='iconxia'} = this.props;
        let activeClass = this.state.isAsc ? "iconshang" : "iconxia";
        let children = React.Children.map(this.props.children, (child, index) =>{
            let className = normalClass;
            let activeStyle = {};
            if(_this.state.selectIndex == index){
              activeStyle.color="#49BCD1";
            }
            if(_this.state.selectIndex == index&&_this.state.isAsc){
                className = 'iconshang';

            }
            return React.cloneElement(<div  className={'typeItem'} data-index = {index} onClick={this.onChange}>
                                        <div style={activeStyle} className='typeItem'>
                                            {child}<div className={'iconfont '+ className + ' orderIcon'}/>
                                        </div>
                                    </div>);
        });
        return children;
    }
}

function OrderItem({item}){
    return(
        <div>{item.title}</div>
    );
}

export {OrderItem};


export default OrderType;
