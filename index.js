const Walker = require('./walk-object/walker');

const provincias = require('./data/provincias');

value = Walker.start(
    provincias,
    ['nombre_de_provincias']
);

console.log(value);