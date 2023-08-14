import React, { useState } from "react";

const Account = () => {

    const [userInfo, setUserInfo] = useState(
        {
            userName: "",
            displayName: "",
            email: "",
            password: "",
            profilePicture: ""
        }
    )

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setUserInfo({ ...userInfo, profilePicture: reader.result.toString() });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

    }

    return (
        <section className="section-account">
            <div className="section-account--container">
                <h2 className="account-title">Conta</h2>
                <h6 className="account-descr">Atualize os detalhes do seu perfil abaixo:</h6>

                <div className="cta-form-picture">
                    <img src={require("../util/images/profile.jpg")} alt=""/>

                    <div className="image-upload">
                        <label className="file-input">
                            <span>
                                <ion-icon name="images-outline" size="small"></ion-icon>
                                Alterar foto do perfil
                            </span>
                            <input className="input" type="file" id="file-input" onChange={() => console.log("")}/>
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
                            value={userInfo.email}
                            onChange={(event) => setUserInfo({ ...userInfo, email: event.target.value })}
                        />
                    </div>

                    <div className="cta-form-input">
                        <label htmlFor="password">Nova senha</label>
                        <input
                            id="password"
                            type="password"
                            value={userInfo.password}
                            onChange={(event) => setUserInfo({ ...userInfo, password: event.target.value })}
                        />
                    </div>
                </form>

                <div className="info--button account--save-button">
                    Salvar alterações
                </div>
            </div>
        </section>
    );
};

export default Account;