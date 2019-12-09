import { createContext } from 'react'

const { Provider, Consumer } = createContext()
const publicContext = createContext()
const { Provider: PublicProvider, Consumer: PublicConsumer } = publicContext

export { Provider, Consumer, PublicProvider, PublicConsumer, publicContext }
