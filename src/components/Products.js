import React, { useEffect, useState } from "react";
import * as API from "../api";
import Card from "./Card";

const Products = ({ id_creator }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const productsData = await API.getProducts(id_creator);
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

export default Products;