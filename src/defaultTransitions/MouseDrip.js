import React, { Component } from 'react'
import TransitionLink, {TransitionPortal} from 'gatsby-plugin-transition-link'
import {TweenLite} from 'gsap';


export function Drip() {
  return (
    <div 
      style={{
        position: "fixed", 
        left:"50%", 
        top:"50%", 
        width: '10px', 
        height: "10px", 
        background: "black", 
        borderRadius: "50%"
      }}
      />
  )
}


export default class MouseDrip extends Component {
  constructor(props) {
    super(props)

    this.drip = React.createRef();
    this.expand = this.expand.bind(this);
  }

  expand = () => {

  }

  render() {
    return (
      <>
        <TransitionLink to={props.to}>
          {props.children}
        </TransitionLink>

        <TransitionPortal>
          <Drip innerRef={this.drip} />
        </TransitionPortal>
      </>
    )
  }
}
