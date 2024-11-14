import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useParams, Navigate } from 'react-router-dom';

// Importar componentes
import Peliculas from './components/Peliculas';
import MiComponente from './components/MiComponente';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {

    /*render() {

        const router = createBrowserRouter([
            {
                path: "/",
                element: <Peliculas />
            },
            {
                path: "/ruta-prueba",
                element: <SeccionPruebas />
            },
            {
                path: "/segunda-ruta",
                element: <MiComponente />
            },
            {
                path: "*",
                element: <Error />
            },
            {
                path: "/pagina-1",
                element: 
                <div>
                    <h1>Hola mundo desde la ruta: PAGINA 1</h1>
                    <MiComponente saludo="Hola amigo" />
                </div>
            }
        ])
    }*/

    render() {

        // Método para leer los parámetros de la ruta con parámetros
        function PruebaParametos() {
            //let params = useParams();
            let { nombre } = useParams();
            let { apellidos } = useParams();

            return (
                <div id="content">
                    <h1 className="subheader">Página de pruebas</h1>
                    {nombre &&
                        (
                            <h2>Nombre: {nombre}</h2>
                        )
                    }

                    {apellidos &&
                        (
                            <h2>Apellidos: {apellidos}</h2>
                        )
                    }
                </div>
            );
        }

        function GetParamsRedirect(){

            let params = useParams();

            return (<Navigate to={'/blog/busqueda/'+params.search} />)

        };


        return (
            <BrowserRouter>
                <Header />



                {/* CONFIGURAR RUTAS Y PÁGINAS */}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/blog" element={<Blog />} />
                    <Route exact path='/blog/articulo/:id' element={<Article />} />
                    <Route exact path='/blog/crear' element={<CreateArticle />} />
                    <Route exact path='/blog/editar/:id' element={<EditArticle />} />
                    <Route exact path="/blog/busqueda/:search" element={<Search />} />
                    <Route exact path='/blog/redirect/:search' element={<GetParamsRedirect />} />

                    <Route exact path="/formulario" element={<Formulario />} />
                    <Route exact path="/peliculas" element={<Peliculas />} />

                    <Route exact path="/segunda-ruta" element={<MiComponente />} />

                    <Route exact path="/pagina-1" element={(
                        <React.Fragment>
                            <h1>Hola mundo desde la ruta: PÁGINA 1</h1>
                            <MiComponente saludo='Hola amigo' />
                        </React.Fragment>
                    )} />

                    <Route exact path="/pruebas">
                        <Route exact path=":nombre" element={<PruebaParametos />} />
                        <Route exact path=":nombre/:apellidos" element={<PruebaParametos />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                </Routes>

                <div className='clearfix'></div>

                <Footer />

            </BrowserRouter>
        );
    }

}

export default Router;