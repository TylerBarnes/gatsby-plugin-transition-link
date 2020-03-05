import { createContext } from 'react'

const Context = createContext()
const { Provider, Consumer } = Context

const publicContext = createContext()
const { Provider: PublicProvider, Consumer: PublicConsumer } = publicContext

export {
	Provider,
	Consumer,
	Context,
	PublicProvider,
	PublicConsumer,
	publicContext,
}
