function validate(element, type) {
    element.setCustomValidity("");

    if (type === "email") {
        if (element.validity.typeMismatch) {
            element.setCustomValidity("Email is not in the correct form");
        }
    } else if (type === "name") {
        if (element.value.trim() === '') {
            element.setCustomValidity("Name cannot be empty!!");
        }
    } else if (type === "password") {
        if (element.value.trim() === '') {
            element.setCustomValidity("Password cannot be empty!!");
        }
    }
    element.reportValidity();
}

function validateAge() {
    var dobElement = document.getElementById("date");
    var dob = new Date(dobElement.value);
    var today = new Date();
    if (dobElement.value === "") {
        dobElement.setCustomValidity("Date of birth cannot be empty.");
        dobElement.reportValidity();
        return;
    }
    var age = today.getFullYear() - dob.getFullYear();
    var monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        dobElement.setCustomValidity("Registration is only allowed for users between 18 and 55 years old.");
    } else {
        dobElement.setCustomValidity(""); // Reset if valid
    }
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    const tableBody = document.getElementById("entriesTableBody");
    tableBody.innerHTML = ""; // Clear existing entries

    entries.forEach((entry) => {
        const row = `<tr>
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.termsAccepted}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    // Show the entries display if there are entries
    document.getElementById("entriesDisplay").style.display = entries.length > 0 ? 'block' : 'none';
}

document.getElementById("form1").addEventListener("submit", function (event) {
    event.preventDefault(); 
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var passwordElement = document.getElementById("password");
    var dobElement = document.getElementById("date");
    
    validate(nameElement, "name");
    validate(emailElement, "email");
    validate(passwordElement, "password");
    validateAge();

    if (nameElement.validity.valid && emailElement.validity.valid && passwordElement.validity.valid && dobElement.validity.valid) {
        const entry = {
            name: nameElement.value,
            email: emailElement.value,
            password: passwordElement.value,
            dob: dobElement.value,
            termsAccepted: document.getElementById("Terms").checked ? "Yes" : "No"
        };
        
        saveEntry(entry); // Save the entry to localStorage
        loadEntries(); // Reload entries to display in the table

        // Clear form inputs after submission
        nameElement.value = "";
        emailElement.value = "";
        passwordElement.value = "";
        dobElement.value = "";
        document.getElementById("Terms").checked = false;
    } else {
        nameElement.reportValidity();
        emailElement.reportValidity();
        passwordElement.reportValidity();
        dobElement.reportValidity();
    }
});

// Load entries when the page loads
window.onload = loadEntries;
