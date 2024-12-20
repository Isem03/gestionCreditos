import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                                <td>{item.fechaHora}</td>
                                <td>{item.montoActulizado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        );
    
    }
export default TablaHistorial;