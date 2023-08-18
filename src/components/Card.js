import React from "react";
import { useHistory } from "react-router-dom";

const Card = ({ productData }) => {
    const history = useHistory();

    const redirectToDetails = () => {
        history.push({
            pathname: "/detalhes-do-produto",
            state: { productData }
        });
    };

    return (
        <div className="card-design" onClick={redirectToDetails}>
            <img src={productData.productPicture} alt=""/>

            <div className="card-design--info">
                <div className="info-uploader">
                    <img
                        className="uploader-image"
                        src={productData.creator.profilePicture}
                        alt=""
                    />
                    <h2 className="uploader-name">{productData.creator.userName}</h2>
                </div>

                <div className="product--name-likes">
                    <h4 className="info-title">{productData.productName}</h4>

                    <div className="info-likes">
                        <img src={require("../util/icons/heart.png")} alt=""/>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;