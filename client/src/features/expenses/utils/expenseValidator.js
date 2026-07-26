export function validateExpenseForm(data) {
    const errors = {};

    // Expense Title
    if (!data.expenseTitle.trim()) {
        errors.expenseTitle = "Expense title is required";
    }

    // Total Amount
    if (!data.totalAmount) {
        errors.totalAmount = "Total amount is required";
    } else if (Number(data.totalAmount) <= 0) {
        errors.totalAmount = "Total amount must be greater than 0";
    }

    // Deadline
    if (!data.deadline) {
        errors.deadline = "Deadline is required";
    } else if (new Date(data.deadline) < new Date(new Date().toDateString())) {
        errors.deadline = "Deadline cannot be in the past";
    }

    return errors;
}