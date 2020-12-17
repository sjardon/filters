const Validator = require('./filter-helper/validatorHelper');


module.exports = class FilterProduct{


    static fields = {
        stock: ['retailers','retailer','stock-count'],
        // retailer_id: ['retailers','retailer','id'],
        retailer: ['retailers','retailer'],
        property: ['properties','group','property'],
        manufacturer: ['manufacturer']
    }

    // Aclaraciones:
    // - si hay un filtro que no se aplica a ninguna propiedad del producto no lo toma en cuenta
    
    static isValid(product,conditions){
        var valid = true;

        for(var i in conditions){
            
            if(typeof FilterProduct.fields[i] == 'undefined'){
                continue;
            }

            valid = FilterProduct.validate(product,conditions[i],FilterProduct.fields[i]);
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

                    valid = FilterProduct.validate(value[currentIndex][j],conditions,keysForArray);
                
                    if(!valid){
                        return valid;
                    }
                }
                
                return valid;
                
            }else{
                
                value = value[currentIndex];

                if(typeof value == 'undefined'){
                    // Si es undefined lo detecta Validator.getRealType
                    break;
                }

            }
            
        }

        valid = Validator.validate(value,conditions);
        
        return valid;

    }
}