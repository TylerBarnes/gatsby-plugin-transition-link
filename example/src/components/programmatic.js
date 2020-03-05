import { TimelineMax } from 'gsap'

export const fade = ({ exit: { length }, node, direction }) => {
  const duration = direction === 'out' ? length + length / 4 : length
  const opacity = direction === 'in' ? 1 : 0
  const scrollTop =
    (document.scrollingElement && document.scrollingElement.scrollTop) ||
    document.body.scrollTop ||
    window.pageYOffset

  const holdPosition =
    direction === 'out'
      ? {
          overflowY: 'hidden',
          height: '100vh',
          scrollTop: scrollTop,
        }
      : {}

  return new TimelineMax()
    .set(node, holdPosition)
    .fromTo(node, duration, { opacity: !opacity }, { opacity: opacity })
}
