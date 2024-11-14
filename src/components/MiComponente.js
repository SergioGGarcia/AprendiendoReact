import React, {Component} from 'react';

class MiComponente extends Component{

    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamón cocido'],
            calorias: 400
        }

        return (
            <div className='mi-componente'>
                <h1>{'Receta: ' + receta.nombre}</h1>
                <h2>{'Calorías: ' + receta.calorias}</h2>

                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }
                </ol>
                <hr />

                {this.props.saludo &&
                    <h3>{this.props.saludo}</h3>
                }
                
            </div>
        );
    }

}

export default MiComponente;