import React  from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import './TransitionGroup.less'


class TransitionGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
        <ReactCSSTransitionGroup
          transitionName="transitionGroup"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.props.children}
        </ReactCSSTransitionGroup>
    )
  }
}

export default TransitionGroup;
