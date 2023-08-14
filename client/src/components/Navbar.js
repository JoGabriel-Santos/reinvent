import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [bgOpacity, setBgOpacity] = useState(0);

    const navigate = useNavigate();

    function handleMenuClick() {
        const userLogged = JSON.parse(localStorage.getItem("UserInfo"));

        if (userLogged) {
            setShowMenu(!showMenu);

        } else {
            toggleShowLogin();
        }
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
                    <div className="header-user--cart">
                        <div className="cart-icon">
                            <ion-icon name="cart-outline" size="large"></ion-icon>
                        </div>

                        <div className="cart-quantity">
                            <span>2</span>
                        </div>

                        <div className="cart-info">
                            <h6 className="cart-name">Meu carrinho</h6>
                            <div className="cart-payment">
                                <span>R$ 64.00</span>
                                <ion-icon name="caret-down-outline" size="small"></ion-icon>
                            </div>
                        </div>
                    </div>

                    <div className="header-user--info" onClick={handleMenuClick}>
                        <img className="header-user--menu" src={require("../util/icons/menu.png")} alt=""/>
                        <img className="header-user--profile" src={require("../util/icons/profile.png")} alt=""/>
                    </div>

                    {
                        showMenu && (
                            <div className="header-user--options">
                                <ul className="options-list">
                                    <li className="option">
                                        <ion-icon name="apps-outline" size="small"></ion-icon>
                                        <span>Painel</span>
                                    </li>

                                    <a href="/account">
                                        <li className="option">
                                            <ion-icon name="person-outline" size="small"></ion-icon>
                                            <span>Detalhes da conta</span>
                                        </li>
                                    </a>

                                    <li className="option">
                                        <ion-icon name="exit-outline" size="small"></ion-icon>
                                        <span>Logout</span>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </header>

            <section className="section-categories">
                <ul className="section-categories--list">
                    <li className="categories-list">Home</li>
                    <li className="categories-list">Coleções</li>
                    <li className="categories-list">PSD</li>
                    <li className="categories-list">PNG</li>
                    <li className="categories-list">Fotos</li>
                    <li className="categories-list">Vetores</li>
                    <li className="categories-list">Texturas</li>
                    <li className="categories-list">Vídeos</li>
                    <li className="categories-list">Apresentações</li>
                    <li className="categories-list">Mockups</li>
                    <li className="categories-list">
                        Mais categorias
                        <ion-icon name="chevron-down-outline" size="small"></ion-icon>
                    </li>
                </ul>
            </section>

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