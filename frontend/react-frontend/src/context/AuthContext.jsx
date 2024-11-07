import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Función para obtener el tiempo de expiración del token
  const getTokenExpiration = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded.exp * 1000; // Convertir a milisegundos
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

  // Cargar el token desde localStorage al iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    } else {
      generateToken();
    }
    setLoadingToken(false);
  }, []);

  // Refrescar el token antes de que expire
  useEffect(() => {
    if (token) {
      const expirationTime = getTokenExpiration(token);
      if (expirationTime) {
        const currentTime = Date.now();
        const timeToRefresh = expirationTime - currentTime - 300000; // Refrescar 5 minutos antes de expirar

        if (timeToRefresh > 0) {
          const refreshInterval = setTimeout(() => {
            refreshToken();
          }, timeToRefresh);

          return () => clearTimeout(refreshInterval);
        }
      }
    }
  }, [token]);

  // Generar un nuevo token
  const generateToken = async () => {
    setLoadingToken(true);
    try {
      const response = await fetch('http://localhost:5000/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entity: 'cliente' }),
      });

      if (!response.ok) {
        throw new Error('Error al generar el token.');
      }

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
        console.log('Token generado y almacenado en local storage.');
      } else {
        throw new Error('Token no recibido.');
      }
    } catch (error) {
      console.error('Error al generar el token:', error);
    } finally {
      setLoadingToken(false);
    }
  };

  // Refrescar el token
  const refreshToken = async () => {
    if (isRefreshing || !token) {
      return;
    }
    setIsRefreshing(true);

    try {
      const response = await fetch('http://localhost:5000/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error('Token inválido o ha expirado. Debes iniciar sesión nuevamente.');
          setToken(null);
          localStorage.removeItem('authToken');
          await generateToken(); // Intentar generar un nuevo token automáticamente
          return;
        }
        if (response.status === 404) {
          console.error('Endpoint para refrescar el token no encontrado.');
          return;
        }
        throw new Error('Error al refrescar el token.');
      }

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
        console.log('Token actualizado.');
      } else {
        throw new Error('Token no recibido.');
      }
    } catch (error) {
      console.error('Error al actualizar el token:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, loadingToken }}>
      {loadingToken ? <p>Cargando token...</p> : children}
    </AuthContext.Provider>
  );
};
