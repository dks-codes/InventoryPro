import DynamicField from "../models/dynamicFieldModel.js";

async function validateDynamicField(dynamicFields, entity, userId){
    try{
        // Allowed dynamic fields for the particular user
        const userDynamicFields = await DynamicField.find({ 
            entity: entity,
            $or: [
            { createdBy: userId },
            { isGlobal: true }
            ]
        }).select('fieldName displayName configuration'); 

        // Field names of user defined fields
        const allowedDynamicFieldNames = userDynamicFields.map(field => field.fieldName);

        console.log('allowed dynamic: ',allowedDynamicFieldNames);

        const errors = [];

        // Check if all the dynamic fields in the request are valid (i.e., they exist in the user's allowed fields)
        for (const field in dynamicFields) {
            console.log('dynamic fields sent by user: ',field);
            if (!allowedDynamicFieldNames.includes(field)) {
                errors.push(`Field ${field} is not present`);
            }
        }

        // Check for Required fields
        // Suppose: Name, roll(required), class
        for (const field of userDynamicFields) {
            if (field.configuration.required && !dynamicFields[field.fieldName]) { 
                console.log(`Field ${field.fieldName} is required but not provided.`);  
            // field.fieldName = roll ... dynamicFields[roll] = 14
            // if value not there for required field, it throws an error
                errors.push(`${field.displayName} is required`); 
            }
        }

        if(errors.length > 0){
            return { valid:false, message: errors.join(', ')  }
        }

        return { valid: true };
    } catch(err){
        console.error('Error in validation:', err);
        return { valid: false, message: "Validation failed."}
    }
}

export default validateDynamicField;