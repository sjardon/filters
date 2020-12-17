module.exports = class ValidatorNumber{

    static validate(value,conditions){
        var isValid = true;
        // var operation = conditions[0];
        
        // var condition = conditions.slice(1);

        switch (conditions.operation) {
            case 'equal':
                isValid = ValidatorNumber.validateEqual(value,conditions.parameters);        
                break;
            case 'notEqual':
                isValid = !ValidatorNumber.validateEqual(value,conditions.parameters);        
                break;
            case 'bigger':
                isValid = ValidatorNumber.validateBigger(value,conditions.parameters);
                break;
            case 'smaller':
                isValid = ValidatorNumber.validateSmaller(value,conditions.parameters);
                break;
            case 'between':
                isValid = ValidatorNumber.validateBetween(value,conditions.parameters);
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