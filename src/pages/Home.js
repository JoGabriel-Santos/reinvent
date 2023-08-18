import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import * as API from "../api";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const productsData = await API.getProducts();
            setProducts(productsData.data);

        } catch (error) {
            console.error("Error fetching products:", error.message);

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const renderProductCards = () => {
        if (isLoading) {
            return <p className="loading-products">Carregando produtos...</p>;
        }

        return products.map((product, index) => (
            <Card key={index} productData={product}/>
        ));
    };

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
                    {renderFiltersButton("document-outline", "Formato")}
                    {renderFiltersButton("star-outline", "Licença")}
                    {renderFiltersButton("sync-outline", "Orientação")}
                    <div className="filters-button">
                        <ion-icon name="square-outline"></ion-icon>
                        <span>Conteúdo exclusivo</span>
                    </div>
                </div>

                <div className="filters-sort">
                    {renderFiltersButton("reorder-three-outline", "Em alta")}
                </div>
            </section>

            <section className="section-designs">
                <div className="section-designs--grid">{renderProductCards()}</div>
            </section>
        </React.Fragment>
    );
};

const renderFiltersButton = (iconName, label) => (
    <div className="filters-button">
        <ion-icon name={iconName}></ion-icon>
        <span>{label}</span>
        <ion-icon name="chevron-down-outline" size="small"></ion-icon>
    </div>
);

export default Home;