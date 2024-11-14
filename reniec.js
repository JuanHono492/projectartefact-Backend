const axios = require('axios');

const obtenerDatosPorDni = async (dni) => {
    try {
        const response = await axios.get(`https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer TU_TOKEN'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
};

// Ejemplo de uso
obtenerDatosPorDni('73173028');
