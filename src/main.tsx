import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./app/store.ts";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Provider store={store}>
         <NextUIProvider>
            <BrowserRouter>
               <Routes>
                  <Route path="/*" element={<App />} />
               </Routes>
            </BrowserRouter>
         </NextUIProvider>
      </Provider>
   </React.StrictMode>
);
