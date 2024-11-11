import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import "./index.css";
import App from "./App";
import store from "./store";
import { ChakraProvider } from "@chakra-ui/react";


const container = document.getElementById('root')

const root = createRoot(container);
root.render(
<Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
)


