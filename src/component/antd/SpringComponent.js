import React  from 'react';
import { TransitionMotion, spring } from 'react-motion'


class SpringComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show:false
    }
  }


  willEnter(styleThatEnter) {
   return { scale: 0 }
  }

  willLeave(styleThatLeft) {
    return { scale: spring(0) }
  }

  componentDidMount() {
    this.setState({
      show: true
    })
  }


  render(){
    return(
      <TransitionMotion styles={this.state.show ? [{
          key: 'test',
          style: { scale: spring(1) }
        }] : []}
          willEnter={this.willEnter}
          willLeave={this.willLeave}>
          {inStyles => (
              inStyles[0] ? (
                <div style = {{transform: `scale(${inStyles[0].style.scale},${inStyles[0].style.scale})`}}>{this.props.children}</div>
              ) : null
          )}
        </TransitionMotion>
    )
  }
}

export default SpringComponent;
