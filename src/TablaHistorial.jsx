import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function TablaHistorial() {
  const [historial, setHistorial] = useState([]);
  const [idCliente, setIdCliente] = useState('');
  const [montoCliente, setMontoCliente] = useState('');
  const [error, setError] = useState('');

  const fetchHistorial = async () => {
    try {
      setError(null); // Limpiar el mensaje de error
      const response = await axios.get(`http://localhost:8081/guardarCliente/${idCliente}/historal`);
      setHistorial(response.data);
    } catch (error) {
      console.error(error);
      setError('Ocurrió un error al cargar el historial');
    }
  };

  const agregarCredito = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/guardarCliente/${idCliente}/actualizar-monto?monto=${montoCliente}`);
      alert('Crédito agregado exitosamente');
      fetchHistorial(); // Actualizar el historial después de agregar el crédito
    } catch (error) {
      console.error(error);
      alert('Error al agregar crédito');
    }
  };

  const abonarCredito = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/guardarCliente/${idCliente}/abonar-monto`, { abono: montoCliente });
      alert('Crédito abonado exitosamente');
      fetchHistorial(); // Actualizar el historial después de abonar el crédito
    } catch (error) {
      console.error(error);
      alert('Error al abonar crédito');
    }
  };

  const borrarCredito = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/guardarCliente/creditoCancelado/${idCliente}`);
      alert('Crédito borrado exitosamente');
      fetchHistorial(); // Actualizar el historial después de borrar el crédito
    } catch (error) {
      console.error(error);
      alert('Error al borrar crédito');
    }
  };

  return (
    <div>
      <div id="historial">
        <label>Historial</label>
        <input
          type="text"
          placeholder="ID Cliente"
          value={idCliente}
          onChange={(e) => setIdCliente(e.target.value)}
        />
        
        <button className='btn btn-primary' onClick={fetchHistorial}>Ver Historial</button>

      </div>
      {error && <p className="error-message">{error}</p>}
      {historial.length > 0 ? (
        <div>
          <p><strong>Nombre Cliente: {historial[0].cliente.nombre}</strong></p>
          <p><strong>Deuda Total: ${historial[0].cliente.montoTotal}</strong></p>
          <div>
          <input
          type="number"
          placeholder="Monto Cliente"
          value={montoCliente}
          onChange={(e) => setMontoCliente(e.target.value)}
        />
            <button className='btn btn-success' onClick={agregarCredito}>Agregar Crédito</button>
            <button className='btn btn-warning' onClick={abonarCredito}>Abonar Crédito</button>
            <button className='btn btn-danger' onClick={borrarCredito}>Borrar Crédito</button>
          </div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Montos</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, index) => (
                <tr key={index}>
                  <td>{moment(item.fecha).format('DD/MM/YYYY')}</td>
                  <td style={{ color: item.montoActulizado >= 0 ? 'blue' : 'red' }}>{item.montoActulizado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay historial disponible</p>
      )}
    </div>
  );
}

export default TablaHistorial;