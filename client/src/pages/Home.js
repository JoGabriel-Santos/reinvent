import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";

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

    return (
        <React.Fragment>
            <Navbar/>

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