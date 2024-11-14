import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from "../Global";
import Sidebar from "./Sidebar";

// Validación formularios y alertas

const url = Global.url;

const CreateArticle = () => {

    let titleRef = React.createRef();
    let contentRef = React.createRef();

    const [article, setArticle] = useState({});
    const [status, setStatus] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // let validator = new SimpleReactValidator();

    /*
  Esta solución utiliza `useRef()` para crear una referencia mutable a la instancia de `SimpleReactValidator` . La
  principal diferencia con la solución anterior es que `useRef()` se utiliza en lugar de una variable local para almacenar
  la instancia del validador. Esto garantiza que la instancia del validador se mantenga a lo largo de todo el ciclo de
  vida del componente.
  La línea `const validator = useRef(new SimpleReactValidator())` crea una referencia mutable a la instancia de
  `SimpleReactValidator` y la asigna a la variable `validator` . Para acceder al objeto `SimpleReactValidator` , se
  utiliza `validator.current` en lugar de simplemente `validator` . Esto se debe a que `useRef()` devuelve un objeto con
  una propiedad `current` que contiene el valor actual de la referencia.
  La línea `const [, forceUpdate] = useState();` es un truco para forzar una actualización del componente sin cambiar el
  estado. Al desestructurar el array devuelto por `useState()` y descartar el primer elemento (el estado actual), se
  obtiene una función `forceUpdate` que, cuando se llama, obliga a React a volver a renderizar el componente. En este
  caso, se llama a `forceUpdate(1)` después de mostrar los mensajes de validación para asegurarse de que los mensajes se
  muestren en la interfaz de usuario.
  En resumen, esta solución utiliza `useRef()` para mantener una referencia a la instancia de `SimpleReactValidator` a lo
  largo del ciclo de vida del componente y utiliza un truco con `useState()` para forzar la actualización del componente
  cuando sea necesario. Estos cambios permiten que los mensajes de validación se muestren correctamente cuando se envía el
  formulario.
  */

    // useRef hace que sea inmutable a los cambios del render y poder mantener el valor
    const validator = useRef(

        new SimpleReactValidator({
            messages: {
                required: "Este campo es requerido.",
            },
        })

    );

    // Para poder recargar el render, para ejecutarlo forceUpdate(1)
    const [, forceUpdate] = useState();

    const saveArticle = (e) => {
        e.preventDefault();

        // Rellenar state con formulario
        changeState();

        if (validator.current.allValid()) {

            // Hacer una petición HTTP por POST para guardar el artículo
            axios.post(url + "save/", article).then((res) => {

                if (res.data.article) {
                    setArticle(res.data.article);
                    setStatus("waitting");

                    swal(
                        'Artículo creado',
                        'El artículo ha sido creado',
                        'success'
                    )

                    // Subir La imagen
                    if (selectedFile !== null) {

                        // Sacar el ID del artículo guardado
                        let articleId = res.data.article._id;

                        // Crear form data y añadir fichero
                        const formData = new FormData();

                        formData.append("file0", selectedFile, selectedFile.name);

                        // console.log(formData);

                        // Petición ajax
                        axios
                            .post(url + "upload-image/" + articleId, formData)
                            .then((res) => {
                                if (res.data.article) {
                                    setArticle(res.data.article);
                                    setStatus("success");
                                } else {
                                    setArticle(res.data.article);
                                    setStatus("failed");
                                }
                                console.log(res);
                            });

                    } else {

                        setStatus("success");

                    }

                } else {

                    setStatus("failed");

                }

            });

        } else {

            setStatus("failed");
            validator.current.showMessages();
            forceUpdate(1);

        }

    };

    const changeState = () => {

        setArticle({
            title: titleRef.current.value,
            content: contentRef.current.value,
        });

        validator.current.showMessages();
        forceUpdate(1);

    };

    const fileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    if (status === "success") {
        return (<Navigate to="/blog" />);
    }

    return (
        <div className="center">
            <section id="content">
                <h1 className="subheader">Crear artículo</h1>

                <form className="mid-form" onSubmit={saveArticle}>
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        <input
                            type="text"
                            name="title"
                            ref={titleRef}
                            onChange={changeState}
                        />

                        {validator.current.message(
                            "title",
                            article.title,
                            "required|alpha_num_space"
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Contenido</label>
                        <textarea
                            name="content"
                            ref={contentRef}
                            onChange={changeState}
                        ></textarea>

                        {validator.current.message("content", article.content, "required")}
                    </div>

                    <div className="form-group">
                        <label htmlFor="file0">Imagen</label>
                        <input type="file" name="file0" onChange={fileChange} />
                    </div>

                    <input type="submit" value="Guardar" className="btn btn-success" />
                </form>
            </section>

            <Sidebar />
        </div>
    );
};

/*class CreateArticle extends Component {

    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });

        this.validator.current.showMessages();
        this.forceUpdate(1);
    }

    validator = useRef(new SimpleReactValidator({
        messages: {
            required: "Este campo es requerido"
        }
    }));

    saveArticle = (e) => {
        e.preventDefault();

        // Rellenar state con formulario
        this.changeState();

        if (this.validator.current.allValid()) {

            // Hacer una petición http por post para guardar el artículo
            axios.post(this.url + 'save', this.state.article).then(res => {

                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    });

                    // Subir la imagen
                    if (this.state.selectedFile !== null) {

                        // Sacar el id del artículo guardado
                        var articleId = res.data.article._id;

                        // Craer form data y añadir fichero
                        const formData = new FormData();

                        formData.append(
                            'file0',
                            this.state.selectedFile
                            //this.state.selectedFile.name
                        );

                        // Petición ajax
                        axios.post(this.url + 'upload-image/' + articleId, formData).then(res => {

                            if (res.data.article) {

                                this.setState({
                                    article: res.data.article,
                                    status: 'success'
                                });

                            } else {

                                this.setState({
                                    article: res.data.article,
                                    status: 'failed'
                                });

                            }

                        });

                    } else {
                        this.setState({
                            status: 'success'
                        });
                    }

                } else {

                    this.setState({
                        status: 'failed'
                    });

                }
                /*}).catch((err) => {
                    console.log("FALLO");
                    this.setState({
                        status: 'failed'
                    });
            });

        } else {

            this.setState({
                status: 'failed'
            });

            this.validator.current.showMessages();
            this.forceUpdate(1);
            
        }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render() {

        if (this.state.status === "success") {
            return <Navigate to={'/blog'} />;
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear Artículo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>

                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}></input>

                            {this.validator.current.message("title", this.state.article.title, "required|alpha")}

                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />

                    </form>

                </section>

                <Sidebar />
            </div>
        )
    }
}*/

export default CreateArticle;