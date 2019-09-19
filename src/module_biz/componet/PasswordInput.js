/* 
* @Author: yanzla@chanjet.com  
* @Date: 2019-08-26 18:47:55   
*/

import React, { Component } from "react";
import tools from '../../util/tools';
import './PasswordInput.less';

class PasswordInput extends Component {

    constructor(props) {
        super(props);
        this.state = { showPwd: false };
    }

    render() {
        const { title, placeholder, pwdValue, onPwdChange } = this.props;

        return <div className='passwordDiv'>
            <div className='passwordFlex'>
                <div className='passwordTitle'>{title}</div>
                <div className='passwordInput'>
                    {this.state.showPwd ?
                        <input type='text' className='inputNone' placeholder={placeholder} defaultValue={pwdValue} value={pwdValue} maxLength='6' pattern='[0-9]*' onChange={onPwdChange} /> :
                        <input type='text' className='inputSecurity' placeholder={placeholder} defaultValue={pwdValue} value={pwdValue} maxLength='6' pattern='[0-9]*' onChange={onPwdChange} />
                    }
                </div>
                <div className={this.state.showPwd ? 'kejian' : 'bukejian'} onClick={e => {
                    tools.preventEvent(e);

                    if (this.state.showPwd)
                        this.setState({ showPwd: false })
                    else
                        this.setState({ showPwd: true })
                }}>
                </div>
            </div>
        </div>
    }
}

export default PasswordInput;