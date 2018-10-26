import { createContext } from "react";

const { Provider, Consumer } = createContext();
const { Provider: PublicProvider, Consumer: PublicConsumer } = createContext();

export { Provider, Consumer, PublicProvider, PublicConsumer };
