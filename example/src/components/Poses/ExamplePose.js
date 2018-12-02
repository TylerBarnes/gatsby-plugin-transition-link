import React from 'react'
import posed from 'react-pose'
import { TransitionLink, TransitionState } from 'gatsby-plugin-transition-link'

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

export class Example extends React.Component {
  render() {
    const { props } = this

    return (
      <>
        <TransitionState>
          {({ transitionStatus: status }) => {
            return (
              <TransitionLink
                to={props.to}
                exit={{ length: 0.5 }}
                entry={{ delay: 0.5 }}
              >
                <Box
                  className="box"
                  pose={
                    ['entering', 'entered'].includes(status)
                      ? 'visible'
                      : 'hidden'
                  }
                />
              </TransitionLink>
            )
          }}
        </TransitionState>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .box {
                width: 100px;
                height: 100px;
                background: ${props.bg ? props.bg : '#ff1c68'};
                transform-origin: 50% 50%;
            }
        `,
          }}
        />
      </>
    )
  }
}
