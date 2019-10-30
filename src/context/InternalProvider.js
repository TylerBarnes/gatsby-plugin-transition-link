import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './createTransitionContext';
import getPagesPromises from '../utils/getPagesPromises';

class InternalProvider extends Component {
  constructor(props) {
    super(props);
    const prefersReducedMotion =
      typeof window !== `undefined` &&
      window.matchMedia('(prefers-reduced-motion: reduce)');

    this.state = {
      inTransition: false,
      transitionIdHistory: [],
      disableAnimation: prefersReducedMotion.matches,
      // event
      e: false,
      // exit
      exitDelay: 0,
      exitLength: 0,
      exitState: {},
      exitProps: {},
      exitTrigger: false,
      // entry
      entryDelay: 0,
      entryLength: 0,
      entryState: {},
      entryProps: {},
      entryTrigger: false,
      // state updates
      updateContext: obj => this.setState(obj)
    };

    prefersReducedMotion.addEventListener('change', () => {
      this.setState({ disableAnimation: prefersReducedMotion.matches });
    });
  }

  componentDidMount() {
    this.state.updateContext(getPagesPromises());
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

InternalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalProvider;
