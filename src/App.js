import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./app.css";
import { Routes } from "./components/Routes";

const App = () => (
    <div className="App">
        <Router>
            <Routes />
        </Router>
    </div>
);

export default App;
