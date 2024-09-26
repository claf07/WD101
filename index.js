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
    
        localStorage.setItem("name", nameElement.value);
        localStorage.setItem("email", emailElement.value);
        localStorage.setItem("password", passwordElement.value);
        localStorage.setItem("dob", dobElement.value);
        localStorage.setItem("termsAccepted", document.getElementById("Terms").checked ? "Yes" : "No");

        
        document.getElementById("displayName").innerHTML = nameElement.value;
        document.getElementById("displayEmail").innerHTML = emailElement.value;
        document.getElementById("displayPassword").innerHTML = passwordElement.value;
        document.getElementById("displayDOB").innerHTML = dobElement.value;
        document.getElementById("displayTerms").innerHTML = document.getElementById("Terms").checked ? "Yes" : "No";
        document.getElementById("display").classList.remove("hidden");
    } else {
        nameElement.reportValidity();
        emailElement.reportValidity();
        passwordElement.reportValidity();
        dobElement.reportValidity();
    }
});
