import { PullToRefresh, ListView, Button, Icon } from 'antd-mobile';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ProgressState.less';
import {autobind} from 'core-decorators';

class ProgressState extends Component {

  static propTypes = {
    state:PropTypes.number.isRequired,
    empty:PropTypes.string,
    error:PropTypes.string,
    style:PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  @autobind
  renderEmptyContent(){
    const {empty,loadClassPre=''} = this.props;
    return (
      <div className={`${loadClassPre}empty`}>
        <div className='content'><p>{empty.info}</p></div>
      </div>);
  }

  @autobind
  renderErrorContent(){
    const {error,loadClassPre=''} = this.props;
    return(
      <div className={`${loadClassPre}error`}>
        <div className='content'><Icon type='cross-circle' size='lg'/><p>{error.info}</p></div>
      </div>);
  }

  @autobind
  renderLoadingContent(){
    const {loadClassPre=''} = this.props;
    return (
      <div className={`${loadClassPre}loading`}>
        <div className='content'><Icon type='loading' size='lg'/><p>数据读取中</p></div>
      </div>);
  }

  @autobind
  renderContent(){
    const {state} = this.props;
    switch (state) {
      case 'empty': return this.renderEmptyContent();break;
      case 'error': return this.renderErrorContent();break;
      case 'load': return this.renderLoadingContent();break;
      default:return this.props.children;
    }
  }


  render() {
    const {state,empty,error,style ={}} = this.props;
    const content = this.renderContent();
    return (<div style={style}>
      {content}
    </div>);
  }
}
export default ProgressState;
