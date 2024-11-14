import React, { Component } from "react";
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render() {

        return (
            <div id="home">
                <Slider
                    title="Bienvenido al Curso de React con Víctor Robles de victorroblesweb.es"
                    btn="Ir al blog"
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Últimos artículos</h1>
                        <Articles
                            home="true"
                        />
                    </div>

                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;