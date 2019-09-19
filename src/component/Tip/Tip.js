 // tips组件，提示成功或错误

import React, {Component} from 'react';
import DisplayUtil from '../../util/DisplayUtil';
import {platform_browser} from '../../plugin/platform';
import PropTypes from 'prop-types';
import './tip.less';


/**
 * @public
 * @param {object} obj -tab传入对象
 * @param {string} obj.type -提示的类型，success/error
 * @param {string} obj.content -提示的内容
 * @returns {reactComponent}
 */
class Tip extends Component {

    static propTypes = {
        config: PropTypes.shape({
            type: PropTypes.string,
            content: PropTypes.string
        })
    };

    tipErrorStyle = {
        backgroundColor:'#ff9630',
        opacity:0.8
    };

    tipStyle = {
        top: platform_browser() ? DisplayUtil.px2rem(43) : 0
    };

    tipSuccessStyle = {
        backgroundColor:'#84cafa',
        opacity:0.8
    };

    render() {
        let {type, content} = this.props.config;
        let tipStyle;

        if (type === 'success'){
            tipStyle = Object.assign({},this.tipStyle,this.tipSuccessStyle);
        }
        else if (type === 'error'){
            tipStyle = Object.assign({},this.tipStyle,this.tipErrorStyle);
        }

        return (
            <div className="app-tip" style={tipStyle}>
                {content}
            </div>
        );

    }
}

export default Tip;
