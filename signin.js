// Sample user data (in a real application, this would come from a database)
const sampleUsers = [
    {
        email: "john@example.com",
        password: "password123"
    },
    {
        email: "jane@example.com",
        password: "password456"
    }
];

// Handle sign in form submission
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            const remember = formData.get('remember') === 'on';
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Validate password length
            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }
            
            // Check credentials (in a real application, this would be a server-side check)
            const user = sampleUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store user session (in a real application, this would be handled securely)
                if (remember) {
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('userEmail', email);
                }
                
                // Show success message and redirect
                showSuccess('Sign in successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showError('Invalid email or password');
            }
        });
    }
});

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;
    
    const form = document.getElementById('signinForm');
    form.insertAdjacentElement('beforebegin', errorDiv);
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3';
    successDiv.textContent = message;
    
    const form = document.getElementById('signinForm');
    form.insertAdjacentElement('beforebegin', successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Add loading state to submit button
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('button[type="submit"]');
    const form = document.getElementById('signinForm');
    
    if (submitButton && form) {
        form.addEventListener('submit', function() {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...';
            
            // Reset button after 2 seconds if there's an error
            setTimeout(() => {
                if (submitButton.disabled) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Sign In';
                }
            }, 2000);
        });
    }
});

// Check for remembered user
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const rememberCheckbox = document.getElementById('remember');
    
    if (emailInput && rememberCheckbox) {
        const rememberedEmail = localStorage.getItem('userEmail');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberCheckbox.checked = true;
        }
    }
});

// Add input validation styles
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.classList.add('is-invalid');
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
    });
}); 