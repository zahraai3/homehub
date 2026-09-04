export function validateShoppingItemForm({ name, quantity }) {
    const errors = {};

    if (!name || !name.trim()) {
        errors.name = 'name length should be atleast 6 char';
    }

    if (!quantity || Number(quantity) <= 0) {
        errors.quantity = "quantity should be more than 0";
    }

    return errors;
}