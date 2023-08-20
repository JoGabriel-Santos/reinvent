import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as API from "../api";

const Details = () => {
    const history = useHistory();
    const location = useLocation();
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState();

    const renderBenefits = (benefits) => {
        return benefits.map((benefit, index) => (
            <li className="benefit" key={index}>
                <img src={require(`../util/icons/${benefit.icon}`)} alt=""/>
                <span>{benefit.text}</span>
            </li>
        ));
    };

    const redirectToAuthor = () => {
        window.location.href = `/detalhes-do-criador/${productData.creator._id}`;
    };

    const handleLike = async () => {
        try {
            await API.toggleLike(productId, { id_user: productData.creator._id });

        } catch (error) {
            console.error("Error like product:", error.message);
        }
    };

    const handleDownload = async () => {
        try {
            await API.incrementDownloads(productId);

        } catch (error) {
            console.error("Error incrementing downloads:", error.message);
        }
    };

    const fetchProduct = async () => {
        try {
            const productData = await API.getProductById(productId);
            setProductData(productData.data);

        } catch (error) {
            console.error("Error fetching products:", error.message);

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <React.Fragment>
            <section className="section-details">
                {isLoading ? (
                    <p className="loading-products">Carregando produto...</p>
                ) : (
                    <div className="details">
                        <div className="details--product">
                            <div className="product--image">
                                <img src={productData.productPicture} alt=""/>
                            </div>

                            <div className="product--likes-downloads">
                                <div className="likes" onClick={handleLike}>
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
                                {renderBenefits([
                                    { icon: "checkmark.png", text: "Para projetos comerciais e pessoais" },
                                    { icon: "checkmark.png", text: "Não precisa atribuir o autor" },
                                    { icon: "checkmark.png", text: "Velocidade máxima" },
                                    { icon: "checkmark.png", text: "Qualidade comprovada" },
                                ])}
                            </ul>

                            <a href={productData.fileURL} target="_blank" rel="noopener noreferrer" onClick={handleDownload}>
                                <div className="info--button">
                                    DOWNLOAD
                                </div>
                            </a>

                            <div className="designer-info">
                                <div className="designer-info--details">
                                    <img src={productData.creator.profilePicture} alt=""/>
                                    <div className="details-name">
                                        <h2>{productData.creator.userName}</h2>
                                    </div>
                                </div>

                                <div className="designer--follow-button" onClick={redirectToAuthor}>
                                    Visitar perfil
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </React.Fragment>
    );
};

export default Details;