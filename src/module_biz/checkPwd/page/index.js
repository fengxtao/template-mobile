import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';
import { observer, inject } from 'mobx-react';
import { Icon, Button, Toast, Modal } from 'antd-mobile';
import NavPage from '../../../routers/nav/NavPage';
import { destroyApp } from 'tplus-mobile-plugin-gzq';
import './index.less';
import TopBanner from '../../componet/TopBanner';
import PasswordInput from '../../componet/PasswordInput';
import Base64 from 'base-64';
import tools from "../../../util/tools";


// @inject('WagePwdStore')
@NavPage
@observer
class CheckPwd extends Component {

  constructor(props) {
    super(props);
    stores.WagePwdStore.init();
    this.state = {
      WagePwd: '',
      modelShow: false
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
        <TopBanner></TopBanner>
        <div>
          <div className='welcomeDiv'>欢迎使用薪资查询</div>
          <PasswordInput title='密码' pwdValue={this.state.WagePwd} placeholder='请输入6位数字查询密码'
            onPwdChange={e => { this.setState({ WagePwd: e.target.value }) }}></PasswordInput>
          <div>
            <Button className='btnOK' onClick={e => this.onCheckPwd()}>确定</Button>
          </div>
          <div className='pwdOption'>
            <div onClick={e =>{ tools.preventEvent(e); this.onModelShow();}}>忘记密码</div>
            <div onClick={e =>{ tools.preventEvent(e); this.push('setPwd');}}>修改密码</div>
          </div>
          <Modal visible={this.state.modelShow}
            transparent
            maskClosable={false}
            title="注意"
            footer={[{ text: '知道了', onPress: () => { this.onModelClose(); } }]}>
              <div className='forgePwd'>请联系管理员重置密码！</div>
          </Modal>
        </div>
      </div>
    );
  }

  onModelShow() {
    this.setState({ modelShow: true });
  }

  onModelClose() {
    this.setState({ modelShow: false });
  }

  onCheckPwd() {

    if (this.state.WagePwd.length != 6) {
      Toast.info('请输入六位有效密码', 1);
    }
    else {
      const pwd = Base64.encode(this.state.WagePwd);
      const callbacek = (resp) => {
        if (resp.IsSucceed) {
          this.push('salaryList',resp.Data);
        }
        else
          Toast.info(resp.ErrorMsg.Msg, 3);
      };
      stores.WagePwdStore.CheckWagePwd(pwd, callbacek);
    }
  }
}

export default CheckPwd;
