module.exports = class ValidatorStringService{


    static validate(value,conditions){
        var isValid = true;

        switch (conditions.operation) {
            case 'equal':
            isValid = ValidatorStringService.validateEqual(value,conditions.parameters);        
            break;
            case 'notEqual':
            isValid = !ValidatorStringService.validateEqual(value,conditions.parameters);        
            break;
            case 'includes':
            isValid = ValidatorStringService.validateIncludes(value,conditions.parameters);        
            break;
            case 'notIncludes':
            isValid = !ValidatorStringService.validateIncludes(value,conditions.parameters);
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

    static validateIncludes(value,condition){
        
        for(var i in condition){
            if(value.includes(condition[i])){
                return true;
            }
        }

        return false;
    }
 
}