import { FormField } from '../types/types';

export const validateField = (
    fields: FormField[],
    name: string,
    value: string
): string => {
    let error = '';
    const field = fields.find((field) => field.name === name);
    const fieldLabel = field?.label || '';
    if (!value.trim() && field?.required) {
        error = `${fieldLabel} is required.`;
    } else if (value.trim().length < 2 && field?.required) {
        error = `${fieldLabel} must be at least 2 characters.`;
    } else if (name === 'lifeSpan') {
        const lifeSpanRegex = /^\d+(?:\s-\s\d+)?\syears$/;
        if (!lifeSpanRegex.test(value)) {
            error = `${fieldLabel} must be "x - y years" or "x years".`;
        }
    }
    return error;
};

export const validateAllFields = <T extends Record<string, any>>(
    fields: FormField[],
    editingObject: T
): Record<string, string> => {
    const fieldsToUpdate = fields.map((field) => field.name);
    const newErrors: Record<string, string> = {};

    for (const field of Object.keys(editingObject)) {
        if (!fieldsToUpdate.includes(field)) continue;
        const value = editingObject[field];
        newErrors[field] = validateField(fields, field, value);
    }

    return newErrors;
};
