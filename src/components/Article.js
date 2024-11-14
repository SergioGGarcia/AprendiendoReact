import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Global from "../Global";
import Sidebar from "./Sidebar";
import Moment from "react-moment";
import 'moment/locale/es';
import ImageDefault from '../assets/images/default.webp';


export default function Article() {

    let url = Global.url;

    /*state = {
        article: {},
        status: null
    }*/

    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios.get(url + 'article/' + id).then(res => {

            setArticle(res.data.article);
            setStatus("success");

        }).catch(err => {

            setArticle(false);
            setStatus("success");

        });
    });



    /*getArticle = () => {

        axios.get(this.url + 'article/' + id).then(res => {

            this.setState({
                article: res.data.article,
                status: 'success'
            });

        });
    }*/

    function deleteArticle(id) {


        swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, no podrás recuperar el archivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(url + 'article/' + id).then(res => {

                    setArticle(res.data.article);
                    setStatus("deleted");
        
                    swal(
                        'Artículo borrado',
                        'El artículo ha sido borrado correctamente',
                        'success'
                    )
        
                });
            } else {
                swal(
                    'Tranquilo!!',
                    'No se ha borrado nada',
                    'success'
                )
            }
          });
    }

    if(status === 'deleted') {
        return <Navigate to={'/blog'} />
    }

    return (
        <div className="center">
            <section id="content">

                {article &&
                    <article className="article-item article-detail">
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={url + "get-image/" + article.image} alt={article.title} />
                                ) : (
                                    <img src={ImageDefault} alt={article.title} />
                                )
                            }
                        </div>

                        <h1 className="subheader">{article.title}</h1>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <p>
                            {article.content}
                        </p>

                        <button onClick={
                            () => {
                                deleteArticle(article._id)
                            }
                        }

                            className="btn btn-danger">Eliminar</button>
                        <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>

                        <div className="clearfix"></div>
                    </article>
                }

                {!article && status === "success" &&
                    <div id="article">
                        <h2 className="subheader">El artículo no existe</h2>
                        <p>Intentalo de nuevo más tarde</p>
                    </div>
                }

                {status == null &&
                    <div id="article">
                        <h2 className="subheader">Cargando...</h2>
                        <p>Espere unos segundos</p>
                    </div>
                }

            </section>

            <Sidebar />
        </div>
    );
}