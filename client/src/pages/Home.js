import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import * as API from "../api";

const Home = () => {

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

    const [products, setProducts] = useState([]);

    const updateProductList = async () => {
        const productsData = await API.getProducts();
        setProducts(productsData);
    };

    const fetchProducts = async () => {
        try {
            await updateProductList();

        } catch (error) {

            console.log(error.message);
        }
    }

    useEffect(() => {

        fetchProducts();
    }, []);

    return (
        <React.Fragment>
            <section className="section-hero">
                <div className="section-hero--container">
                    <h1 className="container-title">Muito mais que um banco de imagens</h1>
                    <h4 className="container-descr">
                        Encontre conteúdo visual profissional para seus projetos de design, baixe tudo que
                        precisar diretamente da nuvem de forma rápida e fácil, pelo melhor preço
                    </h4>

                    <div className="container-buttons">
                        <div className="button button-categories">Explorar categorias</div>
                        <div className="button button-new">Novos arquivos</div>
                    </div>
                </div>
            </section>

            <section className="section-filters">
                <div className="filters-content">
                    <div className="filters-button">
                        <ion-icon name="document-outline"></ion-icon>
                        <span>Formato</span>
                        <ion-icon name="chevron-down-outline" size="small"></ion-icon>
                    </div>

                    <div className="filters-button">
                        <ion-icon name="star-outline"></ion-icon>
                        <span>Licença</span>
                        <ion-icon name="chevron-down-outline" size="small"></ion-icon>
                    </div>

                    <div className="filters-button">
                        <ion-icon name="sync-outline"></ion-icon>
                        <span>Orientação</span>
                        <ion-icon name="chevron-down-outline" size="small"></ion-icon>
                    </div>

                    <div className="filters-button">
                        <ion-icon name="square-outline"></ion-icon>
                        <span>Conteúdo exclusivo</span>
                    </div>
                </div>

                <div className="filters-sort">
                    <div className="filters-button">
                        <ion-icon name="reorder-three-outline"></ion-icon>
                        <span>Em alta</span>
                        <ion-icon name="chevron-down-outline" size="small"></ion-icon>
                    </div>
                </div>
            </section>

            <section className="section-designs">
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

export default Home;