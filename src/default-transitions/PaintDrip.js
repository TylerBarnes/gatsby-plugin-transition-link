// This was made using the code borrowed from this beautiful codepen!
// https://codepen.io/osublake/pen/eNrQqV?editors=0010
import React, { Component } from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { TimelineMax, Power0 } from "gsap";
import convert from 'color-convert';

export default class PaintDrip extends Component {
  constructor(props) {
    super(props);

    this.createRipple = this.createRipple.bind(this);
  }

 createRipple = ({length}, event, hex) => {
    const body = document.body;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const piTwo = Math.PI * 2;
    const rgb = hex ? convert.hex.rgb(hex).join(',') : "0,0,255";

    console.log(rgb)

    canvas.style.zIndex = 10000;
    canvas.style.position = "fixed";

    let vw = canvas.width  = window.innerWidth;
    let vh = canvas.height = window.innerHeight;
      
    body.appendChild(canvas);
      
    // Event coords
    const x = event.clientX;
    const y = event.clientY; 
    
    // Delta - difference between event and farthest corner
    const dx = x < vw / 2 ? vw - x : x;
    const dy = y < vh / 2 ? vh - y : y;
    
    const radius = Math.sqrt(dx * dx + dy * dy);
      
    const ripple = {
      alpha: 0,
      radius: 0,
      x: x,
      y: y
    };

    const seconds = length / 1000;
    const rippleEnterTime = seconds * .8;
    const rippleFadeTime = seconds * .2;
    
    new TimelineMax({ onUpdate: drawRipple, onComplete: removeCanvas })  
      .to(ripple, rippleEnterTime, { alpha: 1, radius: radius })
      .to(ripple, rippleFadeTime, { alpha: 0 }, seconds - rippleFadeTime);
    
    function drawRipple() {  
      ctx.clearRect(0, 0, vw, vh);  
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, piTwo, false);
      const fillStyle = `rgba(${rgb},${ripple.alpha})`;
      console.log(fillStyle)
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }

    window.addEventListener("resize", onResize);

    function removeCanvas() {
      body.removeChild(canvas);
    }

    function onResize() {    
      vw = canvas.width  = window.innerWidth;
      vh = canvas.height = window.innerHeight;
    }
}

  
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    this.vw = this.canvas.width = window.innerWidth;
    this.vh = this.canvas.height = window.innerHeight;
  };

  render() {
    const { props } = this;

    return <>
        <TransitionLink 
        to={props.to} 
        entry={{ delay: 400 }} 
        exit={{ 
          length: 700, 
          trigger: (exit, node, e) => this.createRipple(exit, e, props.hex) 
          }}
        >
          {props.children}
        </TransitionLink>
      </>;
  }
}
