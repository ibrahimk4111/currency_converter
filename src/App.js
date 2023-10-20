import React from "react";
import "./Styles/App.css";
import { App1 } from "./Components/App.1";
import ConverterForm from "./Components/ConverterForm";
import ContextApi from "./Components/ContextApi";

const App = () => {
  return (
    <>
      <App1 />
      <ContextApi>
        <ConverterForm />
      </ContextApi>
    </>
  );
};

export default App;
