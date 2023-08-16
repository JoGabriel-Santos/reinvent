import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/details" exact component={Details}/>
                    <Route path="/account" exact component={Account}/>
                    <Route path="/product" exact component={Product}/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default App;