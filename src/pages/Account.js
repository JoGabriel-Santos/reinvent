import React, { useEffect, useState } from "react";
import * as API from "../api";

const Account = () => {
    const [userInfo, setUserInfo] = useState({
        userName: "",
        newEmail: "",
        curEmail: "",
        profilePicture: "",
        newPassword: "",
        curPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isChangesSaved, setIsChangesSaved] = useState(false);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                profilePicture: reader.result.toString(),
            }));
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userInfo.curPassword) {
            setErrorMessage("Preencha este campo para continuar...");
            return;
        }

        try {
            const { data } = await API.changeUserInfo(userInfo);
            localStorage.setItem("UserInfo", JSON.stringify(data.result));
            setIsChangesSaved(true);

            setTimeout(() => {
                setIsChangesSaved(false);
            }, 2000);

        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage("Senha incorreta...");
            }
        }
    };

    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem("UserInfo"));

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            userName: userLogged.userName,
            newEmail: userLogged.email,
            curEmail: userLogged.email,
            profilePicture: userLogged.profilePicture || "",
        }));
    }, []);

    return (
        <section className="section-forms">
            <div className="section-forms--container">
                <h2 className="form-title">Conta</h2>
                <h6 className="form-descr">Atualize os detalhes do seu perfil abaixo:</h6>

                <div className="cta-form-picture">
                    <img
                        src={
                            userInfo.profilePicture !== ""
                                ? userInfo.profilePicture
                                : require("../util/icons/profile.png")
                        }
                        alt=""
                    />

                    <div className="image-upload">
                        <label className="file-input">
                            <span>
                                <ion-icon name="images-outline" size="small"></ion-icon>
                                Alterar foto do perfil
                            </span>
                            <input
                                id="file-input"
                                type="file"
                                className="input"
                                onChange={handleProfilePictureChange}
                            />
                        </label>

                        <label htmlFor="picture">Envie uma imagem JPG ou PNG</label>
                    </div>
                </div>

                <form className="cta-form" action="">
                    <div className="cta-form-name">
                        <div className="cta-form-input">
                            <label htmlFor="username">Nome de usuário</label>
                            <input
                                id="username"
                                type="text"
                                value={userInfo.userName}
                                onChange={(event) =>
                                    setUserInfo((prevUserInfo) => ({
                                        ...prevUserInfo,
                                        userName: event.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="cta-form-input">
                            <label htmlFor="email">Endereço de e-mail</label>
                            <input
                                id="email"
                                type="email"
                                value={userInfo.newEmail}
                                onChange={(event) =>
                                    setUserInfo((prevUserInfo) => ({
                                        ...prevUserInfo,
                                        newEmail: event.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className="cta-form-input">
                        <label htmlFor="password">Nova senha</label>
                        <input
                            id="new-password"
                            type="password"
                            value={userInfo.newPassword}
                            onChange={(event) =>
                                setUserInfo((prevUserInfo) => ({
                                    ...prevUserInfo,
                                    newPassword: event.target.value,
                                }))
                            }
                        />
                    </div>

                    <div
                        className={`cta-form-input ${
                            errorMessage !== "" ? "cta-form-error" : ""
                        }`}
                    >
                        <div className="label">
                            <label htmlFor="password">Confirme sua senha atual</label>
                            <label htmlFor="password">{errorMessage}</label>
                        </div>
                        <input
                            id="password"
                            type="password"
                            value={userInfo.curPassword}
                            onChange={(event) =>
                                setUserInfo((prevUserInfo) => ({
                                    ...prevUserInfo,
                                    curPassword: event.target.value,
                                }))
                            }
                            onFocus={() => setErrorMessage("")}
                        />
                    </div>
                </form>

                <div
                    className={`info--button account--save-button ${
                        isChangesSaved ? "saved" : ""
                    }`}
                    onClick={handleSubmit}
                >
                    {isChangesSaved ? "Alterações salvas" : "Salvar alterações"}
                </div>
            </div>
        </section>
    );
};

export default Account;