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
                    <Route path="/detalhes-do-produto" exact component={Details}/>
                    <Route path="/configuracao-de-conta" exact component={Account}/>
                    <Route path="/novo-produto" exact component={Product}/>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default App;