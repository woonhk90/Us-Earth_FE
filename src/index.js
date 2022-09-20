import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/config/configStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import Loading from './components/etc/Loading';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <GlobalStyle />
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </>
);
