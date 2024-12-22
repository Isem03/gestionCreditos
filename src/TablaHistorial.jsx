import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function TablaHistorial() {
    const [historial, setHistorial] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchHistorial();
    }, [idCliente]);

        const fetchHistorial = async () => {
            try {
                setError(null); // Limpiar el mensaje de error
                const response = await axios.get(`http://localhost:8081/guardarCliente/${idCliente}/historal`, { idCliente });
                setHistorial(response.data);
            } catch (error) {
                console.error(error);
                setError('Ocurrió un error al cargar el historial');
            }
        };

        return (

            <div>
                <div>
                    <div>
                        <label>Historial</label>
                        <input type="text" placeholder="id  Cliente" id='idCliente' name='idCliente' value={idCliente} onChange={(e) => setIdCliente(e.target.value)} />
                        <button className="btn btn-primary" onClick={fetchHistorial}>Ver Historial</button>
                    </div>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Montos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map((item) => (
                            <tr key={item.id}>
                                <td>{moment(item.fechaHora).format('DD/MM/YYYY HH:mm')}</td>
                                <td>${item.montoActulizado}-COP</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <input type="number" />
                    <button className="btn btn-primary">Agregar Crédito</button>
                    <button className="btn btn-warning">Abonar Crédito</button>
                    <button className="btn btn-danger">Borrar Crédito</button>
                </div>
            </div>

        );
    
    }
export default TablaHistorial;