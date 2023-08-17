import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as API from "../api";

const Login = (props) => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [loginInfo, setLoginInfo] = useState(
        {
            userName: "",
            email: "",
            password: ""
        }
    );

    const handleAuthentication = async () => {
        if (isLoggingIn) {
            const { data } = await API.signin(loginInfo);
            localStorage.setItem("UserInfo", JSON.stringify(data.result));

        } else {
            const { data } = await API.signup(loginInfo);
            localStorage.setItem("UserInfo", JSON.stringify(data.result));
        }

        props.closeLogin();
    }

    const handleToggleIsLoggingIn = () => {
        setLoginInfo({ userName: "", email: "", password: "" });
        setIsLoggingIn(prevIsLoggingIn => !prevIsLoggingIn);
        setPasswordVisible(false);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

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
                                <div className="cta-form-input">
                                    <label htmlFor="username">Usuário</label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={loginInfo.userName}
                                        onChange={(event) => setLoginInfo({ ...loginInfo, userName: event.target.value })}
                                    />
                                </div>
                            }

                            <div className="cta-form-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    value={loginInfo.email}
                                    onChange={(event) => setLoginInfo({ ...loginInfo, email: event.target.value })}
                                />
                            </div>

                            <div className="cta-form-input">
                                <label htmlFor="password">Senha</label>
                                <div className="password-input-container">
                                    <input
                                        className="input-password"
                                        id="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        value={loginInfo.password}
                                        onChange={(event) => setLoginInfo({ ...loginInfo, password: event.target.value })}
                                    />
                                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                                        {
                                            passwordVisible
                                                ?
                                                <ion-icon name="eye-off-outline"></ion-icon>
                                                :
                                                <ion-icon name="eye-outline"></ion-icon>
                                        }
                                    </span>
                                </div>

                                <div className="password-options">
                                    <div className="remember-me">
                                        <ion-icon name="square-outline"></ion-icon>
                                        Lembrar-me
                                    </div>

                                    <h5>Esqueceu a senha?</h5>
                                </div>
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