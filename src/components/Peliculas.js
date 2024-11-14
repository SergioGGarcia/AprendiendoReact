import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            peliculas: [
                {
                    titulo: 'Batman vs Superman',
                    image: 'https://web.ultracine.com/wp-content/uploads/2016/03/batman-vs-superman.jpg.webp',
                },
                {
                    titulo: 'Gran Torino',
                    image: 'https://img2.rtve.es/i/?w=1600&i=1687254796977.jpg',
                },
                {
                    titulo: 'Looper',
                    image: 'https://cdn.sincroguia.tv/uploads/programs/l/o/o/xlooper-273168_SPA-88.jpg.pagespeed.ic.-HEBt1C1Kn.jpg',
                },
            ],
            nombre: "Sergio García",
            favorita: {}
        };
    }

    cambiarTitulo = () => {

        var { peliculas } = this.state;
        //var random = Math.floor(Math.random() * 3);

        peliculas[0].titulo = 'Batman Begins';

        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log("FAVORITA MARCADA");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }

    componentDidMount() {
        //alert("Se va a montar el componente");
    }

    componentWillUnmount() {
        //alert("Me voy a desmontar");
    }

    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La pelicula favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            );
        } else {
            favorita = (
                <p>NO HAY PELÍCULA FAVORITA</p>
            )
        }

        return (
            <React.Fragment>
                <Slider
                    title="Películas"
                    size="slider-small"
                />

                <div className="center">
                    <div id="content" className="peliculas">

                        <h2 className="subheader">Listado de películas</h2>
                        <p>Selección de las películas favoritas de {this.state.nombre}</p>
                        <p>
                            <button onClick={this.cambiarTitulo}>
                                Cambiar título de Batman
                            </button>
                        </p>

                        {/*this.state.favorita.titulo ? (
                            <p className="favorita" style={pStyle}>
                                <strong>La pelicula favorita es: </strong>
                                <span>{this.state.favorita.titulo}</span>
                            </p>
                        ) : (
                            <p>NO HAY PELÍCULA FAVORITA</p>
                        )
                        */}
                        {favorita}

                        {/* Crear componente película */}

                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>

                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        );
    }

}

export default Peliculas;