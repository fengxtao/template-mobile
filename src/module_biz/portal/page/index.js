import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {history, CacheSwitch, Switch,stores} from 'tplusfx';
import './style.less';

export default class portal extends Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
      //因为首页不缓存所以在此处理
  }

  render() {
      return (
        <div>
          index
        </div>
      )
  }
}

