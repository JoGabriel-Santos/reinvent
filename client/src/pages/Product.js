import React, { useState } from "react";
import * as API from "../api";

const Product = () => {

    const [productInfo, setProductInfo] = useState(
        {
            productName: "",
            productPrice: "",
            productPicture: "",
            fileURL: ""
        }
    );

    const handleProductPictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setProductInfo({ ...productInfo, productPicture: reader.result.toString() });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userLogged = JSON.parse(localStorage.getItem("UserInfo"));

        await API.publishProduct(userLogged, productInfo);
    };

    return (
        <section className="section-forms">
            <div className="section-forms--container">
                <h2 className="form-title">Produto</h2>
                <h6 className="form-descr">Preencha as informações abaixo para publicar um novo produto:</h6>

                <div className="cta-form-picture">
                    <img
                        src={productInfo.productPicture !== "" ? productInfo.productPicture : require("../util/images/no-photo-available.png")}
                        className="product-image"
                        alt="Product picture"
                    />

                    <div className="image-upload">
                        <label className="file-input">
                            <span>
                                <ion-icon name="images-outline" size="small"></ion-icon>
                                Definir imagem do produto
                            </span>
                            <input
                                id="file-input"
                                type="file"
                                className="input"
                                onChange={event => handleProductPictureChange(event)}
                            />
                        </label>

                        <label htmlFor="picture">Envie uma imagem JPG ou PNG</label>
                    </div>
                </div>

                <form className="cta-form" action="">
                    <div className="cta-form-name">
                        <div className="cta-form-input">
                            <label htmlFor="product-name">Nome do produto</label>
                            <input
                                id="product-name"
                                type="text"
                                value={productInfo.productName}
                                onChange={(event) => setProductInfo({ ...productInfo, productName: event.target.value })}
                            />
                        </div>

                        <div className="cta-form-input">
                            <label htmlFor="product-price">Preço (R$)</label>
                            <input
                                id="display-name"
                                type="number"
                                value={productInfo.productPrice}
                                onChange={(event) => setProductInfo({ ...productInfo, productPrice: event.target.value })}
                            />
                        </div>
                    </div>

                    <div className="cta-form-input">
                        <label htmlFor="file-url">Link do arquivo PSD (Google Drive)</label>
                        <input
                            id="file-url"
                            type="text"
                            value={productInfo.fileURL}
                            onChange={(event) => setProductInfo({ ...productInfo, fileURL: event.target.value })}
                        />
                    </div>
                </form>

                <div className="info--button account--save-button" onClick={handleSubmit}>
                    Publicar
                </div>
            </div>
        </section>
    );
};

export default Product;