import { PullToRefresh, ListView, Button } from 'antd-mobile';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

function genData(dataSize) {
  const dataArr = [];
  for (let i = 0; i < dataSize; i++) {
    dataArr.push(`row - ${i}`);
  }
  return dataArr;
}

class PullRefresh extends Component {

  // pageIndex:PropTypes.number.isRequired,
  // pageSize:PropTypes.number.isRequired,
  static propTypes = {
    dataSize:PropTypes.number.isRequired,
    useBodyScroll:PropTypes.bool,
    onMore:PropTypes.func,
    onRefresh:PropTypes.func,
    itemRender:PropTypes.func
  }

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const {useBodyScroll = false} = props;
    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight
    };
    if (useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    const {dataSize = 0} = this.props;
    // this.listHeight = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.listHeight = document.documentElement.clientHeight - this.computedOffsetHeight(ReactDOM.findDOMNode(this.lv));
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(genData(dataSize)),
      height: this.listHeight,
      refreshing: false,
      isLoading: false,
    });
    console.log('componentDidMount.this.listHeight================',this.listHeight);
  }

  componentWillReceiveProps(nextProps){
    const {dataSize = 0} = nextProps;
    console.log('componentWillReceiveProps.this.listHeight================',this.listHeight);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(genData(dataSize)),
      height: this.listHeight || this.state.height
    });
  }

  computedOffsetHeight(el,height=0){
    if(!el||!el.parentElement)return 0;
    var parentElement=el.parentElement;
    if(parentElement.nodeName=='BODY'){
      return el.offsetTop+height;
    }else{
      if(parentElement.style.position){
        height+=el.offsetTop;
      }
      return this.computedOffsetHeight(parentElement,height)
    }

  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    const {onRefresh} = this.props;
    onRefresh&&onRefresh((dataSize) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(genData(dataSize)),
          refreshing: false,
          isLoading: false,
        });
    });
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    const {onMore} = this.props;
    onMore&&onMore((dataSize) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(genData(dataSize)),
          refreshing: false,
          isLoading: false,
        });
    });
  };

  render() {
    const {itemRender,useBodyScroll,onScroll,separatorStyle={backgroundColor: '#EDEBEB',height: 4
  },footerStyle = {},listStyle={}} = this.props;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={separatorStyle}/>
    );

    let curFooterStyle = {padding: 30, textAlign: 'center'};
    _.merge(curFooterStyle,footerStyle);
    //renderHeader={() => <span>Pull to refresh</span>}
    const {onRefresh,onMore} = this.props;
    const pullToRefresh = undefined === onRefresh ? null : <PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>;
    const endReached = undefined === onMore ? null :this.onEndReached;
    let style = {
      height: this.state.height
    };
    _.merge(style,listStyle);
    return (<div>
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={curFooterStyle}>
          {this.state.isLoading ? '加载中...' : '数据加载完毕'}
        </div>)}
        renderRow={itemRender}
        renderSeparator={separator}
        useBodyScroll={useBodyScroll}
        style={style}
        pullToRefresh={pullToRefresh}
        onEndReached={endReached}
        pageSize={5}
        onScroll={onScroll}
      />
    </div>);
  }
}
export default PullRefresh;
