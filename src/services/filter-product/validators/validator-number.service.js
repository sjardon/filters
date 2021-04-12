module.exports = class ValidatorNumberService{

    static validate(value,conditions){
        var isValid = true;
        // var operation = conditions[0];
        
        // var condition = conditions.slice(1);

        switch (conditions.operation) {
            case 'equal':
                isValid = ValidatorNumberService.validateEqual(value,conditions.parameters);        
                break;
            case 'notEqual':
                isValid = !ValidatorNumberService.validateEqual(value,conditions.parameters);        
                break;
            case 'bigger':
                isValid = ValidatorNumberService.validateBigger(value,conditions.parameters);
                break;
            case 'smaller':
                isValid = ValidatorNumberService.validateSmaller(value,conditions.parameters);
                break;
            case 'between':
                isValid = ValidatorNumberService.validateBetween(value,conditions.parameters);
                break;
        }
        
        return isValid;
    }

    static validateEqual(value,condition){
        
        for(var i in condition){
            
            if(value == condition[i]){
                return true;
            }
        }

        return false;
    }

    static validateBigger(value,condition){
        if(value > condition[0]){
            return true;
        }
    
        return false;
    }

    static validateSmaller(value,condition){

        if(value < condition[0]){
            return true;
        }
    
        return false;
    }
    
    static validateBetween(value,condition){

        if(value > condition[0] && value < condition[1]){
            return true;
        }
    
        return false;
    }

}