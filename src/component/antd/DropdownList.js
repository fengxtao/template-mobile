import { Popover } from 'antd-mobile';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';

const Item = Popover.Item;

class DropdownList extends Component {


  constructor(props, context) {
    super(props, context);
    const {defaultSelectIndex} = this.props;
    this.state = {
      isShow:false,
      selectIndex:defaultSelectIndex
    }
  }


  render(){
    let items = [];
    let selectItem = '';
    let _this =this;
    if(this.props.children){
      items = React.Children.map(this.props.children, (child, index)=>{
        if(index == _this.state.selectIndex){
          selectItem = child;
        }
        return (<Item key={index} value={index}>{child}</Item>);
      });
    }
    return(<Popover
            mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.isShow}
            placement='bottomLeft'
            overlay={items}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [40, 10],
            }}
            onVisibleChange={this.onPopoverVisibleChange}
            onSelect={this.onSelect}><div onClick={this.onSelectClick}>{selectItem}</div></Popover>);
  }

  @autobind
  onPopoverVisibleChange(visible){
    this.setState({
      isShow:false
    });
  }

  @autobind
  onSelectClick(){
    this.setState({
      isShow:this.state.isShow
    });
  }

  @autobind
  onSelect(selectItem){
    const {selectChangeListener} = this.props;
    this.setState({
      selectIndex:selectItem.props.value
    });
    selectChangeListener(selectItem.props.value);
  }

}
export default DropdownList;
