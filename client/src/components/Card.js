import React from "react";

const Card = (props) => {

    return (
        <div className="card-design">
            <img className="card-design--photo vertical" src={props.image} alt=""/>

            <div className="card-design--info">
                <div className="info-uploader">
                    <img className="uploader-image" src={require("../util/icons/logo-user.jpeg")} alt=""/>
                    <h2 className="uploader-name">Logo</h2>
                </div>

                <h4 className="info-title">Design title</h4>
            </div>
        </div>
    )
}

export default Card;