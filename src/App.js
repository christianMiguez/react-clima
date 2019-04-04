import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

import './css/index.css';

class App extends Component {

  state = {
    error: false,
    consulta: {},
    resultado: {}
  }

  componentDidUpdate(prevProps,prevState) {
    if(prevState.consulta !== this.state.consulta) {
      this.consultarAPI();
    }
  }

  consultarAPI = () => {
    const {ciudad, pais} = this.state.consulta
    if(!ciudad || !pais) return null

    const appid = '16a11aaf69f560b572fb3ece5b7dc61f';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`


    // fetch api (requiere promises)
    fetch(url).then(respuesta => {
      //garantizamos que la respuesta sea tipo json
      return respuesta.json();
    }).then(datos => {

      this.setState({
        resultado: datos
      })

    }).catch(error => {
      console.log(error)
    })
  }

  datosConsulta = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === '') {
      this.setState({
        error: true
      })
    } else {
      this.setState({
        consulta: respuesta,
        error: false
      })
    }
  }

  render() {

    const {error} = this.state,
          {cod}   = this.state.resultado

    let resultado;

    if(error) {
      resultado = <Error mensaje="Ambos campos son obligatorios" />
    } else if(cod === '404') {
      resultado = <Error mensaje="Ciudad no encontrada" />
    } else {
      resultado = <Clima resultado={this.state.resultado} />
    }

    return (
      <div className="App">
        <Header title="React Clima App by Chris" />
        <Formulario datosConsulta={this.datosConsulta}/>
        {resultado}
      </div>
    );
  }
}

export default App;
