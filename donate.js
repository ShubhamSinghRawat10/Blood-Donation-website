
const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Delhi",
    "Uttarakhand",
    "West Bengal"
];

document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    if (stateSelect) {
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    
    if (stateSelect && citySelect) {
        stateSelect.addEventListener('change', function() {
            // Clear current cities
            citySelect.innerHTML = '<option value="">Select City</option>';
            
            const selectedState = this.value;
            if (selectedState && cities[selectedState]) {
                cities[selectedState].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const donorForm = document.getElementById('donorForm');
    
    if (donorForm) {
        donorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const donorData = Object.fromEntries(formData.entries());
            

            const age = parseInt(donorData.age);
            if (age < 18 || age > 65) {
                alert('Age must be between 18 and 65 years');
                return;
            }
            
            
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(donorData.phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(donorData.email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            
            if (donorData.last_donation) {
                const lastDonation = new Date(donorData.last_donation);
                const today = new Date();
                const monthsSinceLastDonation = (today - lastDonation) / (1000 * 60 * 60 * 24 * 30);
                
                if (monthsSinceLastDonation < 3) {
                    alert('You must wait at least 3 months between donations');
                    return;
                }
            }
            
            
            alert('Thank you for registering as a donor! We will contact you soon.');
            this.reset();
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
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


document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('button[type="submit"]');
    const form = document.getElementById('donorForm');
    
    if (submitButton && form) {
        form.addEventListener('submit', function() {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registering...';
            
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Register as Donor';
            }, 2000);
        });
    }
}); 