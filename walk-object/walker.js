// const Validator = require('./filter-helper/validatorHelper');


module.exports = class Walker{

    // Responsabilidad: recorrer un objeto, el que sea, llegando hasta la propiedad que se le indica.

    static objectStructure = {
        'nombre_de_provincias': ['provincias','nombre'],
        'latitud': ['provincias','centroide','lon']
    }

    static start(object,where){

        var value;
        
        for(var i in where){
            
            // 1 - Chequea que la propiedad buscada exista en la estructura configurada
            
            
            if(typeof Walker.objectStructure[where[i]] == 'undefined'){
                continue;
            }
            
            value = Walker.walk(object,Walker.objectStructure[where[i]]);
            
            
            
        }
        
        return value;
    }

    static walk(object,keys){
        // Object: El objeto a recorrer
        // Keys: Las keys que hay que recorrer en el objeto
        
        
        // Recorro el objeto buscando el elemento
        
        var value = object;
        
        
        for(var i in keys){
            
            var currentIndex = keys[i];
            
            // Si un elemento intermedio es un array hay que buscar en todos los elementos del array
            // A esepción de que sea el último elemento de las keys a recorrer.
            // En ese caso, el array es el elemento que se está buscando.
            

            if(Array.isArray(value[currentIndex]) && i!=keys.length-1){


                // console.log('leyendo array');

                // Llamo recursivamente a Walker.walk para poder recorrer cada objeto del array.
                // En el validador, validaría por cada elemento del array. 
                // En el caso de este ejemplo vamos a devolver todos los valores que están dentro del array y la ruta especificada por las keys

                // Las keys van a ser las mismas menos las que ya se recorrieron.
                // var keysForArray = keys.slice((i*1)+1);
                
                let valueArray = []
                
                
                for(var j in value[currentIndex]){
                    
                    
                    var keysForArray = keys.slice((i*1)+1);
                    
                    if(Array.isArray(value[currentIndex][j])){
                        
                        // Problemas con arrays de arrays

                        keysForArray.unshift(j);
                        valueArray.push(Walker.walk(value[currentIndex],keysForArray));

                    }else{
                        valueArray.push(Walker.walk(value[currentIndex][j],keysForArray));
                    }

                    
                }
                
                value = valueArray;
                break;
                
            }else{
                // console.log('leyendo valor');
                // Si el valor no es un array lo recorre normalmente
                value = value[currentIndex];

            }
            
        }

        return value;

    }
}