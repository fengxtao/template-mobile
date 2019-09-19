import React, {Component}  from 'react';
import './TogglePanel.less';
import {autobind} from 'core-decorators';

class TogglePanel extends Component {

  constructor(props, context) {
     super(props, context);
     const {defaultIndex} = this.props.togglePanelModel;
     this.state = {
        currentIndex: defaultIndex
     }
  }
  @autobind
  onToggleClick(index) {
    this.setState({
      currentIndex: index
    });
    const {togglecChangeListener} = this.props;
    togglecChangeListener(index);
  }

  render (){
      const {togglePanelModel} = this.props;
      const datasGroup =togglePanelModel.data?togglePanelModel.data.map((item,index)=>{
        // 遍历标签页，如果标签的id 等于 currendIndex id ,那么该标签多加一个 active
        var tabStyle = index == this.state.currentIndex?'active':'';

        return (
          <li key={index} className={tabStyle} onClick={this.onToggleClick.bind(this,index)}>{item.title}</li>
        )
      }):'';
      return(
        <div className="TogglePanel">
          <ul>
            {datasGroup}
          </ul>
        </div>
      );
  }
}
export default TogglePanel;
