
export function validateRegisterForm(data) {
    const errors = {};

    // Display Name
    if (!data.displayName.trim()) {
        errors.displayName = "Display name is required";
    }

    // Email
    if (!data.email.trim()) {
        errors.email = "Email is required";
    }

    // Password
    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!data.confirmPassword.trim()) {
        errors.confirmPassword = "confirmPassword is required";
    }
    // Confirm Password
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    // Create Home
    if (data.createHome) {
        if (!data.homeName.trim()) {
            errors.homeName = "Home name is required";
        }
    }

    // Join Home
    if (!data.createHome) {
        if (!data.invite.trim()) {
            errors.invite = "Invite code is required";
        }
    }

    return errors;
}