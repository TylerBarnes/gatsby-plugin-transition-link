import { useRef, useContext, useEffect, useState } from 'react'

import { publicContext } from '../context/createTransitionContext'

function TransitionObserver(props) {
    const innerRef = useRef(null)
    const context = useContext(publicContext)
    const [contextState, updateContextState] = useState(null)
    const [observing, setObserving] = useState(false)

    const observerSupport = 'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype

    useEffect(() => {
        if (innerRef && innerRef.current) {
            let observer;

            const options = {
                threshold: 1
            };

            observer = new IntersectionObserver(observed => {
                const [thisObserved] = observed
                setObserving(!!thisObserved.intersectionRatio)
            }, options);
            observer.observe(innerRef.current);

            return () => observer.unobserve(innerRef.current)
        }
    }, [innerRef])

    useEffect(() => {
        if (!observerSupport || props.forceRender) {
            // always update the context if there is no intersection
            // observer support or if the prop forceRender is set to true
            updateContextState(context)
        } else if (observing) {
            updateContextState(context)
        }
    }, [context.transitionStatus, innerRef, observing])

  return (
    props.children(contextState, innerRef)
  )
}

export default TransitionObserver

