// Sample donor data (in a real application, this would come from a database)
const sampleDonors = [
    {
        id: 1,
        name: "John Doe",
        bloodGroup: "A+",
        age: 28,
        city: "Kolkata",
        state: "West Bengal",
        lastDonation: "2023-12-15",
        contact: "9876543210"
    },
    {
        id: 2,
        name: "Jane Smith",
        bloodGroup: "O+",
        age: 32,
        city: "Delhi",
        state: "Delhi",
        lastDonation: "2024-01-20",
        contact: "9876543211"
    },
    {
        id: 3,
        name: "Mike Johnson",
        bloodGroup: "B+",
        age: 25,
        city: "Mumbai",
        state: "Maharashtra",
        lastDonation: "2024-02-01",
        contact: "9876543212"
    }
];

// Populate states dropdown
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

// Update cities based on selected state
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

// Handle search form submission
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const donorsList = document.getElementById('donorsList');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const searchData = Object.fromEntries(formData.entries());
            
            // Filter donors based on search criteria
            const filteredDonors = sampleDonors.filter(donor => {
                return donor.bloodGroup === searchData.blood_group &&
                       donor.city === searchData.city &&
                       donor.state === searchData.state;
            });
            
            // Display results
            if (filteredDonors.length > 0) {
                displayDonors(filteredDonors);
                searchResults.style.display = 'block';
                noResults.style.display = 'none';
            } else {
                searchResults.style.display = 'none';
                noResults.style.display = 'block';
            }
        });
    }
});

// Display donor cards
function displayDonors(donors) {
    const donorsList = document.getElementById('donorsList');
    donorsList.innerHTML = '';
    
    donors.forEach(donor => {
        const donorCard = createDonorCard(donor);
        donorsList.appendChild(donorCard);
    });
}

// Create donor card element
function createDonorCard(donor) {
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-4';
    
    const card = document.createElement('div');
    card.className = 'card h-100';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const lastDonation = new Date(donor.lastDonation);
    const today = new Date();
    const monthsSinceLastDonation = Math.floor((today - lastDonation) / (1000 * 60 * 60 * 24 * 30));
    
    cardBody.innerHTML = `
        <h5 class="card-title">${donor.name}</h5>
        <p class="card-text">
            <strong>Blood Group:</strong> ${donor.bloodGroup}<br>
            <strong>Age:</strong> ${donor.age}<br>
            <strong>Location:</strong> ${donor.city}, ${donor.state}<br>
            <strong>Last Donation:</strong> ${monthsSinceLastDonation} months ago
        </p>
        <button class="btn btn-danger" onclick="contactDonor('${donor.contact}')">
            Contact Donor
        </button>
    `;
    
    card.appendChild(cardBody);
    col.appendChild(card);
    
    return col;
}

// Contact donor function
function contactDonor(contact) {
    // In a real application, this would handle the contact process
    // For now, we'll just show an alert
    alert(`Contact number: ${contact}\n\nPlease note: In a real application, this would initiate a secure contact process.`);
}

// Add loading state to search button
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('button[type="submit"]');
    const searchForm = document.getElementById('searchForm');
    
    if (searchButton && searchForm) {
        searchForm.addEventListener('submit', function() {
            searchButton.disabled = true;
            searchButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Searching...';
            
            // Simulate search delay
            setTimeout(() => {
                searchButton.disabled = false;
                searchButton.innerHTML = 'Search Donors';
            }, 1000);
        });
    }
}); 