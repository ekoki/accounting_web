import { ChakraProvider  } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import theme from "./theme/theme"
import { Router } from "./router/Router"

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  )
}