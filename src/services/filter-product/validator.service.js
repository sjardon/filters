
const ValidatorStringService = require('./validators/validator-string.service');
const ValidatorNumberService = require('./validators/validator-number.service');
// const ValidatorArrayService = require('./validators/ValidatorArrayServiceHelper');
// const ValidatorObjectService = require('./validators/ValidatorObjectServiceHelper');

class ValidatorService{

    // Aclaraciones:
    // - si hay un filtro que no se aplica a ninguna propiedad del producto no lo toma en cuenta
 
    static validate(value,conditions){
        var isValid = true;

        for(var i in conditions){

            const validator = ValidatorService.getValidator(value);
            
            if(validator){
                isValid = validator.validate(value,conditions[i]);
                
                if(!isValid){
                    return false;
                }
            } else {
                return false;
            }
            
        }
        return true;
        
    }

    static getValidator(value){

        switch (ValidatorService.getRealType(value)) {
            case 'string':
                return ValidatorStringService;
                break;
            case 'number':
                return ValidatorNumberService;
                break;
            case 'array':
                return ValidatorArrayService;
                break;
            case 'object':
                return ValidatorObjectService;
                break;
            default:
                return false;
                break;
        }


    }

    static getRealType(value){
        // Comprobamos que:
        // - un numero como string sea numero
        // - un array no sea un objeto
        // - null no sea un objeto

        if(!isNaN(value)){
            return 'number';
        }

        if(Array.isArray(value)){
            return 'array';
        }

        if(value === null){
            return 'null';
        }
        
        return typeof value;

    }

 
}

// ---------------------- VALIDATOR OBJECT

class ValidatorObjectService{
    
    
    static validate(value,conditions){
        
        var isValid = true;
        
        
        switch (conditions.operation) {
           case 'hasNotObject':
            isValid = !ValidatorObjectService.validateHasObject(value,conditions.parameters);
            break;
            case 'hasObject':
            isValid = ValidatorObjectService.validateHasObject(value,conditions.parameters);
            
            break;
        }
        
        return isValid;
    }
    
    
    static validateHasObject(value,condition){
        // Comprueba que todos los objetos sean diferentes
        // Si inicio con v, cuando tengo el primer f ya salgo.

        for(var i in condition){
            for(var j in condition[i]){
                if(typeof value[j] == 'undefined'){
                    return false;
                }
                
                var isValid = ValidatorService.validate(value[j],condition[i][j]);
                
                if(!isValid){
                    return false;
                }
            }
        }
        
        return true;
        
    }
    
    
}

// ---------------------- VALIDATOR ARRAY

class ValidatorArrayService{
 

    static validate(value,conditions){
        
        var isValid = true;


        switch (conditions.operation) {
            case 'hasObject':
            isValid = ValidatorArrayService.validateHasObject(value,conditions.parameters);
            break;
            case 'hasNotObject':
            isValid = !ValidatorArrayService.validateHasObject(value,conditions.parameters);
            break;
        }

        return isValid;
    }

    
    static validateHasObject(value,condition){
        var isValid = false;

        for(var i in value){
        
           isValid = ValidatorObjectService.validate(value[i],{
               operation: 'hasObject',
               parameters: condition
            });
           
           if(isValid){
               return true;
           }
        }

        return false;
    }

}


module.exports = ValidatorService;