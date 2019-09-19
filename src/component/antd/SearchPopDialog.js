import { Modal,SearchBar} from 'antd-mobile';
import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import { Icon } from 'antd-mobile';
import tools from '../../util/tools'
import './SearchPopDialog.less'


class SearchPopDialog extends Component {

  constructor(props, context) {
    super(props, context);
    this.cachePre ='SearchPopDialog';
    this.state = {
      isShow:false,
      history:[],
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
      return <div className='empty'>无搜索历史数据<span className='cancel' onClick={this.cancel}>取消</span></div>;
    }
    return (<div className='history'>{history}<div className='clearHistory' onClick={this.clearHistory}>清除搜索记录</div><span className='cancel' onClick={this.cancel}>取消</span></div>);
  }

  @autobind
  clearHistory(){
    let that = this;
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
    this.searchClick(keyWord);
  }

  @autobind
  searchClick(value){
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
      isShow:!this.state.isShow
    })
  }

  @autobind
  textChange(value){
    let history = this.history.filter(item=>{
      return item.indexOf(value)>=0;
    });
    this.setState({
      history,
      keyWord:value
    });
  }


  @autobind
  renderSearch(){
    const {placeholder = '搜索'} = this.props;
    return (<div className='search'>
              <SearchBar
                  value = {this.state.keyWord}
                  placeholder={placeholder}
                  onChange = {this.textChange}
                  onClear = {this.clear}
                  onCancel = {this.cancel}
                  onSubmit={this.searchClick}/>
            </div>);
  }

  @autobind
  clear(){
    const {clear} = this.props;
    if(clear){
      clear();
    }
  }

  @autobind
  cancel(){
    this.setState({
      isShow:false
    })
  }

  @autobind
  searchBtnClick(){
    this.setState({
      isShow:!this.state.isShow
    })
    if(!this.state.isShow){

    }
    this.history = this.getSearchHistory();

    // let history = this.state.keyWord ? this.history.filter(item=>{
    //   return item.indexOf(this.state.keyWord)>=0;
    // }):this.history;

    this.setState({
      history:this.history
    })
  }

  @autobind
  close(){
    this.setState({
      isShow:false
    })
  }

  render(){

    const {renderSearchContent} = this.props;
    let searchContent = renderSearchContent ? renderSearchContent() : <Icon type='search' />
    return(<div>

      <div onClick={this.searchBtnClick}>{searchContent}</div>
      <Modal
          popup
          wrapClassName ='search-modal-wrap'
          visible={this.state.isShow}
          onClose = {this.close}
          animationType="slide-down">
            <div className='searchPopDialog'>
              {this.renderSearch()}
              {this.renderHistory()}
            </div>
        </Modal>
    </div>);
  }

}
export default SearchPopDialog;
