import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function TablaClientes() {
    const [clientes, setClientes] = useState([]);
    const [nuevoCredito, setNuevoCredito] = useState({}); // Mantiene los valores temporales de los inputs

    useEffect(() => {
        axios.get('http://localhost:8081/guardarCliente/vertodos')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Manejar el cambio en el input de crédito sin afectar el estado global
    const manejarCambioInput = (id, valor) => {
        setNuevoCredito((prev) => ({ ...prev, [id]: valor }));
    };

    // Enviar el nuevo crédito y actualizar el estado global
    const enviarCredito = (id) => {
        const monto = nuevoCredito[id];
        if (monto === undefined || monto === '') {
            alert('Por favor ingrese un monto válido');
            return;
        }

        axios.put(`http://localhost:8081/guardarCliente/${id}/actualizar-monto?monto=${monto}`, { id, monto })
        .then(response => {
            const clienteActualizado = response.data;
            alert(`Crédito agregado exitosamente: ${response.data.message || 'Sin mensaje del servidor'}`);
            
            setClientes((prevClientes) =>
                prevClientes.map((cliente) =>
                    cliente.id === id ? { ...cliente, montoTotal: clienteActualizado.montoTotal } : cliente
                )
            );
            setNuevoCredito((prev) => ({ ...prev, [id]: '' }));
        })
        .catch(error => {
            console.error(error);
            alert(`No se pudo agregar el crédito: ${error.response?.data?.message || error.message}`);
        });
    };

    return (
        <div className='container' style={{ overflowY: 'scroll', height: '600px' }}>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Número de ID</th>
                        <th>Nombre</th>
                        <th>Total Créditos</th>
                        <th>Nuevo Crédito</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>${item.montoTotal}</td>
                            <td>
                                <input 
                                    type="number" 
                                    value={nuevoCredito[item.id] || ''} 
                                    onChange={(e) => manejarCambioInput(item.id, e.target.value)} 
                                />
                            </td>
                            <td>
                                <button 
                                    className='btn btn-success' 
                                    onClick={() => enviarCredito(item.id)}>
                                    Agregar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaClientes;
