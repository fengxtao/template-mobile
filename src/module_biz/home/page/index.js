import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';
import { observer, inject } from 'mobx-react';
import { Icon, Button, Toast } from 'antd-mobile';
import NavPage from '../../../routers/nav/NavPage';
import { destroyApp } from 'tplus-mobile-plugin-gzq';
import './index.less';
import TopBanner from '../../componet/TopBanner';
import PasswordInput from '../../componet/PasswordInput';
import Base64 from 'base-64';
import {stores} from 'tplusfx'

// @inject('HomeStore')
@NavPage
@observer
class Home extends Component {

  constructor(props) {
    super(props);
    stores.HomeStore.init();
    this.state = {
      IsSelected: true,
      WagePwd1: '',
      WagePwd2: ''
    };
  }

  navLeftIcon() {
    return (<Icon type="left" />);
  }

  navLeftClick() {
    destroyApp();
  }

  navTitle() {
    return '输入设置薪资查询密码';
  }

  componentDidMount() {
    const loadData = async () => {
      const resp = await stores.HomeStore.loadPageSet();
      const { PageSet } = stores.HomeStore.Home;
      if (PageSet.PageShowType == 2000)
        this.push('checkPwd');
      else if (PageSet.PageShowType == 3000)
        this.push('salaryList');
    };
    loadData();
  }

  render() {
    const { Home } = stores.HomeStore;
    return (
      <div className='home'>
        <TopBanner></TopBanner>
        {Home && Home.PageSet && (Home.PageSet.PageShowType == 1000 || Home.PageSet.PageShowType == 1001) ?
          <div>

            <div className='welcomeDiv'>欢迎使用薪资查询，建议您设置查询密码</div>
            <PasswordInput title='密码' pwdValue={this.state.WagePwd1} placeholder='请输入6位数字查询密码'
              onPwdChange={e => { this.setState({ WagePwd1: e.target.value }) }}></PasswordInput>
            <PasswordInput title='新密码' pwdValue={this.state.WagePwd2} placeholder='请输入6位数字查询密码'
              onPwdChange={e => { this.setState({ WagePwd2: e.target.value }) }}></PasswordInput></div> : null}

        {Home && Home.PageSet && Home.PageSet.PageShowType == 1001 ?
          <div className='check'>
            <div className='checkInput'>
              <input name="checkPassword" type="checkbox" value="" checked={this.state.IsSelected} defaultChecked={this.state.IsSelected}
                onChange={e => { this.setState({ IsSelected: e.target.checked }) }} />
            </div>
            <div>
              <div className='checkTitle'>不想启用查询密码</div>
              <div className='checkInfo'>勾选此项后，将不用输入密码直接查询工资</div>
            </div>
          </div> : null}
        <div>
          <Button className='btnOK' onClick={e => this.onPwdSet()}>确定</Button>
        </div>
      </div>
    );
  }

  onPwdSet() {
    if (this.state.WagePwd1 != this.state.WagePwd2) {
      Toast.info('两次密码输入不一致', 1);
    }
    else {
      if (this.state.WagePwd1.length != 6) {
        Toast.info('请输入六位有效密码', 1);
      }
      else {
        const pwd = Base64.encode(this.state.WagePwd1);
        const callbacek = (resp) => {
          if (resp.IsSucceed) {
            Toast.info('查询密码设置成功', 1, () => { this.push('checkPwd'); });
          }
          else
            Toast.info(resp.ErrorMsg.Msg, 3);
        };
        stores.HomeStore.PwdSet(this.state.IsSelected, pwd, callbacek);
      }
    }
  }
}

export default Home;
