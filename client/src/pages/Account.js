import React, { useState } from "react";

const Account = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (text) => {
        setName(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    return (
        <section className="section-account">
            <div className="section-account--container">
                <h2 className="account-title">Conta</h2>
                <h6 className="account-descr">Atualize os detalhes do seu perfil abaixo:</h6>

                <div className="authentication-input">
                    <input
                        className="header-options--input"
                        placeholder="Primeiro nome"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="authentication-input">
                    <input
                        className="header-options--input"
                        placeholder="Último nome"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="authentication-input">
                    <input
                        className="header-options--input"
                        placeholder="Nome em Exibição"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="authentication-input">
                    <input
                        className="header-options--input"
                        placeholder="Endereço de e-mail"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="authentication-input">
                    <input
                        className="header-options--input"
                        placeholder="Nova Senha"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>
        </section>
    );
};

export default Account;