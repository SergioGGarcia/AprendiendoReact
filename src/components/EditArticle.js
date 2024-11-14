import React, { useState, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import ImageNotFound from '../assets/images/default.webp';

const baseUrl = "http://localhost:3900/api/"
const MySwal = withReactContent(Swal)

export default function EditArticle() {

    let { id } = useParams()

    let titleRef = React.createRef()
    let contentRef = React.createRef()

    const [article, setArticle] = useState({})
    const [status, setStatus] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [, forceUpdate] = useState()

    const validator = useRef(
        new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: "Este campo es requerido.",
            },
        })
    )

    function fileChange(file) {
        if (file) {
            setSelectedFile(file)
        }
    }

    if (Object.keys(article).length === 0) {
        axios.get(baseUrl + 'article/' + id).then((res) => {
            setArticle(res.data.article)
        });
    }

    function changeState() {
        setArticle((prevState) => ({
            _id: prevState["_id"],
            title: titleRef.current.value,
            content: contentRef.current.value,
            image: prevState["image"],
            date: prevState["date"],
            __v: prevState["__v"]
        }))

        validator.current.showMessages()
        forceUpdate(1)
    }

    async function saveArticleFull(e) {
        e.preventDefault()

        //Rellenar datos
        changeState()

        if (validator.current.allValid()) {
            // Hacer una petición HTTP por POST para guardar el artículo
            const response = await axios.put(baseUrl + 'article/' + id, article)
            if (response.data.article) {
                setArticle(response.data.article)
                setStatus('waiting')

                MySwal.fire({
                    title: 'Artículo actualizado',
                    text: 'El artículo ha sido actualizado correctamente',
                    icon: 'success'
                });

                if (selectedFile) {
                    //Sacar id
                    let articleID = article._id

                    //Crear form data y añadir
                    const formData = new FormData()

                    formData.append(
                        'file0',
                        selectedFile,
                        selectedFile.name
                    )

                    //Petición Ajax
                    const res = await axios.post(baseUrl + 'upload-image/' + articleID, formData)
                    if (res.data.article) {
                        setArticle(res.data.article)
                        setStatus('success')
                    } else {
                        setArticle(res.data.article)
                        setStatus('failed')
                    }
                } else {
                    setStatus('success')
                }
            } else {
                setStatus('failed')
            }
        } else {
            setStatus("failed")
            validator.current.showMessages()
            forceUpdate(1)
        }
    }

    if (status === 'success') {
        return (
            <Navigate to={'/blog'} />
        )
    }

    return (
        <div className="center">
            <section id="content">
                <h1 className='subheader'>Editar artículo</h1>
                <form className="mid-form" onSubmit={saveArticleFull}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            name="title"
                            multiple={false}
                            ref={titleRef}
                            onChange={() => {
                                changeState()
                            }}
                            defaultValue={article.title}
                        />
                        {validator.current.message(
                            "title",
                            article.title,
                            "required|alpha_num_space"
                        )}
                        {status === "failed" && validator && validator.errorMessages["title"] !== null && (
                            <div className="smallDiv">
                                <br />
                                <small> El título no es valido</small>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea
                            name="content"
                            ref={contentRef}
                            cols={20}
                            rows={1}
                            onChange={() => {
                                changeState();
                            }}
                            defaultValue={article.content}
                        ></textarea>
                        {validator.current.message(
                            "content",
                            article.content,
                            "required"
                        )}
                        {status === "failed" && validator && validator.errorMessages["content"] !== null && (
                            <div className="smallDiv">
                                <br />
                                <small>Por favor, aunque sea un tweet (ahora x, gracias Elon).</small>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Imagen</label>
                        <input
                            type="file"
                            name="file0"
                            onChange={(event) => {
                                fileChange(event.target.files[0]);
                            }}
                        />

                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img
                                        src={baseUrl + 'get-image/' + article.image}
                                        alt={article.title}
                                        className='thumb'
                                    />
                                ) : (
                                    <img
                                        src={ImageNotFound}
                                        alt={article.title}
                                        className='thumb'
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className='clearfix'></div>
                    <input type="submit" value="Guardar" className="btn btn-success" />
                </form>
            </section>
            <Sidebar />
        </div>
    )
}