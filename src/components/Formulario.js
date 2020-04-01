import React, {useState, useEffect} from 'react';

const Formulario = ({setdatosApi, setdatosEnviados, setdatosRecibidos, errorMsg, seterrorMsg}) => {
    const [datosForm, setdatosForm] = useState({
        ciudad: '',
        pais:''
    });
    
    useEffect(() => {
        
    }, [errorMsg])

    //Extraigo las variables del state
    const {ciudad, pais} = datosForm;

    const handleChange = (e) => {
        setdatosForm({
            ...datosForm,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        seterrorMsg(null)
        if(ciudad.trim() === '' || pais.trim() === ''){
            setdatosEnviados(false)    
            
            setdatosRecibidos({})
            seterrorMsg('Todos los campos son oligatorios')

            return;
        }
        setdatosApi({ciudad, pais})
        setdatosEnviados(true)
        
    }
    return ( 
        <form onSubmit={handleSubmit}>
            
            {errorMsg ? <div className="bg-danger text-center text-uppercase my-3 text-light p-3">{errorMsg}</div> : null}
            <div className="form-group ">
                <label className="form-control-label" htmlFor="pais">País</label>
                <select name="pais" id="pais" className="form-control" onChange={handleChange}>
                    <option value="">--Elige un País</option>
                    <option value="AR">Argentina</option>
                    <option value="ES">España</option>
                    <option value="CZ">Republica Checa</option>
                    <option value="MX">Mexico</option>
                    <option value="CO">Colombia</option>    
                </select>                
            </div>
            <div className="form-group">
                <label htmlFor="ciudad">Ciudad</label>
                <input type="text" name="ciudad" className="form-control" id="ciudad" onChange={handleChange}/>
            </div>
            <button className="btn btn-primary btn-block mt-5" type="submit">Buscar</button>
        </form>
     );
}
 
export default Formulario;