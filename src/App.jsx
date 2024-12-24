import { useState } from 'react';
import axios from 'axios';
import './App.css';
import TablaClientes from './TablaClientes';
import TablaHistorial from './TablaHistorial';

function App() {
  const [nombre, setNombre] = useState('');
  const [vistaActiva, setVistaActiva] = useState('crearCliente');
  

  function registrarCliente(evento) {
    setNombre(evento.target.value);
  }

  function historialPorId(evento){
    setHistorial(evento.target.value);
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

  return (
    <>
      <h1>Gestión Créditos</h1>
      <div id="container">
        <div id="controles">
          <button class="btn btn-outline-info" onClick={() => setVistaActiva('crearCliente')}>Nuevo Cliente</button>
          <button class="btn btn-outline-info" onClick={() => setVistaActiva('historial')}>Ver Historial</button>
          <button class="btn btn-outline-info" onClick={() => { setVistaActiva('verClientes'); mostrarTodos(); }}>Ver Clientes</button>
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
              <TablaHistorial />
            </div>
          )}
          {vistaActiva === 'verClientes' && (
            <div id="verClientes">
              <p>Lista Clientes</p>
              <TablaClientes />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;


