import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Login from "./Login";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [bgOpacity, setBgOpacity] = useState(0)

    const location = useLocation();

    function handleMenuClick() {
        setShowMenu(!showMenu);
    }

    function toggleShowLogin() {
        setShowLogin(!showLogin);

        if (showLogin) {
            setBgOpacity(0);

        } else {
            setBgOpacity(0.6);
        }
    }

    return (
        <React.Fragment>
            <header className="header">
                <a href="">
                    <img className="logo" src={require("../util/images/logo.png")} alt=""/>
                </a>

                <div className="header-options">
                    <input className="header-options--input" placeholder="Pesquise alguma coisa" type="text"/>

                    <div className="header-options--search">
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
                </div>

                <div className="header-user">
                    <h4 className="header-user--home">Torne-se Premium</h4>

                    <ion-icon name="star-outline"></ion-icon>

                    <div className="header-user--info" onClick={handleMenuClick}>
                        <img className="header-user--menu" src={require("../util/icons/menu.png")} alt=""/>
                        <img className="header-user--profile" src={require("../util/icons/profile.png")} alt=""/>
                    </div>

                    {
                        showMenu && (
                            <div className="header-user--options">
                                <ul className="options-list">
                                    <li className="option" onClick={toggleShowLogin}>Log in</li>
                                    <li className="option">Sign up</li>
                                    <li className="option">Airbnb your home</li>
                                    <li className="option">Host an experience</li>
                                    <li className="option">Help</li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </header>

            {
                showLogin && <Login closeLogin={toggleShowLogin}/>
            }

            <div
                style={{
                    backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
                    position: "fixed",
                    pointerEvents: showLogin ? "auto" : "none",
                    transition: "background-color .4s ease-in-out",
                    zIndex: "999",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />

        </React.Fragment>
    )
}

export default Navbar;