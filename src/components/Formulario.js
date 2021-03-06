import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Formulario extends Component {

  //esto crea variables donde se apuntan la variables
  ciudadRef = React.createRef();
  paisRef = React.createRef();

  buscarClima = (e) => {
    e.preventDefault();

    //crea objeto con valores de los Ref anteriormente creados.
    const respuesta = {
      ciudad: this.ciudadRef.current.value,
      pais: this.paisRef.current.value
    }

    //esto envia desde formulario a app datos.
    this.props.datosConsulta(respuesta)

  }

  render() {
    return (
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <form onSubmit={this.buscarClima}>
              <div className="input-field col s12 m8 l4 offset-m2">
                <input id="ciudad" type="text" ref={this.ciudadRef} />
                <label htmlFor="ciudad" >Ciudad: </label>
              </div>
              <div className="input-field col s12 m8 l4 offset-m2">
                <select ref={this.paisRef}>
                  <option value="" defaultValue>elige un país</option>
                  <option value="AR">Argentina</option>
                  <option value="CO">Colombia</option>
                  <option value="CR">Costa Rica</option>
                  <option value="US">EEUU</option>
                  <option value="MX">México</option>
                  <option value="UY">Uruguay papá</option>
                </select>
                <label htmlFor="pais">País: </label>
              </div>
              <div className="input-field col s12 m8 l4 offset-2 buscador">
                <input type="submit" className="waves-effect waves-light btn btn-large yellow accent-4" value="Search..." />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Formulario.propTypes = {
  datosConsulta: PropTypes.func.isRequired
}
export default Formulario
