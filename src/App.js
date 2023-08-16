import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Account from "./pages/Account";
import Product from "./pages/Product";

function App() {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/details" element={<Details/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/product" element={<Product/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default App;