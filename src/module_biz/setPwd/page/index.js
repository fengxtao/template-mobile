import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';
import { observer, inject } from 'mobx-react';
import { Icon, Button, Toast, Modal } from 'antd-mobile';
import NavPage from '../../../routers/nav/NavPage';
import { destroyApp } from 'tplus-mobile-plugin-gzq';
import './index.less';
import PasswordInput from '../../componet/PasswordInput';
import Base64 from 'base-64';
import tools from "../../../util/tools";


// @inject('SetPwdStore')
@NavPage
@observer
class SetPwd extends Component {

  constructor(props) {
    super(props);
    stores.SetPwdStore.init();
    this.state = {
      pwdOld: '',
      pwdNew1: '',
      pwdNew2: ''
    };
  }

  navLeftIcon() {
    return (<Icon type="left" />);
  }

  navLeftClick() {
    destroyApp();
  }

  navTitle() {
    return '薪资查询';
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='home'>
        <div className='honeTitle'>密码修改</div>
        <PasswordInput title='旧密码' pwdValue={this.state.pwdOld} placeholder='请输入6位数字查询密码'
          onPwdChange={e => { this.setState({ pwdOld: e.target.value }) }}></PasswordInput>
        <PasswordInput title='新密码' pwdValue={this.state.pwdNew1} placeholder='请输入6位数字查询密码'
          onPwdChange={e => { this.setState({ pwdNew1: e.target.value }) }}></PasswordInput>
        <PasswordInput title='确认密码' pwdValue={this.state.pwdNew2} placeholder='请再次输入新查询密码'
          onPwdChange={e => { this.setState({ pwdNew2: e.target.value }) }}></PasswordInput>
        <div>
          <Button className='btnOK' onClick={e => this.onModifykPwd()}>确定</Button>
        </div>
      </div>
    );
  }

  onModifykPwd() {
    if (this.state.pwdNew1 != this.state.pwdNew2) {
      Toast.info('两次密码输入不一致', 1);
    }
    else {
      if (this.state.pwdNew1.length != 6 || this.state.pwdOld.length != 6) {
        Toast.info('请输入六位有效密码', 1);
      }
      else {
        const pwdNew = Base64.encode(this.state.pwdNew1);
        const pwdOld = Base64.encode(this.state.pwdOld);
        const callbacek = (resp) => {
          if (resp.IsSucceed) {
            Toast.info('密码修改成功', 1, () => { this.push('checkPwd'); });
          }
          else
            Toast.info(resp.ErrorMsg.msg, 3);
        };
        stores.SetPwdStore.ModifyWagePwd(pwdOld, pwdNew, callbacek);
      }
    }
  }
}

export default SetPwd;
