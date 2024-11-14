import React, {Component} from "react";
import { Navigate, Link } from "react-router-dom";

class Sidebar extends Component {

    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false
    }

    redirectToSearch = (e) => {
        e.preventDefault();
        
        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }

    render() {

        if(this.state.redirect) {
            return (
                <Navigate to={'/blog/redirect/' + this.state.search} />
            )
        }

        return (
            <aside id="sidebar">
                {this.props.blog === "true" &&
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puedes hacer esto</h3>
                        <Link to={'/blog/crear'} className="btn btn-success">Crear artículo</Link>
                    </div>
                }

                <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el artículo que buscas</p>
                        <form onSubmit={this.redirectToSearch}>
                            <input type="text" name="search" ref={this.searchRef} />
                            <input type="submit" name="submit" value="Buscar" className="btn" />
                        </form>
                </div>
            </aside>
        );

    }

}

export default Sidebar;