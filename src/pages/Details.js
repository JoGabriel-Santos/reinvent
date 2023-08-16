import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
    const location = useLocation();
    const productData = location.state.productData;

    console.log(productData)

    return (
        <React.Fragment>
            <section className="section-details">
                <div className="details">
                    <div className="details--product">
                        <div className="product--image">
                            <img src={productData.productPicture} alt=""/>
                        </div>

                        <div className="product--likes-downloads">
                            <div className="likes">
                                <ion-icon name="heart-outline" size={"large"}></ion-icon>
                                <p className="likes-text">Like (0)</p>
                            </div>

                            <div className="downloads">
                                <ion-icon name="cloud-download-outline" size={"large"}></ion-icon>
                                <p className="likes-text">0 downloads</p>
                            </div>
                        </div>
                    </div>

                    <div className="details--info">
                        <h2 className="info-header">{productData.productName}</h2>

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

                        <a href={productData.fileURL} target="_blank" rel="noopener noreferrer">
                            <div className="info--button">
                                DOWNLOAD (200 MB)
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Details;