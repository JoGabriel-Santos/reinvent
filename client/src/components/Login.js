import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as API from "../api/index";

const Login = (props) => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuthentication = async () => {
        const userInfo = { name, email, password };

        if (isLoggingIn) {
            const { data } = await API.signin(userInfo);
            localStorage.setItem("UserInfo", JSON.stringify(data.result));

        } else {
            const { data } = await API.signup(userInfo);
            localStorage.setItem("UserInfo", JSON.stringify(data.result));
        }
    }

    const handleNameChange = (text) => {
        setName(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleToggleIsLoggingIn = () => {
        setName("");
        setEmail("");
        setPassword("");

        setIsLoggingIn(prevIsLoggingIn => !prevIsLoggingIn);
    }

    return (
        <AnimatePresence>
            <motion.div
                className="login-container"
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: "100vh", opacity: 0 }}
                exit={{ y: "100vh", opacity: 0 }}
                transition={{ duration: 0.5 }}
            >

                <div className="login-container--content">
                    <div className="content--header">
                        <div className="auth-buttons">
                            <div className={`auth-button ${isLoggingIn && "selected-button"}`}
                                 onClick={!isLoggingIn ? handleToggleIsLoggingIn : null}>

                                <ion-icon name="lock-open-outline"></ion-icon>
                                <span>ENTRAR</span>
                            </div>

                            <div className={`auth-button ${!isLoggingIn && "selected-button"}`}
                                 onClick={isLoggingIn ? handleToggleIsLoggingIn : null}>

                                <ion-icon name="person-outline"></ion-icon>
                                <span>CADASTRE-SE</span>
                            </div>
                        </div>

                        <img
                            className="header-close"
                            onClick={props.closeLogin}
                            src={require("../util/icons/close.png")}
                            alt=""
                        />
                    </div>

                    <div className="content--user">
                        <h1 className="user-title">Bem-vindo ao Reinvent 360</h1>

                        <div className="content--authentication">
                            {
                                !isLoggingIn &&
                                <div className="authentication-input">
                                    <input
                                        className="header-options--input"
                                        placeholder="Nome"
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                            }

                            <div className="authentication-input">
                                <input
                                    className="header-options--input"
                                    placeholder="E-mail"
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="authentication-input">
                                <input
                                    className="header-options--input"
                                    placeholder="Senha"
                                    type="text"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>

                            <div className="authentication-button" onClick={() => handleAuthentication()}>
                                ENTRAR
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Login;