import React from "react";

const { Provider, Consumer } = React.createContext();
const {
  Provider: PublicProvider,
  Consumer: PublicConsumer
} = React.createContext();

export { Provider, Consumer, PublicProvider, PublicConsumer };
