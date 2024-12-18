import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [clientes, setClientes] = useState([]);
  const [vistaActiva, setVistaActiva] = useState('crearCliente'); 

  function registrarCliente(evento) {
    setNombre(evento.target.value);
  }

  async function verHistorialPorId() {
    try {
      const id = document.querySelector('input[placeholder="id cliente"]').value;
      const response = await axios.get(`http://localhost:8081/guardarCliente/${id}/historal`);
      alert(`Historial del cliente ${id}: ${response.data.message || 'Sin historial'}`);
    } catch (error) {
      console.error(error);
      alert(`No se pudo obtener el historial: ${error.response?.data?.message || error.message}`);
    }
  }

  async function crear() {
    try {
      const response = await axios.post('http://localhost:8081/guardarCliente', { nombre });
      alert(`Cliente creado exitosamente: ${response.data.message || 'Sin mensaje del servidor'}`);
    } catch (error) {
      console.error(error);
      alert(`No se pudo crear el cliente: ${error.response?.data?.message || error.message}`);
    }
  }

  return (
    <>
      <h1>Gestión Créditos</h1>
      <div id="container">
        <div id="controles">
          <button className="btn btn-light" onClick={() => setVistaActiva('crearCliente')}>Nuevo Cliente</button>
          <button className="btn btn-light" onClick={() => setVistaActiva('historial')}>Ver Historial</button>
          <button className="btn btn-light" onClick={() => setVistaActiva('verClientes')}>Ver Clientes</button>
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
              <input type="number" placeholder="id cliente" />
              <button className="btn btn-primary" onClick={verHistorialPorId}>Ver Historial</button>
            </div>
          )}
          {vistaActiva === 'verClientes' && (
            <div id="verClientes">
              <p>Lista Clientes</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;


