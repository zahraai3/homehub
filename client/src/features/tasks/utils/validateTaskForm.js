// src/utils/validateTaskForm.js
export function validateTaskForm({ name }) {
    const errors = {};

    if (!name || !name.trim()) {
        errors.name = 'name length should be atleast 6 char';
    }

    return errors;
}