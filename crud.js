function populateTableFromLocalStorage() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let tbody = document.querySelector(".tbldata");
  tbody.innerHTML = "";
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

function populateVerticalTableFromLocalStorage() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let tbody = document.querySelector(".tbldataa");
  tbody.innerHTML = "";

  let dataByHeading = {
    ID: [],
    Name: [],
    Gender: [],
    Dob: [],
    Email: [],
    Mobile_no: [],
    Hobbies: [],
    Operation: [],
  };

  employees.forEach((emp, index) => {
    dataByHeading["ID"].push(index + 1);
    dataByHeading["Name"].push(emp["Name"] || "");
    dataByHeading["Gender"].push(emp["Gender"] || "");
    dataByHeading["Dob"].push(emp["Dob"] || "");
    dataByHeading["Email"].push(emp["Email"] || "");
    dataByHeading["Mobile_no"].push(emp["Phnumber"] || "");
    dataByHeading["Hobbies"].push(emp["Hobbies"] || "");

    let operationButtons = `
            <button onclick="editEmployee(${index})" class="edit-btn">Edit</button>
            <button onclick="deleteEmployee(${index})" class="remove-btn">Delete</button>
        `;
    dataByHeading["Operation"].push(operationButtons);
  });

  Object.keys(dataByHeading).forEach((heading) => {
    let row = document.createElement("tr");
    let headingCell = document.createElement("th");
    headingCell.textContent = heading;
    row.appendChild(headingCell);

    dataByHeading[heading].forEach((data) => {
      let dataCell = document.createElement("td");
      dataCell.innerHTML = data;
      row.appendChild(dataCell);
    });

    tbody.appendChild(row);
  });
}

window.onload = () => {
  populateTableFromLocalStorage();
  populateVerticalTableFromLocalStorage();
};

function deleteEmployee(index) {
  alert("Are you sure you want delete?");
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  populateTableFromLocalStorage();
  populateVerticalTableFromLocalStorage();
}

function editEmployee(index) {
  alert("You are in updating mode.");

  document.getElementsByClassName("empdetails")[0].scrollIntoView();

  // Retrieve the employee data
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let emp = employees[index];

  // Populate the form fields with employee data
  getById("fname").value = emp.Name;
  getById("gender").value = emp.Gender;
  getById("dob").value = emp.Dob;
  getById("email").value = emp.Email;
  getById("phnumber").value = emp.Phnumber;
  getById("hobbies").value = emp.Hobbies.join(",");

  localStorage.setItem("editIndex", index);

  getById("submit-btn").style.display = "none";
  getById("update-btn").style.display = "flex";
  getById("cancel-btn").style.display = "flex";

  getById("update-btn").addEventListener("click", function () {
    // Change the update button back to a submit button
    getById("submit-btn").style.display = "flex";
    getById("update-btn").style.display = "none";

    // Hide the cancel button
    getById("cancel-btn").style.display = "none";
  });
}

function cancelEditing() {
  // Display a confirmation dialog
  let confirmation = confirm("Are you sure you want to cancel?");
  // to empty  the fields
  if (confirmation) {
    getById("fname").value = "";
    getById("gender").value = "";
    getById("dob").value = "";
    getById("email").value = "";
    getById("phnumber").value = "";
    getById("hobbies").value = "";

    localStorage.removeItem("editIndex");

    getById("update-btn").style.display = "none";
    getById("cancel-btn").style.display = "none";
    getById("submit-btn").style.display = "flex";
  }
}

// Function to save edited details
function saveEditedDetails(index) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let emp = {
    Name: getById("fname").value,
    Gender: getById("gender").value,
    Dob: getById("dob").value,
    Email: getById("email").value,
    Phnumber: getById("phnumber").value,
    Hobbies: getById("hobbies").value.split(","),
  };

  employees[index] = emp;
  localStorage.setItem("employees", JSON.stringify(employees));
  populateTableFromLocalStorage();
  populateVerticalTableFromLocalStorage();

  // Show the submit button again and remove the save button
  getById("submit-btn").style.display = "block";
  getById("empdetails").removeChild(document.querySelector("button"));
}

function validateName() {
  const nameInput = getById("fname");
  const errorElement = getById("fnameError");
  const name = nameInput.value.trim();

  if (name === "") {
    errorElement.textContent = "Name is required";
    errorElement.style.color = "red";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function validateGender() {
  const genderSelect = getById("gender");
  const errorElement = getById("genderError");
  const gender = genderSelect.value;

  if (gender === "") {
    errorElement.textContent = "Gender is required";
    errorElement.style.color = "red";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function validateDOB() {
  const dobInput = getById("dob");
  const errorElement = getById("dobError");
  const dob = new Date(dobInput.value); // this convert input value to the Date object
  const today = new Date();

  if (dob >= today) {
    errorElement.textContent =
      "Please select a date in the past for Date of Birth!";
    errorElement.style.color = "red";
    return false;
  } else if (dobInput.value === "") {
    errorElement.textContent = "Date of birth is required";
    errorElement.style.color = "red";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function validateEmail() {
  const emailInput = document.forms[0].elements.email;
  const errorElement = getById("emailError");
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    errorElement.textContent = "Email is required";
    errorElement.style.color = "red";
    return false;
  } else if (!emailRegex.test(email)) {
    errorElement.textContent = "Invalid email format";
    errorElement.style.color = "red";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function validatePhoneNumber() {
  const phnumberInput = getById("phnumber");
  const errorElement = getById("phnumberError");
  const phnumber = phnumberInput.value.trim();
  const phoneRegex = /^\d{10}$/;

  if (phnumber === "") {
    errorElement.textContent = "Phone number is required";
    errorElement.style.color = "red";
    return false;
  } else if (!phoneRegex.test(phnumber)) {
    errorElement.textContent = "Invalid phone number format";
    errorElement.style.color = "red";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function validateHobbies() {
  const hobbiesInput = getById("hobbies");
  const errorElement = getById("hobbiesError");
  const hobbies = hobbiesInput.value.trim();

  if (hobbies === "") {
    errorElement.textContent = "Hobbies are required";
    errorElement.style.color = "red";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

function fetchemp(event) {
  event.preventDefault();

  // const nameInput = getById("fname");
  // const genderInput = getById("gender");
  // const dobInput = getById("dob");
  // const emailInput = getById("email");
  // const phnumberInput = getById("phnumber");
  // const hobbiesInput = getById("hobbies");

  const nameInput = document.forms[0].fname;
  const genderInput = document.forms[0].gender;
  const dobInput = document.forms[0].dob;
  const emailInput = document.forms[0].elements.email;
  const phnumberInput = document.forms[0].elements.phnumber;
  const hobbiesInput = document.forms[0].hobbies;

  const name = nameInput.value;
  const gender = genderInput.value;
  const dob = dobInput.value;
  const email = emailInput.value;
  const phnumber = phnumberInput.value;
  const hobbies = hobbiesInput.value.trim().split(",");

  const isNameValid = validateName();
  const isGenderValid = validateGender();
  const isDobValid = validateDOB();
  const isEmailValid = validateEmail();
  const isPhnumberValid = validatePhoneNumber();
  const isHobbiesValid = validateHobbies();

  // Get today's date for date of birth validation
  let today = new Date();
  let selectedDate = new Date(dob);

  document
    .querySelectorAll(".error")
    .forEach((error) => (error.textContent = ""));

  let isValid =
    isNameValid &&
    isGenderValid &&
    isDobValid &&
    isEmailValid &&
    isPhnumberValid &&
    isHobbiesValid;

  if (isValid && selectedDate < today) {
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
      localStorage.removeItem("editIndex"); //To Remove the editIndex after the edit
    } else {
      // Otherwise, add the new employee to the list
      employees.push(emp);
      alert("Data inserted!");
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    populateTableFromLocalStorage();
    populateVerticalTableFromLocalStorage();

    // Clear input fields
    nameInput.value = "";
    genderInput.value = "";
    dobInput.value = "";
    emailInput.value = "";
    phnumberInput.value = "";
    hobbiesInput.value = "";
  } else {
    if (!isValid) {
      // Set error message in each input field's error element
      if (!name) {
        getById("fnameError").textContent = "Name is required";
      }
      if (!gender) {
        getById("genderError").textContent = "Gender is required";
      }
      if (!dob) {
        getById("dobError").textContent = "Date of birth is required";
      }
      if (!email) {
        getById("emailError").textContent = "Email is required";
      }
      if (!phnumber) {
        getById("phnumberError").textContent = "Phone number is required";
      }
      if (!hobbies) {
        getById("hobbiesError").textContent = "Hobbies are required";
      }

      // Optionally, you can also highlight the empty fields in red
      var detailboxes = document.querySelectorAll(".detailbox");
      detailboxes.forEach((detailbox) => {
        if (!detailbox.querySelectorAll("input").value) {
          detailbox.style.border = "1px solid red";
        }
      });
    } else if (selectedDate >= today) {
      getById("dobError").textContent =
        "Please select a date in the past for Date of Birth!";
    }
  }
}

function getById(id) {
  return document.getElementById(id);
}
