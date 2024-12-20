import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TablaClientes() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/guardarCliente/vertodos')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
       <div className='container'style={{ overflowY: 'scroll', height: '600px'}}>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Montos</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.montoTotal}</td>
                        <td>{item.nombre}</td>
                        <td><input type="text" /></td>
                        <td><button className='btn btn-success'>Agregar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div>
       
    );
}

export default TablaClientes;