import { FormField } from '@/types/types';

/**
 * Validates a form field based on its name, value, and validation rules.
 *
 * @param {FormField[]} fields - Array of form field definitions.
 * @param {string} name - The name of the field to validate.
 * @param {string} value - The value of the field to validate.
 * @returns {string} Validation error message, or an empty string if valid.
 *
 * @example
 * const fields = [
 *   { name: 'name', label: 'Name', required: true },
 *   { name: 'lifeSpan', label: 'Life Span', required: false },
 * ];
 * const error = validateField(fields, 'name', '');
 * console.log(error); // "Name is required."
 */
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

/**
 * Validates all fields in an editing object based on form field definitions.
 *
 * @template T
 * @param {FormField[]} fields - Array of form field definitions.
 * @param {T} editingObject - Object containing field values to validate.
 * @returns {Record<string, string>} An object with field names as keys and validation error messages as values.
 *
 * @example
 * const fields = [
 *   { name: 'name', label: 'Name', required: true },
 *   { name: 'lifeSpan', label: 'Life Span', required: false },
 * ];
 * const editingObject = { name: '', lifeSpan: '5 years' };
 * const errors = validateAllFields(fields, editingObject);
 * console.log(errors); // { name: 'Name is required.', lifeSpan: '' }
 */
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
