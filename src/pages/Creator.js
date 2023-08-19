import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Products from "../components/Products";
import * as API from "../api";

const Creator = () => {
    const location = useLocation();
    const { creatorId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [creatorData, setCreatorData] = useState();

    const fetchCreator = async () => {
        try {
            const creatorData = await API.getCreatorById(creatorId);
            setCreatorData(creatorData.data);

        } catch (error) {
            console.error("Error fetching creator:", error.message);

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCreator();
    }, []);

    return (
        <React.Fragment>
            {isLoading ? (
                <p className="loading-creator">Carregando criador...</p>
            ) : (
                <>
                    <section className="section-creator">
                        <div className="creator-banner">
                            <img src={require("../util/images/banner.jpeg")} alt=""/>
                        </div>
                        <div className="section-creator--container">
                            <img className="creator-picture" src={creatorData.profilePicture} alt=""/>

                            <div className="creator-info">
                                <h4 className="creator-name">{creatorData.userName}</h4>

                                <div className="creator-description--container">
                                    <h6 className="creator-description">{creatorData.description}</h6>
                                </div>

                                <div className="container-info">
                                    <div className="info--details">
                                        <div className="details-number">0</div>
                                        <div className="details-description">ARQUIVOS</div>
                                    </div>

                                    <div className="info--details">
                                        <div className="details-number">0</div>
                                        <div className="details-description">DOWNLOADS</div>
                                    </div>

                                    <div className="info--details">
                                        <div className="details-number">0</div>
                                        <div className="details-description">CURTIDAS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="creator-products">
                        <Products id_creator={creatorData._id}/>
                    </section>
                </>
            )}
        </React.Fragment>
    );
};

export default Creator;