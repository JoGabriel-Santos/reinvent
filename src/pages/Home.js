import React from "react";
import Products from "../components/Products";

const Home = () => {

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

            <section className="home-products">
                <Products id_creator={"all"}/>
            </section>
        </React.Fragment>
    );
};

export default Home;