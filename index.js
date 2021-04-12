const { filterService } = require('./src/services');
const data = require('./src/data/provincias');

const provName = 'Buenos Aires';

// Filtra las provincias buscando el campo indicado en la key
// El filtro se puede hacer más complejo y agregar diferentes funciones de validación

const filterConditions = {
    nombre: [{
        operation: 'includes',
        parameters:[provName]
    }]
}

let provincias = data.provincias.filter((provincia) => {

    return filterService.isValid(provincia,filterConditions)
});

console.log(provincias);