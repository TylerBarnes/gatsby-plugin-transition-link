// This was made using the code borrowed from this beautiful codepen!
// https://codepen.io/osublake/pen/eNrQqV?editors=0010
import React, { Component } from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { TimelineMax, Power1 } from "gsap";
import convert from 'color-convert';

export default class PaintDrip extends Component {
  constructor(props) {
    super(props);

    this.createRipple = this.createRipple.bind(this);
  }

  createRipple = ({length}, event, hex, color) => {
    const body = document.body;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const piTwo = Math.PI * 2;

    let rgb = hex ? convert.hex.rgb(hex).join(',') : "0,0,255";
    rgb = color ? convert.keyword.rgb(color) : rgb;

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
    const rippleEnterTime = seconds;
    
    new TimelineMax({ onUpdate: drawRipple, onComplete: () => removeCanvas(seconds / 3) })  
      .to(ripple, seconds / 4, { alpha: 1,  })
      .to(ripple, seconds - seconds / 3, { radius: radius, ease: Power1.easeIn }, 0)
      .to(canvas, seconds / 3, {x: "100%", ease: Power1.easeIn}, `+=.2`);
    
    function drawRipple() {  
      ctx.clearRect(0, 0, vw, vh);  
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, piTwo, false);
      const fillStyle = `rgba(${rgb},${ripple.alpha})`;
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }

    window.addEventListener("resize", onResize);

    function removeCanvas(wait = 0) {
      setTimeout(() => {
        body.removeChild(canvas);
      }, wait);
    }

    function onResize() {    
      vw = canvas.width  = window.innerWidth;
      vh = canvas.height = window.innerHeight;
    }
  }

  getDirection = (from) => {
    switch (from) {
      case "left":
        return {xPercent: -5}
      case "right":
        return {xPercent: 5}
      case "top":
        return {yPercent: -5}
      case "bottom":
        return {yPercent: 5}
      default:
        return {}
    }
  }

  slideIn = ({length}, node, from) => {
    const seconds = length / 1000;

    new TimelineMax().from(node, seconds, {...this.getDirection(from), ease: Power1.easeOut});
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
        exit={{ 
          length: 1000, 
          trigger: (exit, node, e) => this.createRipple(exit, e, props.hex, props.color) 
          }}
        entry={{ 
          delay: 800,
          length: 600,
          trigger: (entry, node) => this.slideIn(entry, node, 'left')
          }} 
        >
          {props.children}
        </TransitionLink>
      </>;
  }
}
