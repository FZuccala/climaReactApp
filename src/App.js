import React, {Fragment, useState, useEffect} from 'react';
import Barra from './components/barra';
import Formulario from './components/Formulario';
import DatosResultado from './components/DatosResultado';
import Axios from 'axios';
import Darkmode from 'darkmode-js';

function App() {
  const [datosApi, setdatosApi] = useState({
    
      ciudad: '',
      pais: ''
    
  })
  //extraigo los valores del state
  const {ciudad, pais} = datosApi;
  const [datosEnviados, setdatosEnviados] = useState(false)
  const [datosRecibidos, setdatosRecibidos] = useState({})
  const [errorMsg, seterrorMsg] = useState(null);
  const [primeraVez, setprimeraVez] = useState(true);

  useEffect( () => {
    const llamadoApi = async()=> {
    
      try {
        const token = '32fe2220b6b1e2de6733a7ac73fd160b';
      const resultado = await Axios(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${token}`)
      const tempMinC = resultado.data.main.temp_min - 273.15;
    const tempMaxC = resultado.data.main.temp_max - 273.15;
    setdatosRecibidos( {
      nombre: resultado.data.name,
      presion: resultado.data.main.pressure,
      humedad: resultado.data.main.humidity,
      tempMin: tempMinC.toFixed(2),
      tempMax: tempMaxC.toFixed(2)
    })
    
      } catch (error) {
        seterrorMsg('No se encontraron resultados')
        setdatosEnviados(false)
        setdatosRecibidos({})
      }
    
    
    
    
    
    
  }
  if(primeraVez){
    setdatosEnviados(true)
    let datosLocalStorage = JSON.parse(localStorage.getItem('datosRecibidos'))
    if(datosLocalStorage){
      setdatosRecibidos(datosLocalStorage) 
    }
     
  }
  if(ciudad.trim() !== '' || pais.trim() !== ''){
    setprimeraVez(false)
    llamadoApi()
   
}
// eslint-disable-next-line 
  }, [datosApi])

  return (
    <Fragment>
      <Barra />
      <div className="contenido-app container-fluid">
        <div className="row pt-5 d-flex justify-content-around">
          <div className="col-md-4 p-3 my-2 cuadrado">
            <Formulario setdatosApi={setdatosApi} setdatosEnviados={setdatosEnviados} setdatosRecibidos={setdatosRecibidos} errorMsg={errorMsg} seterrorMsg={seterrorMsg} />
          </div>
          <div className="col-md-4 my-2 px-0">
            {datosEnviados ? <DatosResultado datosRecibidos={datosRecibidos} setdatosRecibidos={setdatosRecibidos} setdatosEnviados={setdatosEnviados} /> : null}
            
          </div>
        </div>
      </div>
       
    </Fragment>
  );
}

export default App;
