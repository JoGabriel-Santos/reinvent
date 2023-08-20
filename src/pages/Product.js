import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as API from "../api";

const Product = () => {
    const history = useHistory();

    const userLogged = JSON.parse(localStorage.getItem("UserInfo"));

    const [productInfo, setProductInfo] = useState({
        productName: "",
        productPrice: "",
        productPicture: "",
        fileURL: "",
        tags: []
    });
    const [errorMessage, setErrorMessage] = useState({
        productName: "",
        fileURL: "",
    });

    const handleProductPictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setProductInfo(prevProductInfo => ({
                ...prevProductInfo,
                productPicture: reader.result.toString()
            }));
        };
    };

    const handleTagKeyPress = (event) => {
        if (event.key === "Enter" && event.target.value.trim() !== "") {
            event.preventDefault();

            const newTag = event.target.value.trim();
            const formattedTag = capitalizeFirstLetter(newTag);

            setProductInfo(prevProductInfo => ({
                ...prevProductInfo,
                tags: [...prevProductInfo.tags, formattedTag],
            }));

            event.target.value = "";
        }
    };

    const handleDeleteTag = (index) => {
        const updatedTags = productInfo.tags.filter((_, i) => i !== index);
        setProductInfo(prevProductInfo => ({
            ...prevProductInfo,
            tags: updatedTags,
        }));
    };

    const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!productInfo.productName) {
            setErrorMessage({
                ...errorMessage,
                productName: "Defina o nome do produto para continuar...",
            });
            return;
        }

        if (!productInfo.fileURL) {
            setErrorMessage({
                ...errorMessage,
                fileURL: "Insira o link para o arquivo...",
            });
            return;
        }

        try {
            await API.publishProduct(userLogged, productInfo);
            window.location.href = `/detalhes-do-criador/${userLogged._id}`;

        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        if (userLogged.role === "client") {
            history.push("/");
        }

    }, [userLogged, history]);

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
                    <div className="cta-form-name--grid">
                        <div
                            className={`cta-form-input ${
                                errorMessage.productName !== ""
                                    ? "cta-form-error"
                                    : ""
                            }`}
                        >
                            <div className="label">
                                <label htmlFor="product-name">Nome do produto</label>
                                <label htmlFor="product-name">
                                    {errorMessage.productName}
                                </label>
                            </div>
                            <input
                                id="product-name"
                                type="text"
                                value={productInfo.productName}
                                onChange={(event) => setProductInfo({ ...productInfo, productName: event.target.value })}
                                onFocus={() =>
                                    setErrorMessage({
                                        ...errorMessage,
                                        productName: "",
                                    })
                                }
                            />
                        </div>

                        <div className="cta-form-input">
                            <label htmlFor="product-price">Preço (R$)</label>
                            <input
                                id="product-price"
                                type="number"
                                value={productInfo.productPrice}
                                onChange={(event) => setProductInfo({ ...productInfo, productPrice: event.target.value })}
                            />
                        </div>
                    </div>

                    <div
                        className={`cta-form-input ${
                            errorMessage.fileURL !== ""
                                ? "cta-form-error"
                                : ""
                        }`}
                    >
                        <div className="label">
                            <label htmlFor="file-url">Link do arquivo PSD</label>
                            <label htmlFor="file-url">
                                {errorMessage.fileURL}
                            </label>
                        </div>
                        <input
                            id="file-url"
                            type="text"
                            value={productInfo.fileURL}
                            onChange={(event) => setProductInfo({ ...productInfo, fileURL: event.target.value })}
                            onFocus={() =>
                                setErrorMessage({
                                    ...errorMessage,
                                    fileURL: "",
                                })
                            }
                        />
                    </div>

                    <div className="cta-form-input">
                        <label htmlFor="tags">Tags (pressione Enter para adicionar)</label>
                        <div className={`tags-input-container ${productInfo.tags.length === 0 ? "tags-input-empty" : ""}`}>
                            {
                                productInfo.tags.length === 0 ? (
                                    <div className="tag-box">...</div>
                                ) : (
                                    productInfo.tags.map((tag, index) => (
                                        <div
                                            className="tag-box"
                                            key={index}
                                            onClick={() => handleDeleteTag(index)}>
                                            {tag}
                                        </div>
                                    ))
                                )}
                        </div>
                        <input
                            id="tags"
                            type="text"
                            onKeyDown={(event) => handleTagKeyPress(event)}
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