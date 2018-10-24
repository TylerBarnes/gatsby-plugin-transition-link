import { navigate } from 'gatsby'

const triggerTransition = ({
  event,
  exitFor,
  updateExitTimeout,
  updateDelayNext,
  entryIn,
  to,
  entryState,
  exitFn,
}) => {
  event.preventDefault()

  updateExitTimeout(exitFor)
  updateDelayNext(entryIn)

  exitFn(exitFor)

  navigate(to, {
    state: entryState,
  })

  setTimeout(() => updateExitTimeout(0), exitFor)
  setTimeout(() => updateDelayNext(0), entryIn)
}

export { triggerTransition }
