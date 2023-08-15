import React, { useEffect, useState } from "react";
import * as API from "../api/index";

const Account = () => {

    const [userInfo, setUserInfo] = useState(
        {
            userName: "",
            displayName: "",
            newEmail: "",
            curEmail: "",
            newPassword: "",
            curPassword: "",
            profilePicture: ""
        }
    );

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setUserInfo({ ...userInfo, profilePicture: reader.result.toString() });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data } = await API.changeUserInfo(userInfo);

        localStorage.setItem("UserInfo", JSON.stringify(data.result));
    };

    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem("UserInfo"));

        setUserInfo(
            {
                ...userInfo,
                userName: userLogged.userName,
                displayName: userLogged.displayName,
                newEmail: userLogged.email,
                curEmail: userLogged.email,
                profilePicture: userLogged.profilePicture
            }
        );
    }, []);

    return (
        <section className="section-forms">
            <div className="section-forms--container">
                <h2 className="form-title">Conta</h2>
                <h6 className="form-descr">Atualize os detalhes do seu perfil abaixo:</h6>

                <div className="cta-form-picture">
                    <img
                        src={userInfo.profilePicture !== "" ? userInfo.profilePicture : require("../util/icons/profile.png")}
                        alt="Profile picture"
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
                                onChange={event => handleProfilePictureChange(event)}
                            />
                        </label>

                        <label htmlFor="picture">Envie uma imagem JPG ou PNG</label>
                    </div>
                </div>

                <form className="cta-form" action="">
                    <div className="cta-form-name">
                        <div className="cta-form-input">
                            <label htmlFor="username">Nome completo</label>
                            <input
                                id="username"
                                type="text"
                                value={userInfo.userName}
                                onChange={(event) => setUserInfo({ ...userInfo, userName: event.target.value })}
                            />
                        </div>

                        <div className="cta-form-input">
                            <label htmlFor="display-name">Nome de exibição</label>
                            <input
                                id="display-name"
                                type="text"
                                value={userInfo.displayName}
                                onChange={(event) => setUserInfo({ ...userInfo, displayName: event.target.value })}
                            />
                        </div>
                    </div>

                    <div className="cta-form-input">
                        <label htmlFor="email">Endereço de e-mail</label>
                        <input
                            id="email"
                            type="email"
                            value={userInfo.newEmail}
                            onChange={(event) => setUserInfo({ ...userInfo, newEmail: event.target.value })}
                        />
                    </div>

                    <div className="cta-form-input">
                        <label htmlFor="password">Nova senha</label>
                        <input
                            id="new-password"
                            type="password"
                            value={userInfo.newPassword}
                            onChange={(event) => setUserInfo({ ...userInfo, newPassword: event.target.value })}
                        />
                    </div>

                    <div className="cta-form-input">
                        <label htmlFor="password">Confirme sua senha atual</label>
                        <input
                            id="password"
                            type="password"
                            value={userInfo.curPassword}
                            onChange={(event) => setUserInfo({ ...userInfo, curPassword: event.target.value })}
                        />
                    </div>
                </form>

                <div className="info--button account--save-button" onClick={handleSubmit}>
                    Salvar alterações
                </div>
            </div>
        </section>
    );
};

export default Account;