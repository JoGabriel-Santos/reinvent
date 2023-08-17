import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
    const location = useLocation();
    const productData = location.state.productData;

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
                                <ion-icon name="heart-outline"></ion-icon>
                                <p className="likes-text">Like ({productData.likes.length})</p>
                            </div>

                            <div className="downloads">
                                <ion-icon name="download-outline"></ion-icon>
                                <p className="likes-text">{productData.downloads} downloads</p>
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
                                DOWNLOAD
                            </div>
                        </a>

                        <div className="designer-info">
                            <div className="designer-info--details">
                                <img src={productData.creator.profilePicture} alt=""/>

                                <div className="details-name">
                                    <h2>{productData.creator.userName}</h2>
                                    <h6>0 arquivos</h6>
                                </div>
                            </div>

                            <div className="designer--follow-button">
                                Seguir
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Details;