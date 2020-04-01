import React from 'react';

const DatosResultado = ({datosRecibidos, setdatosRecibidos, setdatosEnviados}) => {
    const {nombre, presion, humedad, tempMin, tempMax} = datosRecibidos;
    if(datosRecibidos.nombre !== ''){
        localStorage.setItem('datosRecibidos', JSON.stringify(datosRecibidos))
    }
    const borrarBusqueda = (e) => {
        e.preventDefault()
        localStorage.clear()
        setdatosRecibidos({})
        setdatosEnviados(false)
    }
    return (
        <div>
            {datosRecibidos.nombre ? (
                <div className="p-3 cuadrado cuadrado-datos">
                    <h1 className="text-center titulo-datos">{nombre}</h1>
            <p><span>Temperatura Minima:</span> {tempMin}°</p>
            <p><span>Temperatura Maxima:</span> {tempMax}°</p>
            <p><span>Humedad:</span> {humedad}%</p>
            <p><span>Presion:</span> {presion} hPa</p>
            <button className="btn btn-primary btn-block mt-3" onClick={borrarBusqueda}>Eliminar Búsqueda</button>
                </div>
            
            ) : null}
            
        </div>
        
        
     );
}
 
export default DatosResultado;