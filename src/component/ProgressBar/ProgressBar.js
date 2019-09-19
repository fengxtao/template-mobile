import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.less';


class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: ''
        }
    }
    static PropTypes = {
       width: PropTypes.number.isRequired
    }

    _getStyles() {
      const {width,beginColor='#6ea1ff',endColor='lightgray'} = this.props;
      return {
          width: width,
          background:'-webkit-gradient(linear, 0% 0%, 100% 0%, from('+beginColor+'), to('+endColor+'))'
      }
    }

    render() {
        return (
            <div className="ProgressBar">
              <p className="finish" style={this._getStyles()}></p>
            </div>
        );
    }
}
export default ProgressBar;
