import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { shouldNavigate } from '../utils/shouldNavigate'
import { triggerTransition } from '../utils/triggerTransition'
import { Consumer } from '../context/createTransitionContext'

if (typeof forwardRef === 'undefined') {
	forwardRef = C => C
}

const TransitionLink = forwardRef(
	(
		{
			to,
			children,
			exit,
			entry,
			activeStyle,
			partiallyActive,
			style,
			className,
			activeClassName,
			state,
			onClick,
			trigger,
			replace,
			innerRef,
			preventScrollJump,
			samePageScroll,
			...rest
		},
		ref
	) => {
		return (
      <Consumer>
        {({ disableAnimation, ...context }) =>
          // If the user want to scroll to hash and from the same page, emulate scroll using <a> tag
          samePageScroll ? (
            <a
              href={to}
              style={style}
              className={className}
              activeClassName={activeClassName}
              ref={ref || innerRef}
              {...rest}
            >
              {children}
            </a>
          ) : (
            <Link
              style={style}
              activeStyle={activeStyle}
              className={className}
              activeClassName={activeClassName}
              partiallyActive={partiallyActive}
              onClick={event => {
                // If the user has set their browser or OS to prefers-reduced-motion
                // we should respect that.
                if (disableAnimation) {
                  return
                }

                const weShouldNavigate = shouldNavigate(event)

                if (weShouldNavigate) {
                  triggerTransition({
                    event,
                    to,
                    exit,
                    entry,
                    trigger,
                    replace,
                    preventScrollJump,
                    linkState: state,
                    ...context,
                  })
                }

                if (typeof onClick === 'function') {
                  onClick(event, weShouldNavigate)
                }
              }}
              to={to} // use gatsby link so prefetching still happens. this is prevent defaulted in triggertransition
              ref={ref || innerRef}
              {...rest}
            >
              {children}
            </Link>
          )
        }
      </Consumer>
    )
	}
)

TransitionLink.propTypes = {
	to: PropTypes.string.isRequired,
	exitLength: PropTypes.number,
	entryDelay: PropTypes.number,
	exitFn: PropTypes.func,
  entryState: PropTypes.object,
  samePageScroll: PropTypes.boolean,
}

TransitionLink.defaultProps = {
  samePageScroll: false,
}

export { TransitionLink }
