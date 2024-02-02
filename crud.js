// Function to populate horizontal table from local storage
let isAscending = true;

// Function to populate horizontal table from local storage
function populateTableFromLocalStorage() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let tbody = document.querySelector(".tbldata");
  tbody.innerHTML = ""; // Clear existing content

  employees = sortEmployees(employees, "Name");

  employees.forEach((emp, index) => {
    let row = `<tr>
        <td>${index + 1}</td>
        <td>${emp.Name}</td>
        <td>${emp.Gender}</td>
        <td>${emp.Dob}</td>
        <td>${emp.Email}</td>
        <td>${emp.Phnumber}</td>
        <td>${emp.Hobbies}</td>
        <td>
          <button onclick="editEmployee(${index})" class="edit-btn">Edit</button>
          <button onclick="deleteEmployee(${index})" class="remove-btn">Delete</button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

function sortEmployees(employees, property) {
  return employees.sort((a, b) => {
    const propA = a[property].toLowerCase();
    const propB = b[property].toLowerCase();
    return isAscending
      ? propA.localeCompare(propB)
      : propB.localeCompare(propA);
  });
}

// Function to toggle sorting order and re-populate the table
function toggleSort() {
  isAscending = !isAscending;
  populateTableFromLocalStorage();
}

// Function to populate vertical table from local storage
function populateVerticalTableFromLocalStorage() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let tbody = document.querySelector(".tbldataa");
  tbody.innerHTML = ""; // Clear existing content

  // Create an object to store data for each heading
  let dataByHeading = {
    ID: [],
    Name: [],
    Gender: [],
    Dob: [],
    Email: [],
    Mobile_no: [],
    Hobbies: [],
    Operation: [], // Added for operation buttons
  };

  // Fill the data for each heading
  employees.forEach((emp, index) => {
    dataByHeading["ID"].push(index + 1);
    dataByHeading["Name"].push(emp["Name"] || "");
    dataByHeading["Gender"].push(emp["Gender"] || "");
    dataByHeading["Dob"].push(emp["Dob"] || "");
    dataByHeading["Email"].push(emp["Email"] || "");
    dataByHeading["Mobile_no"].push(emp["Phnumber"] || "");
    dataByHeading["Hobbies"].push(emp["Hobbies"] || "");

    // Add buttons for operation
    let operationButtons = `
            <button onclick="editEmployee(${index})" class="edit-btn">Edit</button>
            <button onclick="deleteEmployee(${index})" class="remove-btn">Delete</button>
        `;
    dataByHeading["Operation"].push(operationButtons);
  });

  // Iterate over headings and display data vertically
  Object.keys(dataByHeading).forEach((heading) => {
    let row = document.createElement("tr");
    let headingCell = document.createElement("th");
    headingCell.textContent = heading;
    row.appendChild(headingCell);

    dataByHeading[heading].forEach((data) => {
      let dataCell = document.createElement("td");
      dataCell.innerHTML = data; // Use innerHTML to render buttons
      row.appendChild(dataCell);
    });

    tbody.appendChild(row);
  });
}

// Call both functions to populate both horizontal and vertical views when the page loads
window.addEventListener("load", () => {
  populateTableFromLocalStorage();
  populateVerticalTableFromLocalStorage();
});
// Function to delete an employee
function deleteEmployee(index) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  populateTableFromLocalStorage();
  populateVerticalTableFromLocalStorage();
}

// Function to edit an employee
function editEmployee(index) {
  alert("You are in updating  mode.");
  document.getElementsByClassName("empdetails")[0].scrollIntoView();
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let emp = employees[index];

  // Set the form fields with the employee's details
  document.getElementById("fname").value = emp.Name;
  document.getElementById("gender").value = emp.Gender;
  document.getElementById("dob").value = emp.Dob;
  document.getElementById("email").value = emp.Email;
  document.getElementById("phnumber").value = emp.Phnumber;
  document.getElementById("hobbies").value = emp.Hobbies.join(",");

  // Store the index of the employee being edited in local storage
  localStorage.setItem("editIndex", index);

  // Hide the submit button during edit
  document.getElementById("submit-btn").style.display = "none";

  // Display a save button to save the edited details
  let saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function () {
    saveEditedDetails(index);
  });
  document.getElementById("empdetails").appendChild(saveButton);
}

// Function to save edited details
function saveEditedDetails(index) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let emp = {
    Name: document.getElementById("fname").value,
    Gender: document.getElementById("gender").value,
    Dob: document.getElementById("dob").value,
    Email: document.getElementById("email").value,
    Phnumber: document.getElementById("phnumber").value,
    Hobbies: document.getElementById("hobbies").value.split(","),
  };

  employees[index] = emp;
  localStorage.setItem("employees", JSON.stringify(employees));
  populateTableFromLocalStorage();

  // Show the submit button again and remove the save button
  document.getElementById("submit-btn").style.display = "block";
  document
    .getElementById("empdetails")
    .removeChild(document.querySelector("button"));
}

function fetchemp(event) {
  event.preventDefault();
  let name = document.getElementById("fname").value;
  let gender = document.getElementById("gender").value;
  let dob = document.getElementById("dob").value;
  let email = document.getElementById("email").value;
  let phnumber = document.getElementById("phnumber").value;
  let hobbies = document.getElementById("hobbies").value.split(",");

  // Regular expression for email validation
  const emailRegex = /^\S+@\S+\.\S+$/;

  // Regular expression for mobile number validation (exactly 10 digits)
  const phoneRegex = /^\d{10}$/;

  // Get today's date for date of birth validation
  let today = new Date();
  let selectedDate = new Date(dob);

  // Reset error messages
  document
    .querySelectorAll(".error")
    .forEach((error) => (error.textContent = ""));

  let isValid = true;

  if (!name) {
    document.getElementById("fname").nextElementSibling.textContent =
      "Please fill the Field!";
    isValid = false;
  }
  if (!gender) {
    document.getElementById("gender").nextElementSibling.textContent =
      "Please fill the Field!";
    isValid = false;
  }
  if (!dob) {
    document.getElementById("dob").nextElementSibling.textContent =
      "Please fill the Field!";
    isValid = false;
  }
  if (!email) {
    document.getElementById("email").nextElementSibling.textContent =
      "Please fill the Field!";
    isValid = false;
  }
  if (!phnumber) {
    document.getElementById("phnumber").nextElementSibling.textContent =
      "Please fill the Field!";
    isValid = false;
  }
  if (!hobbies) {
    document.getElementById("hobbies").nextElementSibling.textContent =
      "Please fill the Field!";
    isValid = false;
  }

  if (
    isValid &&
    emailRegex.test(email) && // Check if email is valid
    phoneRegex.test(phnumber) && // Check if phone number is valid
    selectedDate < today // Check if selected date is in the past
  ) {
    let emp = {
      Name: name,
      Gender: gender,
      Dob: dob,
      Email: email,
      Phnumber: phnumber,
      Hobbies: hobbies,
    };

    let editIndex = parseInt(localStorage.getItem("editIndex"));
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (editIndex !== null && editIndex >= 0 && editIndex < employees.length) {
      // If editIndex exists and is valid, replace the employee data at that index
      employees[editIndex] = emp;
      localStorage.removeItem("editIndex"); // Remove the editIndex after the edit
    } else {
      // Otherwise, add the new employee to the list
      employees.push(emp);
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    populateTableFromLocalStorage();
    populateVerticalTableFromLocalStorage();
    // Call the function after adding or editing an employee
  } else {
    if (!isValid) {
      alert("Please fill all the details!");
      // Optionally, you can also highlight the empty fields in red
      document.querySelectorAll(".detailbox").forEach((detailbox) => {
        if (!detailbox.querySelector("input").value) {
          detailbox.style.border = "1px solidred";
        }
      });
    } else if (!emailRegex.test(email)) {
      // alert("Please enter a valid email address!");
      document.getElementById("email").nextElementSibling.textContent =
        "Please enter a valid email address!";
    } else if (!phoneRegex.test(phnumber)) {
      // alert("Please enter a 10-digit phone number!");
      document.getElementById("phnumber").nextElementSibling.textContent =
        "Please enter a 10-digit phone number!";
    } else if (selectedDate >= today) {
      // alert("Please select a date in the past for Date of Birth!");
      document.getElementById("dob").nextElementSibling.textContent =
        "Please select a date in the past for Date of Birth!";
    }
  }
}
