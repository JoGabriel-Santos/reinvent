import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/details" element={<Details/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default App;