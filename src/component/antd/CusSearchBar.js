import { Modal,SearchBar} from 'antd-mobile';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import { Icon } from 'antd-mobile';
import tools from '../../util/tools'
import './CusSearchBar.less'
import {os_ios,platform_chanjet} from '../../plugin/platform'



class CusSearchBar extends Component {

  constructor(props, context) {
    super(props, context);
    this.cachePre ='SearchPopDialog';
    this.history = this.getSearchHistory();
    this.state = {
      isShow:false,
      history:this.history,
      keyWord:''
    }
  }

  getSearchHistory(){
    const {searchKey} = this.props;
    let history = tools.cache().getLocalStorage(this.cachePre + searchKey);
    if(!history){
      return [];
    }
    return history.split(',');
  }

  saveSearchHistory(history){
      const {searchKey} = this.props;
      tools.cache().setLocalStorage(this.cachePre + searchKey,history);
  }

  renderHistory(){
    let history = [];
    for(let i=this.state.history.length-1,j=0;j<10;i--,j++){
      let item = this.state.history[i];
      if(item){
        history.push(<p data-text = {item} onClick={this.historyClick}>{item}</p>);
      }
    }
    if(this.state.history.length==0){
      return <div className='empty'>无搜索历史数据</div>;
    }
    return (<div className='history'>{history}<div className='clearHistory' onClick={this.clearHistory}>清除搜索记录</div></div>);
  }

  @autobind
  clearHistory(){
    let that = this;
    this.refs.searchBar.inputRef.blur();
    Modal.alert('温馨提示',"确定清除搜索记录？",[
      {
        text:'确定',
        onPress: ()=>{
          that.history = [];
          that.saveSearchHistory(this.history);
          that.setState({
            history:this.history
          });
        }
      },
      {
        text:'取消',
        onPress: ()=>{
        }
      }
    ]);

  }

  @autobind
  historyClick(e){
    const keyWord = e.currentTarget.getAttribute('data-text');
    this.setState({
      keyWord
    });
    this.refs.searchBar.inputRef.blur();
    this.searchClick(keyWord);

  }

  @autobind
  searchClick(value){
    value = value.trim();
    const {search} = this.props;
    search(value);
    if(value!=''){
      let history = this.history;
      if(history.includes(value)){
        const index = history.indexOf(value);
        history.splice(index,1);
      }
      history.push(value);
      this.saveSearchHistory(history);
    }
    this.setState({
      isShow:false
    })
  }

  @autobind
  textChange(value){
    let history = this.history.filter(item=>{
      return item.indexOf(value)>=0;
    });
    this.setState({
      isShow:value == '' ? false:true,
      history,
      keyWord:value
    });
  }


  @autobind
  renderSearch(){
    const {placeholder = '搜索'} = this.props;
    return (<div className='CusSearchBar_search'>
              <SearchBar
                  ref = 'searchBar'
                  value = {this.state.keyWord}
                  placeholder={placeholder}
                  onChange = {this.textChange}
                  onClear = {this.clear}
                  onFocus ={this.focus}
                  onCancel = {this.cancel}
                  onSubmit={this.searchClick}/>
                  {this.props.children}
            </div>);
  }

  @autobind
  clear(){
    const {clear} = this.props;
    if(clear){
      clear();
    }
    this.refs.searchBar.inputRef.blur();
  }

  @autobind
  focus(){
    this.setState({
      history : this.getSearchHistory(),
      isShow:true
    })
  }

  @autobind
  cancel(){
    this.setState({
      keyWord:''
    });
    this.searchClick('');
  }

  @autobind
  searchBtnClick(){

  }

  @autobind
  close(){
    this.setState({
      isShow:false
    })
  }

  render(){
    let detailStyle = platform_chanjet() && os_ios() ? {paddingTop:'0.6rem'}:{};

    const {renderSearchContent} = this.props;
    let searchContent = renderSearchContent ? renderSearchContent() : <Icon type='search' />
    return(<div>
      {this.renderSearch()}
      <Modal
          style={detailStyle}
          mask = {false}
          popup
          visible={this.state.isShow}
          onClose = {this.close}
          wrapClassName ='search-modal-wrap'
          animationType="slide-down">
            <div className='CusSearchBar'>
              {this.renderHistory()}
            </div>
        </Modal>
    </div>);
  }

}
export default CusSearchBar;
