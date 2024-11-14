import React from "react";
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from "./Articles";
import { useParams } from "react-router-dom";

const Search = () => {

    //render() {

        let searched = useParams().search;

        return (
            <div id="blog">
                <Slider
                    title={'Búsqueda: ' + searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de artículos que vendrán de la api rest de node */}

                        <Articles
                            search={searched}
                        />
                    </div>

                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    //}
}

export default Search;