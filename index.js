const Walker = require('./walk-object/walker');

const provincias = require('./data/provincias');

value = Walker.start(
    provincias,
    ['latitud']
);

console.log(value);