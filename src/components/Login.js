import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as API from "../api";

const Login = (props) => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState({
        userNameError: "",
        emailError: "",
        passwordError: "",
    });

    const handleAuthentication = async () => {
        if (!loginInfo.userName && !isLoggingIn) {
            setErrorMessage({
                ...errorMessage,
                userNameError: "Preencha o campo de usuário para continuar...",
            });
            return;
        }

        if (!loginInfo.email) {
            setErrorMessage({
                ...errorMessage,
                emailError: "Preencha o campo de email para continuar...",
            });
            return;
        }

        if (!loginInfo.password) {
            setErrorMessage({
                ...errorMessage,
                passwordError: "Preencha o campo de senha para continuar...",
            });
            return;
        }

        try {
            if (isLoggingIn) {
                const { data } = await API.signin(loginInfo);
                localStorage.setItem("UserInfo", JSON.stringify(data.result));

            } else {
                const { data } = await API.signup(loginInfo);
                localStorage.setItem("UserInfo", JSON.stringify(data.result));
            }

            props.closeLogin();

        } catch (error) {
            handleAuthenticationError(error.response ? error.response.status : 500);
        }
    };

    const handleAuthenticationError = (statusCode) => {
        let emailError = "";
        let passwordError = "";

        switch (statusCode) {
            case 400:
                emailError = "Usuário já registrado...";
                break;

            case 404:
                emailError = "Usuário não encontrado...";
                break;

            case 401:
                passwordError = "Senha incorreta...";
                break;

            default:
                console.log("Erro durante a autenticação...");
                break;
        }

        setErrorMessage({
            emailError,
            passwordError,
        });
    };

    const handleToggleIsLoggingIn = () => {
        setLoginInfo({
            userName: "",
            email: "",
            password: "",
        });
        setErrorMessage({
            userNameError: "",
            emailError: "",
            passwordError: "",
        });
        setIsLoggingIn((prevIsLoggingIn) => !prevIsLoggingIn);
        setPasswordVisible(false);
    };

    const handleUserNameFocus = () => {
        setErrorMessage({
            ...errorMessage,
            userNameError: "",
        });
    };

    const handleEmailFocus = () => {
        setErrorMessage({
            ...errorMessage,
            emailError: "",
        });
    };

    const handlePasswordFocus = () => {
        setErrorMessage({
            ...errorMessage,
            passwordError: "",
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailBlur = (event) => {
        const emailValue = event.target.value;
        if (!validateEmail(emailValue)) {
            setErrorMessage({
                ...errorMessage,
                emailError: "Email inválido...",
            });
        }
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
                            <div
                                className={`auth-button ${
                                    isLoggingIn && "selected-button"
                                }`}
                                onClick={!isLoggingIn ? handleToggleIsLoggingIn : null}
                            >
                                <ion-icon name="lock-open-outline"></ion-icon>
                                <span>ENTRAR</span>
                            </div>
                            <div
                                className={`auth-button ${
                                    !isLoggingIn && "selected-button"
                                }`}
                                onClick={isLoggingIn ? handleToggleIsLoggingIn : null}
                            >
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
                            {!isLoggingIn && (
                                <div
                                    className={`cta-form-input ${
                                        errorMessage.userNameError !== ""
                                            ? "cta-form-error"
                                            : ""
                                    }`}
                                >
                                    <div className="label">
                                        <label htmlFor="username">Usuário</label>
                                        <label htmlFor="username">
                                            {errorMessage.userNameError}
                                        </label>
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        value={loginInfo.userName}
                                        onChange={(event) =>
                                            setLoginInfo({
                                                ...loginInfo,
                                                userName: event.target.value,
                                            })
                                        }
                                        onFocus={handleUserNameFocus}
                                    />
                                </div>
                            )}
                            <div
                                className={`cta-form-input ${
                                    errorMessage.emailError !== ""
                                        ? "cta-form-error"
                                        : ""
                                }`}
                            >
                                <div className="label">
                                    <label htmlFor="email">Email</label>
                                    <label htmlFor="email">
                                        {errorMessage.emailError}
                                    </label>
                                </div>
                                <input
                                    id="email"
                                    type="text"
                                    value={loginInfo.email}
                                    onChange={(event) =>
                                        setLoginInfo({
                                            ...loginInfo,
                                            email: event.target.value,
                                        })
                                    }
                                    onFocus={handleEmailFocus}
                                    onBlur={handleEmailBlur}
                                />
                            </div>
                            <div
                                className={`cta-form-input ${
                                    errorMessage.passwordError !== ""
                                        ? "cta-form-error"
                                        : ""
                                }`}
                            >
                                <div className="label">
                                    <label htmlFor="password">Senha</label>
                                    <label htmlFor="password">
                                        {errorMessage.passwordError}
                                    </label>
                                </div>
                                <div className="password-input-container">
                                    <input
                                        className="input-password"
                                        id="password"
                                        type={passwordVisible ? "text" : "password"}
                                        value={loginInfo.password}
                                        onChange={(event) =>
                                            setLoginInfo({
                                                ...loginInfo,
                                                password: event.target.value,
                                            })
                                        }
                                        onFocus={handlePasswordFocus}
                                    />
                                    <span
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? (
                                            <ion-icon name="eye-off-outline"></ion-icon>
                                        ) : (
                                            <ion-icon name="eye-outline"></ion-icon>
                                        )}
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
                            <div
                                className="authentication-button"
                                onClick={handleAuthentication}
                            >
                                ENTRAR
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Login;