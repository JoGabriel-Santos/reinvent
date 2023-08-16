import React, { useState } from "react";
import Card from "../components/Card";

const Details = () => {

    const [designs, setDesigns] = useState([
        require("../util/images/design_1.jpeg"),
        require("../util/images/design_2.jpeg"),
        require("../util/images/design_3.jpeg"),
        require("../util/images/design_4.jpeg"),
        require("../util/images/design_5.jpeg"),
        require("../util/images/design_6.jpeg"),
        require("../util/images/design_7.jpeg"),
        require("../util/images/design_1.jpeg"),
        require("../util/images/design_2.jpeg"),
        require("../util/images/design_3.jpeg"),
        require("../util/images/design_4.jpeg"),
        require("../util/images/design_5.jpeg"),
        require("../util/images/design_6.jpeg"),
        require("../util/images/design_7.jpeg"),
    ]);

    return (
        <React.Fragment>
            <section className="section-details">
                <div className="details">
                    <div className="details--image">
                        <img src={require("../util/images/design_1.jpeg")} alt=""/>
                    </div>

                    <div className="details--info">
                        <h2 className="info-header">Dia Dos Pais Social Media PSD Editável</h2>

                        <div className="benefit exclusive">
                            <img src={require("../util/icons/checkmark-exclusive.png")} alt=""/>
                            <span>Arquivo exclusivo Reinvent 360</span>
                        </div>

                        <ul className="info-benefits">
                            <li className="benefit">
                                <img src={require("../util/icons/checkmark.png")} alt=""/>
                                <span>Para projetos comerciais e pessoais</span>
                            </li>

                            <li className="benefit">
                                <img src={require("../util/icons/checkmark.png")} alt=""/>
                                <span>Não precisa atribuir o autor</span>
                            </li>

                            <li className="benefit">
                                <img src={require("../util/icons/checkmark.png")} alt=""/>
                                <span>Velocidade máxima</span>
                            </li>

                            <li className="benefit">
                                <img src={require("../util/icons/checkmark.png")} alt=""/>
                                <span>Qualidade comprovada</span>
                            </li>
                        </ul>

                        <div className="info--button">
                            DOWNLOAD (200 MB)
                        </div>
                    </div>
                </div>

                <div className="section-designs--grid">
                    {
                        designs.map((image, index) => (
                            <Card image={image} key={index}/>
                        ))
                    }
                </div>
            </section>
        </React.Fragment>
    );
};

export default Details;