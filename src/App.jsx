import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [clientes, setClientes] = useState([]);
  const [vistaActiva, setVistaActiva] = useState('crearCliente'); 
  const [historial, setHistorial] = useState([]);

  function registrarCliente(evento) {
    setNombre(evento.target.value);
  }

  //ver el historial de creditos de un cliente
  async function verHistorialPorId() {
    try {
      const id = document.querySelector('input[placeholder="id cliente"]').value;
      const response = await axios.get(`http://localhost:8081/guardarCliente/${id}/historal`);
      setHistorial(response.data.historial || []);
    } catch (error) {
      console.error(error);
      alert(`No se pudo obtener el historial: ${error.response?.data?.message || error.message}`);
    }
  }

  //Crear un nuevo registro para el cliente
  async function crear() {
    try {
      const response = await axios.post('http://localhost:8081/guardarCliente', { nombre });
      alert(`Cliente creado exitosamente: ${response.data.message || 'Sin mensaje del servidor'}`);
    } catch (error) {
      console.error(error);
      alert(`No se pudo crear el cliente: ${error.response?.data?.message || error.message}`);
    }
  }

  //Mostrar todos los clientes
  async function mostrarTodos(){
    try {
      const response = await axios.get('http://localhost:8081/guardarCliente/vertodos');
      setClientes(response.data.clientes || []);
    } catch (error) {
      console.error(error);
      alert(`No se pudo obtener los clientes: ${error.response?.data?.message || error.message}`);
    }
  }

  return (
    <>
      <h1>Gestión Créditos</h1>
      <div id="container">
        <div id="controles">
          <button className="btn btn-light" onClick={() => setVistaActiva('crearCliente')}>Nuevo Cliente</button>
          <button className="btn btn-light" onClick={() => setVistaActiva('historial')}>Ver Historial</button>
          <button className="btn btn-light" onClick={() => { setVistaActiva('verClientes'); mostrarTodos(); }}>Ver Clientes</button>
        </div>
        <div id="funciones">
          {vistaActiva === 'crearCliente' && (
            <div id="crearCliente">
              <label>Crear Cliente</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={registrarCliente}
                placeholder="Nombre del Cliente"
              />
              <button className="btn btn-primary" onClick={crear}>Crear</button>
            </div>
          )}
          {vistaActiva === 'historial' && (
            <div id="historial">
              <label>Historial</label>
              <input type="text" placeholder="id cliente" />
              <button className="btn btn-primary" onClick={verHistorialPorId}>Ver Historial</button>
              {historial.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Montos</th>
              <th>Id Cliente</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.fecha_hora}</td>
                <td>{item.monto_actualizado}</td>
                <td>{item.cliente_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
            </div>
          )}
          {vistaActiva === 'verClientes' && (
            <div id="verClientes">
              <p>Lista Clientes</p>
              <table>
          <thead>
            <tr>
              <th>ID</th>        
              <th>Montos</th>
              <th>Nombre</th>
              <th>Historial</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.monto_total}</td>
                <td>{item.nombre}</td>
                <td>{item.historialCreditos}</td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;


