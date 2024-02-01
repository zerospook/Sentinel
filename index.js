function updateDateTime() {
    var currentDateTime = new Date();
    var formattedDateTime = currentDateTime.toLocaleString();
    document.getElementById("datetime").innerHTML = formattedDateTime;
}

// Updating date and time every second
setInterval(updateDateTime, 1000);


// Function to show/hide elements based on user state
function updateUI(userLoggedIn) {
    const loginForm = document.querySelector('.login-form');
    const manageUsersBtn = document.querySelector('.manage-users-btn');
    const homePageContent = document.querySelector('.button-container');
    const actionButtons = document.querySelector('.action-buttons');

    if (userLoggedIn) {
        // User is logged in, show home page content
        loginForm.style.display = 'none';
        manageUsersBtn.style.display = 'none';
        homePageContent.style.display = 'block';
        actionButtons.style.display = 'flex'; 
    } else {
        // User is not logged in, show login form
        loginForm.style.display = 'block';
        manageUsersBtn.style.display = 'block';
        homePageContent.style.display = 'none';
        actionButtons.style.display = 'none';
    }
}

function login() {
    var userId = document.getElementById("userId").value;
    var password = document.getElementById("password").value;

    // Simulating a simple check for valid user ID and password
    if (isValidUser(userId, password)) {
        // Redirect to home page
        window.location.href = 'home.html';
    } else {
        alert('Invalid user ID or password. Please try again.');
    }
}

// Function to simulate a user logout
function logout() {
    history.pushState(null, null, 'index.html');
    location.reload();
}

function isValidUser(userId, password) {
    return userId === 'HPCL' && password === '12345';
}

// Additional function to navigate to Home page
function goHome() {
    window.location.href = 'home.html';
}

function toggleDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
}

function hideDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = 'none';
}

// Initial call to set the initial UI state (not logged in)
updateUI(false);

function navigateToCreate() {
    window.location.href = 'create.html';
}

function navigateToUpdate() {
    window.location.href = 'update.html';
}

function navigateToReport() {
    window.location.href = 'report.html';
}

function navigateToDelete() {
    window.location.href = 'delete.html';
}

function navigateToAssetAge() {
    window.location.href = 'assetage.html';
}

function navigateToUpcomingAlerts() {
    window.location.href = 'upcomingalerts.html';
}

function navigate(page) {
    switch (page) {
        case 'Create':
            navigateToCreate();
            break;
        case 'Update':
            navigateToUpdate();
            break;    
        case 'Report':
            navigateToReport();
            break;
        case 'Delete':
            navigateToDelete();
            break;
        case 'AssetAge':
            navigateToAssetAge();
            break;
        case 'UpcomingAlerts':
            navigateToUpcomingAlerts();
            break;
        default:
            // Handle default case or show an error message
            console.error('Invalid page:', page);
    }
}

function handleWarrantyChange() {
    const underWarranty = document.getElementById('underWarranty');
    const amcStatus = document.getElementById('amcStatus');
    const amcPONumber = document.getElementById('amcPONumber');
    const amcValidity = document.getElementById('amcValidity');

    if (underWarranty.value === 'Yes') {
        // If under warranty, disable AMC fields
        amcStatus.disabled = true;
        amcPONumber.disabled = true;
        amcValidity.disabled = true;
    } else {
        // If not under warranty, enable AMC fields
        amcStatus.disabled = false;
        amcPONumber.disabled = false;
        amcValidity.disabled = false;
    }
}

function calculateAssetAge() {
    const purchaseDate = document.getElementById('purchaseDate').value;
    const assetAgeField = document.getElementById('assetAge');
    
    if (purchaseDate) {
        const today = new Date();
        const purchaseDateObj = new Date(purchaseDate);
        const ageInMilliseconds = today - purchaseDateObj;
        const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
        
        // Set the calculated age in the asset age field
        assetAgeField.value = ageInYears.toFixed(2);
    } else {
        // If purchase date is not entered, clear the asset age field
        assetAgeField.value = '';
    }
}

function resetForm() {
    document.getElementById('dataForm').reset();
    // Ensure AMC fields are disabled after reset
    handleWarrantyChange();
}

function submitForm() {
    // You can add your logic to handle form submission here
    alert('Form submitted!');
}

function searchDatabase() {
    // Placeholder for simulating database search
    const searchType = document.getElementById('searchType').value;
    const searchValue = document.getElementById('searchValue').value;

    // Simulating a successful search for now
    const entryFound = simulateDatabaseSearch(searchType, searchValue);

    if (entryFound) {
        window.location.href = 'editEntry.html'; // Create this file later
    } else {
        alert('Entry not found in the database. Please try again.');
    }
}

function simulateDatabaseSearch(searchType, searchValue) {
    // Placeholder for simulating database search logic
    // Replace this with actual backend logic later
    return Math.random() < 0.5; // Simulating a 50% chance of finding the entry
}

// Sample data structure (replace this with actual backend integration)
const sampleData = [
    { deviceCategory: 'Desktop', purchasePONumber: 'PO001', assetName: 'Desktop1' },
    { deviceCategory: 'Printer', purchasePONumber: 'PO002', assetName: 'Printer1' },
    // Add more sample data as needed
];

function showReport() {
    const viewOption = document.getElementById('viewOption').value;
    const reportTableBody = document.querySelector('#reportTable tbody');

    // Clear existing table rows
    reportTableBody.innerHTML = '';

    // Filter data based on the selected view option
    const filteredData = (viewOption === 'All') ? sampleData : sampleData.filter(item => item.deviceCategory === viewOption);

    // Populate the table with data
    filteredData.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.deviceCategory}</td>
            <td>${item.purchasePONumber}</td>
            <td>${item.assetName}</td>
            <!-- Add more table data cells as needed -->
        `;
        reportTableBody.appendChild(newRow);
    });
}

function searchAndPopulate() {
    const searchOption = document.getElementById('searchOption').value;
    const searchValue = document.getElementById('searchValue').value;
    const deleteTableBody = document.querySelector('#deleteTable tbody');

    // Clear existing table rows
    deleteTableBody.innerHTML = '';

    // Filter data based on the selected search option and value
    const filteredData = sampleDataDelete.filter(item => item[searchOption] === searchValue);

    // Populate the table with data
    filteredData.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="checkbox" class="select-checkbox"></td>
            <td>${item.deviceCategory}</td>
            <td>${item.purchasePONumber}</td>
            <td>${item.assetName}</td>
            <!-- Add more table data cells as needed -->
        `;
        deleteTableBody.appendChild(newRow);
    });
}

function deleteSelected() {
    const checkboxes = document.querySelectorAll('.select-checkbox:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one record to delete.');
        return;
    }

    // Assuming a backend API for deletion (replace with actual backend integration)
    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const purchasePONumber = row.cells[2].textContent; // Adjust index based on actual table structure
        // Call your backend API for deletion using purchasePONumber
        // ...

        // Remove the row from the table
        row.remove();
    });

    alert('Selected records deleted successfully.');
}