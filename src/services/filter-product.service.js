const ValidatorService = require('./filter-product/validator.service');


module.exports = class FilterProductService{


    static fields = {
        nombre: ['nombre']
    }

    // Aclaraciones:
    // - si hay un filtro que no se aplica a ninguna propiedad del producto no lo toma en cuenta
    
    static isValid(product,conditions){
        var valid = true;

        for(var i in conditions){
            
            if(typeof FilterProductService.fields[i] == 'undefined'){
                continue;
            }

            valid = FilterProductService.validate(product,conditions[i],FilterProductService.fields[i]);
            if(!valid){
                return valid;
            }
            
        }
        
        return valid;
    }

    static validate(product,conditions,keys){

            // Recorro el objeto buscando el elemento a evaluar

            var value = product;
            var valid;

        for(var i in keys){
            var currentIndex = keys[i];
            
            // Si un elemento intermedio es un array hay que validar todos los elementos del array
            
            if(Array.isArray(value[currentIndex]) && i!=keys.length-1){
                
                var keysForArray = keys.slice((i*1)+1);

                for(var j in value[currentIndex]){

                    valid = FilterProductService.validate(value[currentIndex][j],conditions,keysForArray);
                
                    if(!valid){
                        return valid;
                    }
                }
                
                return valid;
                
            }else{
                
                value = value[currentIndex];

                if(typeof value == 'undefined'){
                    // Si es undefined lo detecta ValidatorService.getRealType
                    break;
                }

            }
            
        }

        valid = ValidatorService.validate(value,conditions);
        
        return valid;

    }
}